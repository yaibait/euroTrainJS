import { Component, OnInit,Input,ElementRef,Renderer,trigger,state,style,transition,animate,keyframes,Output,EventEmitter,ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
     animations : [
    trigger('cardState',[
      state('inactive',style({
        backgroundColor: '#eee',
        transform: 'none'
      })),
      state('active',   style({
        backgroundColor: '#cfd8dc'
      })),
      transition('inactive => active',[
        animate(100,keyframes([
          style({transform: 'rotateY(180deg)', offset: 0}),
          style({transform: 'none', offset: 1}),
        ]))
      ]),
      transition('active => inactive',[
        animate(100,keyframes([
          style({transform: 'rotateY(180deg)', offset: 1}),
          style({transform: 'none', offset: 0}),
        ]))
      ])
    ])
  ]
})
export class CardComponent implements OnInit {
 
  card:Card;
  @Output() cardChangeState = new EventEmitter();
  @Input() set setCard(_card:Card){
    this.card = _card;
  }
  
  constructor() {
      
   }

  ngOnInit() {
  }

  openCardEvent(){
    this.card.changeState();

    this.cardChangeState.emit(this.card);
    
  }
  flipStart(){
    
  }
  flipDone(e){
    
  }
}

export class Card{
  state:string;
  icon:string = 'fa-question';
  private bkIcon:string;
  constructor(_state:string = 'inactive',_icon:string){
      this.state = _state;
      this.bkIcon = _icon;
  }
  changeState(){
    this.state = (this.state === 'active') ? 'inactive' : 'active';
    this.icon = (this.state === 'active' ? this.bkIcon : 'fa-question');
    console.log(this.icon);
  }
}