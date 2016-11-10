"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
var ProductService = (function () {
    function ProductService(_http) {
        this._http = _http;
        this._productUrl = 'http://localhost:8088/product.json';
    }
    ProductService.prototype.getProducts = function () {
        // return [
        // {
        // "productId": 1,
        // "productName": "Leaf Rake",
        // "productCode": "GDN-0011",
        // "releaseDate": "March 19, 2016",
        // "description": "Leaf rake with 48-inch wooden handle.",
        // "price": 19.95,
        // "starRating": 3.2,
        // "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
        // },
        // {
        //     "productId": 2,
        //     "productName": "Garden Cart",
        //     "productCode": "GDN-0023",
        //     "releaseDate": "March 18, 2016",
        //     "description": "15 gallon capacity rolling garden cart",
        //     "price": 32.99,
        //     "starRating": 4.2,
        //     "imageUrl": "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
        // }
        // ];
        return this._http.get(this._productUrl)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ProductService.prototype.handleError = function (error) {
        console.log(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    ProductService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map