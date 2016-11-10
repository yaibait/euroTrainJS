import { Injectable } from '@angular/core';
import { IProduct } from '../model/IProduct';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
@Injectable()
export class ProductService{
    private _productUrl = 'http://localhost:8088/product.json';
    constructor(private _http: Http){

    }
    getProducts():Observable<IProduct[]> {
        
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
                .map((response:Response) => <IProduct[]>response.json())
                .catch(this.handleError)
                ;
    }

    private handleError(error: Response){
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}