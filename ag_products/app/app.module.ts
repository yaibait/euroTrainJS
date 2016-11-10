import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent }  from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { StarComponent } from './share/star.component';
import { ProductDetailComponent } from './products/product-detail.component';
import { HttpModule } from '@angular/http';
@NgModule({
  imports:      [ 
      BrowserModule, 
      HttpModule,
      RouterModule.forRoot([
        { path: 'products', component: ProductListComponent},
        { path: 'product/:id', component: ProductDetailComponent},
        
      ])
      ],
  declarations: [ AppComponent,ProductListComponent,StarComponent,ProductDetailComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
