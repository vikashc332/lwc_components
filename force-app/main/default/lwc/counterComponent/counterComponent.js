import { LightningElement, track } from 'lwc';
export default class CounterComponent extends LightningElement {
@track count = 0;

handleIncrement() {
    this.count += 1;
}

handleDecrement() {
    this.count -= 1;
}
}