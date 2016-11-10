import { Component, Injectable, OnInit } from '@angular/core';
import { Const } from '../Const';
import { ProductService } from './product.service';
@Component({
    selector: 'pm-products',
    moduleId: module.id,
    templateUrl: 'product-list.component.html',
    styleUrls: ['product-list.component.css'],
    providers: [ProductService]
})
export class ProductListComponent implements OnInit{
    showImages:boolean = false;
    constructor(private _productService:ProductService){
        console.log(Const.Test);
        //this.products = productService.getProducts();

    }
    pageTitle:string = "Products Page";
    products:any;

    ngOnInit(){
        this._productService.getProducts()
            .subscribe(products => this.products = products);
    }
    showHideImageEvent(){
        this.showImages = !this.showImages;
    }
    onRatingClicked(message: string):void{
        this.pageTitle = "Product List: " + message;
    }
}