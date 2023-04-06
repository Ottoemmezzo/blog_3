import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { DbService } from 'src/app/services/db.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';
import { FireStorageService } from 'src/app/services/fire-storage.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ImmagineComponent } from '../immagine/immagine.component';
import { imgItem } from '../imgItem';
import { Categoria } from 'src/app/model/categoria';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Articolo } from 'src/app/model/articolo';
import * as firebase from 'firebase/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@firebase/firestore-types';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit{
  selCat!:Categoria;
  id!:string;
  filePath!:string;
  updPath:string="";
  form:FormGroup;
  categorie:Categoria[]=[];
  autori=['Sebastian','Daniele','Massimo'];
  titolo=new FormControl("");
  categoria=new FormControl("");
  corpo=new FormControl("");
  dataCreazione=new FormControl(new Date());
  visibilita=new FormControl("");
  descrizione=new FormControl("");
  autore='';
  uid='';
  urlImg=new FormControl("");
  constructor(fb:FormBuilder,
    private db:DbService,
    private st:FireStorageService,
    private route:ActivatedRoute,
    private router:Router,
    private auth:AngularFireAuth,
    private aFs:AngularFirestore){

    this.form=fb.group({
      "titolo":this.titolo,
      "categoria":this.categoria,
      "corpo":this.corpo,
      "picker":this.dataCreazione,
      "urlImg":this.urlImg,
      "visibilita":this.visibilita,
      "descrizione":this.descrizione

    });

  }
  ngOnInit(): void {
   this.db.loadCategorie().subscribe(c=>this.categorie=c);
    console.log("componente ADD, categorie:",this.categorie);
   this.auth.authState.subscribe(u=> {this.uid=u?.uid as string; this.autore=u?.displayName as string});




  }
  onSubmit(){

    this.categorie.forEach(c=>{
      if(c.nome==this.categoria.value) this.selCat=c;
    })
    let art:Articolo={
      autore:this.autore,
      categoria:this.categoria.value as string,
      corpo:this.corpo.value as string,
      imgUrl:this.updPath,
      dataCreazione:this.dataCreazione.value?.toDateString() as string,
      titolo:this.titolo.value as string,
      id:'',
      idAutore:this.uid,
      pubblicato:false,
      pos:this.visibilita.value as string,
      descrizione:this.descrizione.value as string
    }
    this.db.add(art,this.updPath,'articoli');
    //this.db.add({...this.form.value,autore:this.autore},this.updPath,this.selCat);

    console.log("Post aggiunto!",this.form.value);

    this.router.navigate(['/lista']);


  }
  uploadFile(event:any,filePath:string){
    this.updPath=filePath.slice(12,filePath.length);
    console.log("Path ripulito:",this.updPath);

    this.st.uploadFile(event,this.updPath)
  }

}
