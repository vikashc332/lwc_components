import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CopyToClipboardDemo extends LightningElement {
    @track userInput = '';
    emailAddress = 'demo@example.com';
    @track dynamicCode = this.generateCode(); // initial code

    handleInputChange(event) {
        this.userInput = event.target.value;
    }

    // 1. Copy 
    copyText() {
        this.copyToClipboard('Welcome vikash');
    }

    // 2. Copy Input
    copyUserInput() {
        if (this.userInput) {
            this.copyToClipboard(this.userInput);
        } else {
            this.showToast('Warning', 'Please enter something to copy.', 'warning');
        }
    }

    // 3. Copy Email
    copyEmail() {
        this.copyToClipboard(this.emailAddress);
    }

    // 4. Copy and Generate Dynamic Code
    copyDynamicCode() {
        this.dynamicCode = this.generateCode(); // create new code
        this.copyToClipboard(this.dynamicCode); // copy it
    }

    // Code Generator
    generateCode() {
        return `CODE-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    }

    //  Clipboard Copy Utility
    copyToClipboard(value) {
        navigator.clipboard.writeText(value).then(() => {
            this.showToast('Copied!', `"${value}" copied to clipboard.`, 'success');
        }).catch(err => {
            this.showToast('Error', 'Failed to copy text.', 'error');
            console.error(err);
        });
    }

    // Toast Utility
    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title,
                message,
                variant
            })
        );
    }
}