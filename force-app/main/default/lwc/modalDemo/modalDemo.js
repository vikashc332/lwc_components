import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ModalPhoneSelector extends LightningElement {
    @track showModal = false;
    @track selectedBrand = '';
    @track selectedModel = '';
    @track selectedPrice = '';
    @track modelOptions = [];
    @track stepTwo = false;

    @track userName = '';
    @track userEmail = '';
    @track userPhone = '';

    get brandOptions() {
        return [
            { label: 'iPhone', value: 'iPhone' },
            { label: 'Google Pixel', value: 'Google Pixel' },
            { label: 'OnePlus', value: 'OnePlus' },
            { label: 'Vivo', value: 'Vivo' },
            { label: 'Oppo', value: 'Oppo' }
        ];
    }

    brandModelMap = {
        'iPhone': [
            { label: 'iPhone 12', value: 'iPhone 12', price: 60000 },
            { label: 'iPhone 13 Pro', value: 'iPhone 13 Pro', price: 85000 },
            { label: 'iPhone 14 Pro Max', value: 'iPhone 14 Pro Max', price: 125000 }
        ],
        'Google Pixel': [
            { label: 'Pixel 6', value: 'Pixel 6', price: 52000 },
            { label: 'Pixel 6a', value: 'Pixel 6a', price: 38000 },
            { label: 'Pixel 7 Pro', value: 'Pixel 7 Pro', price: 70000 }
        ],
        'OnePlus': [
            { label: 'OnePlus 9', value: 'OnePlus 9', price: 45000 },
            { label: 'OnePlus 10T', value: 'OnePlus 10T', price: 58000 },
            { label: 'OnePlus Nord CE', value: 'OnePlus Nord CE', price: 30000 }
        ],
        'Vivo': [
            { label: 'Vivo V27', value: 'Vivo V27', price: 29000 },
            { label: 'Vivo Y20', value: 'Vivo Y20', price: 14000 },
            { label: 'Vivo X80', value: 'Vivo X80', price: 56000 }
        ],
        'Oppo': [
            { label: 'Oppo Reno 8', value: 'Oppo Reno 8', price: 28000 },
            { label: 'Oppo A78', value: 'Oppo A78', price: 17000 },
            { label: 'Oppo F21 Pro', value: 'Oppo F21 Pro', price: 25000 }
        ]
    };

    openModal() {
        this.showModal = true;
    }

    handleCancel() {
        this.resetAll();
    }

    resetAll() {
        this.showModal = false;
        this.selectedBrand = '';
        this.selectedModel = '';
        this.selectedPrice = '';
        this.modelOptions = [];
        this.stepTwo = false;
        this.userName = '';
        this.userEmail = '';
        this.userPhone = '';
    }

    handleBrandChange(event) {
        this.selectedBrand = event.detail.value;
        const models = this.brandModelMap[this.selectedBrand] || [];
        this.modelOptions = models.map(model => ({
            label: model.label,
            value: model.value
        }));
        this.selectedModel = '';
        this.selectedPrice = '';
    }

    handleModelChange(event) {
        this.selectedModel = event.detail.value;
        const selected = this.brandModelMap[this.selectedBrand].find(
            model => model.value === this.selectedModel
        );
        this.selectedPrice = selected?.price || '';
    }

    goToStepTwo() {
        if (this.selectedBrand && this.selectedModel && this.selectedPrice) {
            this.stepTwo = true;
            this.showToast('Confirmed', 'Model selected. Please enter your details.', 'success');
        } else {
            this.showToast('Error', 'Please select both brand and model first.', 'error');
        }
    }

    handleNameChange(event) {
        this.userName = event.detail.value;
    }

    handleEmailChange(event) {
        this.userEmail = event.detail.value;
    }

    handlePhoneChange(event) {
        this.userPhone = event.detail.value;
    }

    handleSave() {
        if (this.userName && this.userEmail && this.userPhone) {
            const msg = `Saved: ${this.userName} selected ${this.selectedBrand} ${this.selectedModel} for ₹${this.selectedPrice}`;
            this.showToast('Saved', msg, 'success');
            this.resetAll();
        } else {
            this.showToast('Error', 'Please complete all fields before saving.', 'error');
        }
    }

    resetSelection() {
        this.stepTwo = false;
        this.userName = '';
        this.userEmail = '';
        this.userPhone = '';
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}