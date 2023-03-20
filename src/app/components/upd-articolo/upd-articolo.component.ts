import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Articolo } from 'src/app/model/articolo';
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
  categorie = ['c#', 'Angular', 'Javascript'];
  autori = ['Sebastian', 'Daniele', 'Massimo'];
  titolo = new FormControl("");
  categoria = new FormControl("");
  corpo = new FormControl("");
  autore = new FormControl("");
  urlImg = new FormControl("");
  id!: string;
  doc!: Articolo;
  constructor(fb: FormBuilder, private db: DbService, private st: FireStorageService, private router: Router, private route: ActivatedRoute) {
    this.form = fb.group({
      "titolo": this.titolo,
      "categoria": this.categoria,
      "corpo": this.corpo,
      "autore": this.autore,
      "urlImg": this.urlImg

    });
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.db.getArt(this.id).subscribe(res => {
        console.log("id====",this.id);

        res.forEach(data => {
        if (data.id == this.id) {
          this.doc = data;
          this.titolo.setValue(this.doc.titolo);
          this.urlImg.setValue(this.doc.imgUrl);
          this.corpo.setValue(this.doc.corpo);

        }

      });
    });


  }
  onSubmit() {
    this.db.edit(this.id, this.form.value);

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
