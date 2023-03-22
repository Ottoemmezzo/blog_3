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
  autore=new FormControl("");
  urlImg=new FormControl("");
  constructor(fb:FormBuilder,
    private db:DbService,
    private st:FireStorageService,
    private route:ActivatedRoute,
    private router:Router){
    this.form=fb.group({
      "titolo":this.titolo,
      "categoria":this.categoria,
      "corpo":this.corpo,
      "autore":this.autore,
      "urlImg":this.urlImg

    });

  }
  ngOnInit(): void {
    this.categorie=this.db.categorie;
    console.log("componente ADD, categorie:",this.categorie);


  }
  onSubmit(){

    this.categorie.forEach(c=>{
      if(c.nome==this.categoria.value) this.selCat=c;
    })
    this.db.add(this.form.value,this.updPath,this.selCat);
    //this.db.upd(this.id,this.categoria.value,this.form.value);
    //this.db.add(this.form.value,'',this.selCat);
    console.log("Post aggiunto!",this.form.value, ImmagineComponent.indice);
    ImmagineComponent.indice=0;
    //this.articoli.subscribe(res=>ImmagineComponent.articoli=res);
    //this.router.navigate(['/lista']);

    this.router.navigate(['/lista']);


  }
  uploadFile(event:any,filePath:string){
    this.updPath=filePath.slice(12,filePath.length);
    console.log("Path ripulito:",this.updPath);

    this.st.uploadFile(event,this.updPath)
  }

}
