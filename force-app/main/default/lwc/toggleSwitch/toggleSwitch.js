import { LightningElement, track } from 'lwc';

export default class ToggleFormFields extends LightningElement {
    @track isEnabled = false;

    get statusLabel() {
        return this.isEnabled ? 'Enabled' : 'Disabled';
    }

    get isDisabled() {
        return !this.isEnabled;
    }

    handleToggle(event) {
        this.isEnabled = event.target.checked;
    }
}