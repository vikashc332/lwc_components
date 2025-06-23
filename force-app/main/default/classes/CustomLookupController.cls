public with sharing class CustomLookupController {

    @AuraEnabled(cacheable=true)
    public static List<sObject> searchRecords(String searchTerm, String objectApiName, String fieldApiName) {
        if (String.isBlank(searchTerm) || String.isBlank(objectApiName) || String.isBlank(fieldApiName)) {
            throw new AuraHandledException('Missing required input.');
        }

        searchTerm = searchTerm.trim().toLowerCase();
        Map<String, Schema.SObjectType> globalDescribe = Schema.getGlobalDescribe();

        // Validate object
        if (!globalDescribe.containsKey(objectApiName)) {
            throw new AuraHandledException('Invalid object: ' + objectApiName);
        }

        Schema.SObjectType sObjType = globalDescribe.get(objectApiName);
        Schema.DescribeSObjectResult sObjDescribe = sObjType.getDescribe();

        // Validate field
        if (!sObjDescribe.fields.getMap().containsKey(fieldApiName)) {
            throw new AuraHandledException('Invalid field: ' + fieldApiName);
        }

        Schema.SObjectField sObjField = sObjDescribe.fields.getMap().get(fieldApiName);
        Schema.DescribeFieldResult fieldDescribe = sObjField.getDescribe();

        if (!fieldDescribe.isAccessible()) {
            throw new AuraHandledException('Field is not accessible: ' + fieldApiName);
        }

        // Escape SOQL injection
        String escapedTerm = String.escapeSingleQuotes(searchTerm);

        // Build query
        String query =
            'SELECT Id, ' + fieldApiName +
            ' FROM ' + objectApiName +
            ' WHERE LOWER(' + fieldApiName + ') LIKE \'%' + escapedTerm + '%\' ' +
            'ORDER BY ' + fieldApiName +
            ' LIMIT 10';

        try {
            return Database.query(query);
        } catch (Exception ex) {
            throw new AuraHandledException('Search failed: ' + ex.getMessage());
        }
    }
}