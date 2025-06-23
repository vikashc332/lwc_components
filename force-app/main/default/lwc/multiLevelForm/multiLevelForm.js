import { LightningElement, track } from 'lwc';

export default class MultiStepForm extends LightningElement {
    @track currentStageIndex = 0;

    stages = [
        { label: 'Personal Info', value: 'personal' },
        { label: 'Contact', value: 'contact' },
        { label: 'Employment', value: 'employment' },
        { label: 'Preference', value: 'preference' },
        { label: 'Review', value: 'review' }
    ];

    @track formData = {
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        email: '',
        phone: '',
        address: '',
        jobTitle: '',
        company: '',
        experience: '',
        location: '',
        budget: '',
        propertyType: ''
    };

    genderOptions = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Other', value: 'Other' }
    ];

    propertyTypeOptions = [
        { label: 'Apartment', value: 'Apartment' },
        { label: 'Villa', value: 'Villa' },
        { label: 'Plot', value: 'Plot' }
    ];

    get currentStageValue() {
        return this.stages[this.currentStageIndex].value;
    }

    get currentStageLabel() {
        return this.stages[this.currentStageIndex].label;
    }

    get isFirstStage() {
        return this.currentStageIndex === 0;
    }

    get isLastStage() {
        return this.currentStageIndex === this.stages.length - 1;
    }

    get nextButtonLabel() {
        return this.isLastStage ? 'Submit' : 'Next';
    }

    get isStageOne() { return this.currentStageValue === 'personal'; }
    get isStageTwo() { return this.currentStageValue === 'contact'; }
    get isStageThree() { return this.currentStageValue === 'employment'; }
    get isStageFour() { return this.currentStageValue === 'preference'; }
    get isStageFive() { return this.currentStageValue === 'review'; }

    handleChange(event) {
        const field = event.target.dataset.id;
        this.formData[field] = event.target.value;
    }

    handleNext() {
        if (!this.isLastStage) {
            this.currentStageIndex++;
        } else {
            console.log('Form Data:', JSON.stringify(this.formData));
            alert('Form submitted successfully!');
        }
    }

    handleBack() {
        if (!this.isFirstStage) {
            this.currentStageIndex--;
        }
    }
}