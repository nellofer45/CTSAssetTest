import { LightningElement, wire} from 'lwc';
import getContactList from '@salesforce/apex/contactController.getContactList';
const columns = [
    {label: "Name", type: "customName", typeAttributes: {
        contactName: {
            fieldName: "Name"
        }
    }},
    {label: "Account Name", fieldName: "accountLink", type: "url", typeAttributes : {
        label: {
            fieldName: "accountName"
        },
        target: '_blank'
    }},
    {label: "Title", fieldName: "Title", cellAttributes:{
        class:{
            fieldName: "titleColor"
        }
    }},
    {label: "Phone", fieldName: "Phone", type:"phone"},
    {label: "Email", fieldName: "Email", type:"email"},
    {label: "Rank", fieldName: "Rank__c", type: "customRank", typeAttributes: {
        rankIcon: {
            fieldName: "rankIcon"
        }
    }},
    {label: "Picture", type: "customImage", typeAttributes: {
        pictureUrl : {
            fieldName:"Picture__c"
        }
    },
    cellAttributes: {
        alignment: "center"
    }
    }
];
export default class CustomStyleDataTable extends LightningElement {
    contacts;
    columns = columns;
    @wire(getContactList)
    wiredContacts({data, error}){
        if(data){
            this.contacts = data.map((record) => {
                let accountLink = "/" + record.AccountId;
                let accountName = record.Account.Name;
                let titleColor = record.Title === "HR" ? "slds-text-color_error": "slds-text-color_success";
                let rankIcon = record.Rank__c > 5 ? "utility:ribbon": "";
                return {
                    ...record,
                    accountLink: accountLink,
                    accountName: accountName,
                    titleColor: titleColor,
                    rankIcon: rankIcon
                };
            });
            console.log(data);
        }else{
            console.log(error);
        }
    }
}