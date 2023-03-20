import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { DbService } from 'src/app/services/db.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';
import { FireStorageService } from 'src/app/services/fire-storage.service';
import { Router } from '@angular/router';
import { ImmagineComponent } from '../immagine/immagine.component';
import { imgItem } from '../imgItem';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  filePath!:string;
  updPath!:string;
  form:FormGroup;
  categorie=['c#','Angular','Javascript'];
  autori=['Sebastian','Daniele','Massimo'];
  titolo=new FormControl("");
  categoria=new FormControl("");
  corpo=new FormControl("");
  autore=new FormControl("");
  urlImg=new FormControl("");
  constructor(fb:FormBuilder,private db:DbService, private st:FireStorageService, private router:Router){
    this.form=fb.group({
      "titolo":this.titolo,
      "categoria":this.categoria,
      "corpo":this.corpo,
      "autore":this.autore,
      "urlImg":this.urlImg

    });

  }
  onSubmit(){
    this.db.add(this.form.value,this.updPath);
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
