public class AccountController {

    // Method to insert multiple accounts
    public static List<Account> insertAccounts(List<Account> accountsToInsert) {
        if (accountsToInsert != null && !accountsToInsert.isEmpty()) {
            insert accountsToInsert;
        }
        return accountsToInsert;
    }

    // Method to insert a single account
    public static Account insertSingleAccount(Account accountToInsert) {
        if (accountToInsert != null) {
            insert accountToInsert;
        }
        return accountToInsert;
    }

    // Method to retrieve all accounts
    public static List<Account> getAllAccounts() {
        return [SELECT Name, Phone FROM Account];
    }

    // Method to print all account details in debug logs
    public static void printAllAccounts() {
        List<Account> accounts = getAllAccounts();
        for (Account acc : accounts) {
            System.debug('Account Name: ' + acc.Name + ' | Account Phone: ' + acc.Phone);
        }
    }

    // Method to get the total count of accounts
    public static Integer getAccountSize() {
        List<Account> accounts = getAllAccounts();
        return (accounts != null) ? accounts.size() : 0;
    }
}