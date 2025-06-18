import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DualListBoxDemo extends LightningElement {
    // Fruits Example
    fruitOptions = [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Cherry', value: 'cherry' },
        { label: 'Grapes', value: 'grapes' },
        { label: 'Mango', value: 'mango' },
        { label: 'Orange', value: 'orange' }
    ];

    @track selectedFruits = [];

    handleFruitChange(event) {
        this.selectedFruits = event.detail.value;
    }

    // Skills Example
    skillOptions = [
        { label: 'Apex', value: 'apex' },
        { label: 'LWC', value: 'lwc' },
        { label: 'Aura', value: 'aura' },
        { label: 'Visualforce', value: 'vf' },
        { label: 'SOQL', value: 'soql' },
        { label: 'Flows', value: 'flows' }
    ];

    @track selectedSkills = ['lwc', 'apex']; // Pre-selected values

    handleSkillChange(event) {
        this.selectedSkills = event.detail.value;
    }

    handleSave() {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Skills Saved',
                message: 'You selected: ' + this.selectedSkills.join(', '),
                variant: 'success'
            })
        );
    }
}