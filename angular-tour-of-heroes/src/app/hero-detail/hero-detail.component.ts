import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute,Params } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input()
  hero:Hero;
  constructor(
                private heroService:HeroService,
                private route:ActivatedRoute,
                private location:Location
  
              ) { }

  ngOnInit() {
    this.route.params.forEach((params:Params) => {
        
        let id = +params["id"];
        console.log(id)
        this.heroService.getHero(id).then(hero => {
          this.hero = hero;
          console.log(this.hero);
        });
    })
  }

  goBack(): void {
    this.location.back();
  }

}
