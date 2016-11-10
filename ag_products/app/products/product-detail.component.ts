import { Component } from '@angular/core';

import { IProduct } from '../model/IProduct';

@Component({
    moduleId : module.id,
    templateUrl: './product-detail.compomemt'
})

export class ProductDetailComponent{
    pageTitle:string = 'Product Detail';
    product: IProduct;

}