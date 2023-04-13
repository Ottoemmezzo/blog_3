import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat/app';
//import * as firebase from 'firebase/compat';
import { Observable, Subject, from, map, take, tap } from 'rxjs';
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
  pubblicati$!: Observable<Articolo[]>;
  chosenCat='Politica';
  //=new Subject<string>;
  //chosenCat='Politica';
 /* curLista:Lista={
    nome:{nome:"",imgUrl:"",id:""},
    articoli:[]
  }*/
  constructor(private db:DbService){
    (<any>window).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    /*let p=this.db.getArt('pubblicati');
    let post= this.db.waitFor(p);
    post.then((a:Articolo[])=>this.articoli=a);
    console.log("Articoli:",this.articoli);*/
    this.pubblicati$=this.db.getArt('/pubblicati');//
    this.pubblicati$.subscribe(p=>{
    // console.log("articoli:",p);

     this.articoli=p.filter(f=> f.categoria=='Politica');
   });





  }
    ngOnInit(){

    /*this.db.queryArt("Politica").subscribe(a=>{
      console.log("Articli:",a);
      this.articoli=a});
    }*/
    /*this.db.getArt('pubblicati').subscribe(a=> {
      this.articoli=a;
      console.log("Articoli:",a);


    });*/

  }

loadChosenCat(cat:string){
  console.log("categoria:",cat);
  this.chosenCat=cat;
  //from(cat).subscribe(this.chosenCat);
  console.log("this.chosenCat:",this.chosenCat);
  this.ngOnInit();

  //.subscribe(c=>console.log("sottoscritta categoria:",c));

}

}
