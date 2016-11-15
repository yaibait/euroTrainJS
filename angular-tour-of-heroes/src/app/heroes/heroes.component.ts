import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Router} from '@angular/router';


@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  selectedHero:Hero;
  heroes:Hero[];
  constructor(private heroService:HeroService,private router:Router){
    
  }
  ngOnInit():void{
    this.getHeroes();
  }
  hero:Hero = {
    id: 1,
    name: 'Windstorm'
  };
  
  title = 'Tour of Heroes';

  heroClick(aHero:Hero){
    this.selectedHero = aHero;
    console.log(aHero.name);
  }
  getHeroes() : void {
    this.heroService.getHeroes().then( heroes => this.heroes = heroes );
  }
  gotoDetail(){
    this.router.navigate(['/detail',this.selectedHero.id]);
  }
}
