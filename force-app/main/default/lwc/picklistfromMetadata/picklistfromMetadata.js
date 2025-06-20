import { LightningElement, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';

// Object and Field references
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';

import CASE_OBJECT from '@salesforce/schema/Case';
import STATUS_FIELD from '@salesforce/schema/Case.Status';

export default class DynamicPicklist extends LightningElement {
    @track industryOptions = [];
    @track stageOptions = [];
    @track statusOptions = [];

    @track selectedIndustry;
    @track selectedStage;
    @track selectedStatus;

    /** -------------------- ACCOUNT -------------------- */
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accountInfo;

    @wire(getPicklistValues, {
        recordTypeId: '$accountInfo.data.defaultRecordTypeId',
        fieldApiName: INDUSTRY_FIELD
    })
    wiredIndustry({ data, error }) {
        if (data) {
            this.industryOptions = data.values;
        } else {
            console.error('Industry Error:', error);
        }
    }

    /** -------------------- OPPORTUNITY -------------------- */
    @wire(getObjectInfo, { objectApiName: OPPORTUNITY_OBJECT })
    oppInfo;

    @wire(getPicklistValues, {
        recordTypeId: '$oppInfo.data.defaultRecordTypeId',
        fieldApiName: STAGE_FIELD
    })
    wiredStage({ data, error }) {
        if (data) {
            this.stageOptions = data.values;
        } else {
            console.error('Stage Error:', error);
        }
    }

    /** -------------------- CASE -------------------- */
    @wire(getObjectInfo, { objectApiName: CASE_OBJECT })
    caseInfo;

    @wire(getPicklistValues, {
        recordTypeId: '$caseInfo.data.defaultRecordTypeId',
        fieldApiName: STATUS_FIELD
    })
    wiredStatus({ data, error }) {
        if (data) {
            this.statusOptions = data.values;
        } else {
            console.error('Status Error:', error);
        }
    }

    /** -------------------- Handlers -------------------- */
    handleIndustryChange(event) {
        this.selectedIndustry = event.detail.value;
    }

    handleStageChange(event) {
        this.selectedStage = event.detail.value;
    }

    handleStatusChange(event) {
        this.selectedStatus = event.detail.value;
    }

    handleSave() {
        const message = `Selections Saved:
        Industry: ${this.selectedIndustry || 'N/A'},
        Stage: ${this.selectedStage || 'N/A'},
        Status: ${this.selectedStatus || 'N/A'}`;

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: message,
                variant: 'success'
            })
        );
    }
}