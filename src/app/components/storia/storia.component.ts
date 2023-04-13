import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Articolo } from 'src/app/model/articolo';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-storia',
  templateUrl: './storia.component.html',
  styleUrls: ['./storia.component.scss']
})
export class StoriaComponent {
  politica:Articolo[]=[];
  articoli$!:Observable<Articolo[]>;
  constructor(private db:DbService){}
  ngOnInit(){
    this.articoli$=this.db.getArt('/pubblicati');//
    this.articoli$=this.articoli$.pipe(map(p=> p.filter( p=> p.categoria=='Storia') ));






  }
}
