// Use .apex files to store anonymous Apex.
// You can execute anonymous Apex in VS Code by selecting the
//     apex text and running the command:
//     SFDX: Execute Anonymous Apex with Currently Selected Text
// You can also execute the entire file by running the command:
//     SFDX: Execute Anonymous Apex with Editor Contents

string tempvar = 'Enter_your_name_here';
System.debug('Hello World!');
System.debug('My name is ' + tempvar);

List<Contact> conList = [SELECT id, picture__c, rank__c, title FROM contact];
for(Contact con: conList){
    if(String.isBlank(con.title)){
        con.rank__c = 3;
    }else{
        con.rank__c = 8;
    }
    con.picture__c = 'https://t3.ftcdn.net/jpg/00/95/03/92/360_F_95039294_tzQhcXWBjzrxOcuIWEoZKBNf3kqGj2ZT.jpg';
}
update conList;