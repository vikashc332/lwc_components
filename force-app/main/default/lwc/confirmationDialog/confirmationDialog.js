import { LightningElement, track } from 'lwc';

export default class ProductManagerWithDialog extends LightningElement {
    @track products = [];
    @track isDialogOpen = false;
    @track dialogTitle = '';
    @track dialogMessage = '';
    @track showSuccess = false;
    @track successMessage = '';

    dialogAction = null;
    targetRowId = null;
    productIdCounter = 1;

    productOptions = [
        { label: 'Product A', value: 'Product A' },
        { label: 'Product B', value: 'Product B' },
        { label: 'Product C', value: 'Product C' }
    ];

    connectedCallback() {
        this.addProduct();
    }

    addProduct = () => {
        this.products = [
            ...this.products,
            {
                id: this.productIdCounter++,
                name: '',
                quantity: 1
            }
        ];
    }

    handleChange(event) {
        const { id } = event.target.dataset;
        const field = event.target.dataset.field;
        const value = event.target.value;

        this.products = this.products.map(product =>
            product.id === parseInt(id, 10)
                ? { ...product, [field]: value }
                : product
        );
    }

    confirmDeleteRow(event) {
        this.targetRowId = parseInt(event.target.dataset.id, 10);
        this.dialogTitle = 'Delete Product';
        this.dialogMessage = 'Are you sure you want to delete this product?';
        this.dialogAction = 'deleteRow';
        this.isDialogOpen = true;
    }

    confirmDeleteAll() {
        this.dialogTitle = 'Delete All Products';
        this.dialogMessage = 'Are you sure you want to delete all products?';
        this.dialogAction = 'deleteAll';
        this.isDialogOpen = true;
    }

    confirmSave() {
        this.dialogTitle = 'Save Products';
        this.dialogMessage = 'Do you want to save these products?';
        this.dialogAction = 'save';
        this.isDialogOpen = true;
    }

    cancelDialog = () => {
        this.isDialogOpen = false;
        this.dialogAction = null;
        this.targetRowId = null;
    }

    confirmDialogAction = () => {
        if (this.dialogAction === 'deleteRow') {
            this.products = this.products.filter(p => p.id !== this.targetRowId);
            this.showSuccessToast('Product deleted successfully!');
        } else if (this.dialogAction === 'deleteAll') {
            this.products = [];
            this.showSuccessToast('All products deleted successfully!');
        } else if (this.dialogAction === 'save') {
            console.log('Saving:', JSON.stringify(this.products));
            this.showSuccessToast('Products saved successfully!');
        }

        this.isDialogOpen = false;
        this.dialogAction = null;
        this.targetRowId = null;
    }

    showSuccessToast(message) {
        this.successMessage = message;
        this.showSuccess = true;
        setTimeout(() => {
            this.showSuccess = false;
        }, 3000);
    }
}