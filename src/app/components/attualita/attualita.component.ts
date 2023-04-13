import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Articolo } from 'src/app/model/articolo';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-attualita',
  templateUrl: './attualita.component.html',
  styleUrls: ['./attualita.component.scss']
})
export class AttualitaComponent {
  politica:Articolo[]=[];
  articoli$!:Observable<Articolo[]>;
  constructor(private db:DbService){}
  ngOnInit(){
    this.articoli$=this.db.getArt('/pubblicati');//
    this.articoli$=this.articoli$.pipe(map(p=> p.filter( p=> p.categoria=='Attualità') ));






  }

}
