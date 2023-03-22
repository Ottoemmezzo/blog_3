import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable, tap } from 'rxjs';
import { Articolo } from 'src/app/model/articolo';
import { DbService, Lista } from 'src/app/services/db.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FireStorageService } from 'src/app/services/fire-storage.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ArticoliService } from '../articoli.service';
import { ImmagineComponent } from '../immagine/immagine.component';
import { Categoria } from 'src/app/model/categoria';

import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-lista-articoli',
  templateUrl: './lista-articoli.component.html',
  styleUrls: ['./lista-articoli.component.scss']
})
export class ListaArticoliComponent implements OnInit {
  static index = 0;
  isLoaded=false;
  articoli$!: Observable<any[]>;
  categorie$!: Observable<any[]>;
  categorie: Categoria[]=[];
  articoli: Articolo[] = [];
  profileUrl!: Observable<string>;
  id!: string;
  l: string = 'card';
  Url = '';
  static progress=0;
  liste:Lista[]=[];
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;



  constructor(private artSrv: ArticoliService, private db: DbService, private route: ActivatedRoute, private router: Router, private storage: AngularFireStorage)
  {

  }
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  setArt(cat:Categoria){
    return this.db.loadArticoliBy(cat.nome);
  }
  ngOnInit()
 {
  this.db.loadCategorie().subscribe(c=>this.categorie=c)
  this.db.getArt().subscribe(r=>this.articoli=r);

}
/*ngAfterViewChecked(){
  console.log("Categorie-fuori:",this.categorie);
  let i = 0;
        for (let cat of this.categorie)
        {
           this.articoli$ = this.db.loadCollection(`/categorie/${cat.id}/articoli`).valueChanges() as Observable<any>;
            this.articoli$.subscribe( data=>{
            this.articoli=data;
            console.log("articoli1:", data);});
          //console.log("articoli2:", res);

          //this.articoli=<Articolo[]>res;
          i++;
        }

}*/

openArticolo(id: string){
  //this.articoli.subscribe(res=>console.log('che roba è?',res));
  console.log('ID:', id);


  this.router.navigateByUrl(`/articolo?id=${id}`);

}
getDownloadURL(url: string){
  //console.log("url:",this.st.downloadURL);
  //console.log("Starobba!",this.st.downloadUrl());
  const ref = this.storage.ref(url);
  this.profileUrl = ref.getDownloadURL();




}
/*delArticolo(id: string,cat:Categoria){
  this.db.del(id,cat);
  //this.articoli = this.db.loadArticoli();
  ImmagineComponent.indice = 0;
  //this.articoli.subscribe(res=>ImmagineComponent.articoli=res);
  this.router.navigate(['/lista']);
}*/
editArticolo(id: string){
  console.log('ID:', id);

  this.router.navigateByUrl(`/update?id=${id}`);

}

}
