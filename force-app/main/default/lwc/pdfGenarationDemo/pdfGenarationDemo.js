import { LightningElement, api } from 'lwc';
import generatePDF from '@salesforce/apex/pdfController.generatePDF';
import { RefreshEvent } from 'lightning/refresh';
export default class PdfGenarationDemo extends LightningElement {
    imageUrl = 'https://picsum.photos/200/300';
    dowmloadable = false;
    downloadLink;
    @api recordId;
    invoiceData = {
        invoiceNo: '123',
        invoiceCreated: 'January 1, 2019',
        invoiceDue: 'January 10, 2020',
        companyName: 'Sparksuite Inc',
        address1: '12345 Sunny Road',
        address2: 'Sunnyville, CA 12345'
    }
    clientData={
        client: 'ACME Corp',
        username: 'John Doe',
        email: 'john@example.com'
    }
    services=[
        {name: 'Consultant fee', amount: 1000.00},
        {name: 'Website Design', amount: 300.00},
        {name: 'Hosting (3 Months)', amount: 75.00}
    ]

    get totalAmount(){
        return this.services.reduce((total, service) => {
            return total = total + service.amount
        }, 0)
    }

    pdfHandler(){
        let content = this.template.querySelector('.container');
        console.log(content.outerHTML);
        generatePDF({recordId: this.recordId, htmlData:content.outerHTML}).then(result => {
            console.log("Attachment", result);
            this.dispatchEvent(new RefreshEvent()); //related lists of attachment will be updated automatrically
            window.open(`https://neeldeep-portfolio-dev-ed.file.force.com/servlet/servlet.FileDownload?file=${result.Id}`);
            this.dowmloadable = true;
            this.downloadLink = `/sfc/servlet.shepherd/document/download/${result.Id}`;
        }).catch(error => {
            console.log(error);
        })
    }
}