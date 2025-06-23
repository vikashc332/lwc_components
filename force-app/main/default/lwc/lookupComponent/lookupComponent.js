import { LightningElement, track, wire } from 'lwc';
import getRecords from '@salesforce/apex/LookUpCoponent.getRecords';
import getRecordDetails from '@salesforce/apex/LookUpCoponent.getRecordDetails';

export default class RecordSelector extends LightningElement {
    @track objectOptions = [
        { label: 'Lead', value: 'Lead' },
        { label: 'Opportunity', value: 'Opportunity' }
    ];
    @track selectedObject;
    @track records = [];
    @track recordOptions = [];
    @track selectedRecordId;
    @track recordDetail;

    // Handle object selection
    handleObjectChange(event) {
        this.selectedObject = event.detail.value;
        this.selectedRecordId = null;
        this.recordDetail = null;
        this.fetchRecords();
    }

    fetchRecords() {
        getRecords({ objectName: this.selectedObject })
            .then(result => {
                this.records = result;
                this.recordOptions = result.map(rec => ({
                    label: rec.Name,
                    value: rec.Id
                }));
            })
            .catch(error => {
                console.error('Error fetching records:', error);
            });
    }

    handleRecordChange(event) {
        this.selectedRecordId = event.detail.value;
        this.fetchRecordDetails();
    }

    fetchRecordDetails() {
        getRecordDetails({ objectName: this.selectedObject, recordId: this.selectedRecordId })
            .then(result => {
                this.recordDetail = result;
            })
            .catch(error => {
                console.error('Error fetching record detail:', error);
            });
    }
}