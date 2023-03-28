import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Articolo } from 'src/app/model/articolo';
import { Categoria } from 'src/app/model/categoria';
import { DbService } from 'src/app/services/db.service';
import { FireStorageService } from 'src/app/services/fire-storage.service';

@Component({
  selector: 'app-upd-articolo',
  templateUrl: './upd-articolo.component.html',
  styleUrls: ['./upd-articolo.component.scss']
})
export class UpdArticoloComponent {
  filePath!: string;
  updPath!: string;
  form!: FormGroup;
  categorie!:Categoria[];
  autori! :string;
  titolo = new FormControl("");
  categoria = new FormControl("");
  corpo = new FormControl("");
  autore = new FormControl("");
  urlImg = new FormControl("");
  id!: string;
  doc!: Articolo;
  cat!:string;
  constructor(private auth:AngularFireAuth,fb: FormBuilder, private db: DbService, private st: FireStorageService, private router: Router, private route: ActivatedRoute) {
    this.categorie=this.db.categorie;
    this.form = fb.group({
      "titolo": this.titolo,
      "categoria": this.categoria,
      "corpo": this.corpo,
      "autore": this.autore,
      "urlImg": this.urlImg

    });
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.cat= params['cat'];
      console.log("Update, parametro cat:",this.cat);

    });
    this.db.get(this.id).subscribe((d:any)=>{
      this.doc=d;
      console.log("UPD ART, articolo:",this.doc);
      this.titolo.setValue(this.doc.titolo);
          this.urlImg.setValue(this.doc.imgUrl);
          this.corpo.setValue(this.doc.corpo);
          this.categoria.setValue(this.cat);

    });
    this.db.loadCategorie().subscribe(c=>this.categorie=c);
    this.auth.authState.subscribe(user=> {
      console.log("autore:",user?.displayName);
      this.autori=user?.displayName as string;
      this.autore.setValue(user?.displayName as string)

    });

  }
  onSubmit() {


    this.db.upd(this.id,<string>this.categoria.value,this.form.value);

    //this.articoli.subscribe(res=>ImmagineComponent.articoli=res);
    //this.router.navigate(['/lista']);

    this.router.navigate(['/lista']);


  }
  uploadFile(event: any, filePath: string) {
    this.updPath = filePath.slice(12, filePath.length);
    console.log("Path ripulito:", this.updPath);

    this.st.uploadFile(event, this.updPath)
    this.form.value.imgUrl = this.updPath;
  }

}
