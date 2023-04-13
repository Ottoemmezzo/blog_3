import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Articolo } from 'src/app/model/articolo';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-filosofia',
  templateUrl: './filosofia.component.html',
  styleUrls: ['./filosofia.component.scss']
})
export class FilosofiaComponent implements OnInit{
  politica:Articolo[]=[];
  articoli$!:Observable<Articolo[]>;
  constructor(private db:DbService){}
  ngOnInit(){
    this.articoli$=this.db.getArt('/pubblicati');//
    this.articoli$=this.articoli$.pipe(map(p=> p.filter( p=> p.categoria=='Filosofia') ));






  }

}
