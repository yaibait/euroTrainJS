import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { RouterModule }   from '@angular/router';
import { HomeComponent } from "./pages/home.component";

@NgModule({
  imports:      [ 
    BrowserModule,
    RouterModule.forRoot([
      // { path : 'home', component: HomeComponent }
    ])
   ],
  declarations: [ AppComponent,HomeComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
