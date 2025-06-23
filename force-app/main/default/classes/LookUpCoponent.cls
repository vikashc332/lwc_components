public with sharing class LookUpCoponent {
    
    @AuraEnabled(cacheable=true)
    public static List<SObject> getRecords(String objectName) {
        if (String.isBlank(objectName)) {
            return new List<SObject>();
        }

        String query = '';
        if (objectName == 'Lead') {
            query = 'SELECT Id, Name, Company, Email, Phone FROM Lead LIMIT 100';
        } else if (objectName == 'Opportunity') {
            query = 'SELECT Id, Name, StageName, Amount FROM Opportunity LIMIT 100';
        } else {
            return new List<SObject>();
        }

        return Database.query(query);
    }

    @AuraEnabled(cacheable=true)
    public static SObject getRecordDetails(String objectName, Id recordId) {
        if (String.isBlank(objectName) || String.isBlank(recordId)) {
            return null;
        }

        if (objectName == 'Lead') {
            return [SELECT Id, Name, Company, Email, Phone FROM Lead WHERE Id = :recordId LIMIT 1];
        } else if (objectName == 'Opportunity') {
            return [SELECT Id, Name, StageName, Amount FROM Opportunity WHERE Id = :recordId LIMIT 1];
        }
        return null;
    }
}