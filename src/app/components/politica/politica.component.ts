import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Articolo } from 'src/app/model/articolo';
import { DbService } from 'src/app/services/db.service';
import { SezioneComponent } from '../sezione/sezione.component';

@Component({
  selector: 'app-politica',
  templateUrl: './politica.component.html',
  styleUrls: ['./politica.component.scss']
})
export class PoliticaComponent implements OnInit{
  politica:Articolo[]=[];
  articoli$!:Observable<Articolo[]>;
  @ViewChild('sez') sez!: SezioneComponent;
  constructor(private db:DbService)
  {

  }
  ngOnInit(){
    this.articoli$=this.db.getArt('/pubblicati');//
    this.articoli$=this.articoli$.pipe(map(p=> p.filter( p=> p.categoria=='Politica') ));






  }

}
