import { Component } from '@angular/core';
import { CardComponent, Card } from './card/card.component';
import { CardService } from './card.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [CardService]
})
export class AppComponent {
  title = 'Memory App';
  listIcon:string[];
  listCard:Card[] = [];
  numberStart:number;
  ptEvent:string = 'auto';
  lastCard:Card;
  count:number = 0;
  listCardShow = {};
  constructor(private cardService:CardService){
    this.numberStart = 10;
    // let list = cardService.getRandomIcon(this.numberStart);
     //this.listIcon = cardService.getRandomIcon(this.numberStart);
     this.listIcon = this.randomIconList();
     this.listIcon.forEach(icon => {
       this.listCard.push(new Card('inactive',icon));
     });
  }
  randomIconList(){
    let state = 0;
    let listRandom = this.cardService.getRandomIcon(this.numberStart);
    console.log(listRandom);
    let list:string[] = [];
    let num = this.numberStart * 2;
    console.log(list[10]);
   
    for(var i =0; i < listRandom.length; i++){
      
      while(true){
        let tempNum = Math.floor(Math.random()*num);
        
        if(list[tempNum] == undefined){
          list[tempNum] = listRandom[i];
          if(i == (listRandom.length - 1)){
            if(state == 1){
              return list;
            }else{
              state = 1;
              i = -1;
            }
          }
          break;
        }
      }

    }
  }

  clickCard(obj){
    // this.state = (this.state === 'active' ? 'inactive' : 'active');
    console.log(obj);
  }
  cardChangeEvent(obj:Card){
        if(!this.lastCard) this.lastCard = obj;
        if(obj.state === 'active'){
          this.count++;
          console.log(this.count);
          if(this.count == 2){
            this.ptEvent = "none";
            // check 
            if(this.lastCard.icon == obj.icon) this.listCardShow[obj.icon] = 1;
            setTimeout(() => {
                this.listCard.forEach(aCard => {
                  
                  if(aCard.state == 'active' && this.listCardShow[aCard.icon] == undefined)
                        aCard.changeState();
              });
              this.count = 0;
              this.ptEvent = "auto";
              this.lastCard = undefined;
            }, 500);
            
          }
        }else{
          if(this.count > 0){
            this.count--;
          }
        }
        
        if(this.numberStart == Object.keys(this.listCardShow).length){
            setTimeout(() => {
              this.nextGame();
            }, 200);
        }
        
  }

  nextGame(){
    this.clearData();
    this.numberStart++;
    this.listIcon = this.randomIconList();
     this.listIcon.forEach(icon => {
       this.listCard.push(new Card('inactive',icon));
     });
  }
  clearData(){
    this.listIcon = [];
    this.listCard = [];
    this.lastCard = undefined;
    this.count = 0;
    this.listCardShow = {};
  }
}
