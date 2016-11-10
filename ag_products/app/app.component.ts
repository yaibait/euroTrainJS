import { Component } from '@angular/core';
import { Const } from './Const';
@Component({
    selector: 'my-app',
    template: `
        <h1>My First Angular App</h1>
        <pm-products></pm-products>
    `
})
export class AppComponent {
    constructor(){
        Const.Test = "Minh";
        console.log(Const.Test);
    }
 }
