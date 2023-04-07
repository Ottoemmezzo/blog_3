import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Articolo } from 'src/app/model/articolo';
import { Categoria } from 'src/app/model/categoria';
import { DbService, Lista } from 'src/app/services/db.service';
import { ArticoliService } from '../articoli.service';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserComponent implements OnInit {
  static index = 0;
  isLoaded = false;
  articoli$!: Observable<Articolo[]>;
  pubblicati$!: Observable<Articolo[]>;
  categorie$!: Observable<any[]>;
  categorie: Categoria[] = [];
  articoli: Articolo[] = [];
  bozze: Articolo[] = [];
  profileUrl!: Observable<string>;
  id!: string;
  l: string = 'card';
  Url = '';
  static progress = 0;
  liste: Lista[] = [];
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;
  autore = "";
  uid:string='';



  constructor(private auth:AngularFireAuth, private artSrv: ArticoliService, private db: DbService, private route: ActivatedRoute, private router: Router, private storage: AngularFireStorage) {

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
  setArt(cat: Categoria) {
    return this.db.loadArticoliBy(cat.nome);
  }
  ngOnInit() {
    //this.db.loadCategorie().subscribe(c => this.categorie = c)
    this.auth.authState.subscribe(u=>{this.uid=u?.uid as string; if (u?.uid=='PU4wnyTErROVLLCw66YvcnHorq22') this.uid='admin'});
    this.articoli$=this.db.getArt('articoli');//.subscribe(r => {this.articoli = r; console.log("Inpu-main:",this.articoli);});
    this.pubblicati$=this.db.getArt('pubblicati');
    //console.log("Inpu-main:",this.articoli);

    //this.auth.authState.subscribe(user=> this.autore=user?.displayName as string )


  }


  openArticolo(id: string) {
    //this.articoli.subscribe(res=>console.log('che roba è?',res));
    console.log('ID:', id);


    this.router.navigateByUrl(`/articolo?id=${id}`);

  }
  getDownloadURL(url: string) {
    //console.log("url:",this.st.downloadURL);
    //console.log("Starobba!",this.st.downloadUrl());
    const ref = this.storage.ref(url);
    this.profileUrl = ref.getDownloadURL();




  }

  editArticolo(id: string) {
    console.log('ID:', id);

    this.router.navigateByUrl(`/update?id=${id}`);

  }

}
