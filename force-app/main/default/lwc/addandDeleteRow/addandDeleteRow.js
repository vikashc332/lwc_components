import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AddDeleteRowDynamic extends LightningElement {
    @track rows = [];
    nextId = 1;

    productOptions = [
        { label: 'Laptop', value: 'Laptop' },
        { label: 'Monitor', value: 'Monitor' },
        { label: 'Mouse', value: 'Mouse' }
    ];

    typeOptions = [
        { label: 'Hardware', value: 'Hardware' },
        { label: 'Software', value: 'Software' },
        { label: 'Accessory', value: 'Accessory' }
    ];

    quantityOptions = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '5', value: '5' },
        { label: '10', value: '10' }
    ];

    priceOptions = [
        { label: '$100', value: '100' },
        { label: '$200', value: '200' },
        { label: '$500', value: '500' },
        { label: '$1000', value: '1000' }
    ];

    connectedCallback() {
        this.addRow(true);
    }

    addRow(isFirst = false) {
        const newRow = {
            id: this.nextId++,
            productName: '',
            type: '',
            qty: '',
            price: '',
            isFirst: this.rows.length === 0 // First row
        };
        this.rows = [...this.rows, newRow];

        if (!isFirst) {
            this.showToast('Row Added', 'A new row was added.', 'success');
        }
    }

    handleDelete(event) {
        const rowId = parseInt(event.currentTarget.dataset.id, 10);
        const firstRowId = this.rows.length > 0 ? this.rows[0].id : null;

        if (rowId === firstRowId) {
            this.showToast('Cannot Delete', 'First row cannot be deleted.', 'error');
            return;
        }

        this.rows = this.rows.filter(row => row.id !== rowId);
        this.showToast('Row Deleted', 'Row deleted successfully.', 'warning');
    }

    deleteLastRow() {
        if (this.rows.length <= 1) {
            this.showToast('Cannot Delete', 'First row cannot be deleted.', 'error');
        } else {
            this.rows = this.rows.slice(0, -1);
            this.showToast('Row Deleted', 'Last row deleted.', 'warning');
        }
    }

    handleChange(event) {
        const field = event.target.dataset.field;
        const value = event.target.value;
        const rowId = parseInt(event.target.dataset.id, 10);

        this.rows = this.rows.map(row => {
            if (row.id === rowId) {
                return { ...row, [field]: value };
            }
            return row;
        });
    }

    handleSave() {
        console.log('Saving rows:', JSON.stringify(this.rows));
        this.showToast('Save', 'Rows have been saved successfully (console log only)', 'success');
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant
        }));
    }
}