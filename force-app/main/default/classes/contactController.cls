public with sharing class contactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(){
        List<Contact> conList = [
            SELECT Id, Name, Title, Phone, Email, picture__c, Rank__c, AccountId, Account.Name
            FROM Contact WHERE AccountId != NULL WITH USER_MODE
        ];
        return conList;
    }
    public static List<Account> getAccountList(){
        List<Account> accList = [
            SELECT Id, Name
            FROM Account
        ];
        return accList;
    }
}