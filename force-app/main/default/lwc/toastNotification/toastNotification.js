import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ToastNotifier extends LightningElement {
    isModalOpen = false;
    isLoading = false;

    // Toasts
    showSuccessToast() {
        debugger;
        this.dispatchEvent(new ShowToastEvent({
            title: 'Success!',
            message: 'Operation was successful.',
            variant: 'success'
        }));
    }

    showErrorToast() {
        debugger;
        this.dispatchEvent(new ShowToastEvent({
            title: 'Error!',
            message: 'Something went wrong.',
            variant: 'error'
        }));
    }

    showInfoToast() {
        debugger;
        this.dispatchEvent(new ShowToastEvent({
            title: 'Info',
            message: 'Here is some information.',
            variant: 'info'
        }));
    }

    // Modal
    openModal() {
        debugger;
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    confirmAction() {
        this.isModalOpen = false;
        this.dispatchEvent(new ShowToastEvent({
            title: 'Confirmed',
            message: 'You confirmed the action.',
            variant: 'success'
        }));
    }

    // Spinner
    startLoading() {
        this.isLoading = true;

        // Simulate loading (e.g., data fetch)
        setTimeout(() => {
            this.isLoading = false;
            this.dispatchEvent(new ShowToastEvent({
                title: 'Done',
                message: 'Loading completed successfully.',
                variant: 'success'
            }));
        }, 2000); // 2 seconds
    }
}