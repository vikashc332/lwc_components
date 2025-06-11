import { LightningElement, track } from 'lwc';

export default class SpinnerLoader extends LightningElement {
    @track isModalOpen = false;
    @track isLoading = false;
    @track showSuccess = false;
    @track selectedOption = '';
    
    // Options for the dropdown
    options = [
        { label: 'Option A', value: 'A' },
        { label: 'Option B', value: 'B' },
        { label: 'Option C', value: 'C' }
    ];

    get isSaveDisabled() {
        return !this.selectedOption;
    }

    openModal() {
        this.isModalOpen = true;
        this.showSuccess = false;
    }

    closeModal() {
        this.isModalOpen = false;
        this.selectedOption = '';
    }

    handleChange(event) {
        this.selectedOption = event.detail.value;
    }

    handleSave() {
        this.isModalOpen = false;
        this.isLoading = true;

        // Simulate 20-second delay
        setTimeout(() => {
            this.isLoading = false;
            this.showSuccess = true;
        }, 20000);
    }
}