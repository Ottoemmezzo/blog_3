import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Articolo } from './model/articolo';
import { Categoria } from './model/categoria';
import { DbService, Lista } from './services/db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'blog_3';
  categorie!:Categoria[];
  liste:Lista[]=[];
  articoli:Articolo[]=[];
 /* curLista:Lista={
    nome:{nome:"",imgUrl:"",id:""},
    articoli:[]
  }*/
  constructor(private db:DbService){
    /*this.db.loadCategorie().subscribe(res=>
      {
        this.categorie=res;
        console.log("cat 0:",this.categorie[0].nome);

        this.db.loadArticoliBy(this.categorie[0].id).subscribe(res=>{
          this.curLista.nome=this.categorie[0];
          this.curLista.articoli=res;
          this.liste.push(this.curLista);
          console.log("cat 0:",this.categorie[0].nome);

        });
        this.db.loadArticoliBy(this.categorie[1].id).subscribe(res=>{
          this.curLista.nome=this.categorie[1];
          this.curLista.articoli=res;
          this.liste.push(this.curLista);
          console.log("cat 1:",this.categorie[1].nome);

        });
        this.db.loadArticoliBy(this.categorie[2].id).subscribe(res=>{
          this.curLista.nome=this.categorie[2];
          this.curLista.articoli=res;
          this.liste.push(this.curLista);
          console.log("cat 2:",this.categorie[2].nome);

        });


        this.db.liste=this.liste;
      });*/

    /*this.db.categorie$.subscribe(d=>{
      this.categorie=d;
      this.db.categorie=d;
      console.log("root-categorie:",this.db.categorie);
      this.liste=this.db.loadArticoliBy(this.db.categorie.);

    });*/



  }
  ngOnInit(){


}


}
