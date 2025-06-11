import { LightningElement, track } from 'lwc';

export default class ModalDemo extends LightningElement {
    @track showModal = false;

    // Open modal
    openModal() {
        this.showModal = true;
    }

    // Cancel and close modal
    handleCancel() {
        this.showModal = false;
        // Optional: Add toast or message
        console.log('User clicked Cancel');
    }

    // Confirm action
    handleConfirm() {
        this.showModal = false;
        // Perform your logic here (ex: submit record, notify client)
        console.log('User confirmed action');
        alert('Client submission confirmed!');
    }
}