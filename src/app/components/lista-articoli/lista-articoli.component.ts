import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, tap } from 'rxjs';
import { Articolo } from 'src/app/model/articolo';
import { DbService } from 'src/app/services/db.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FireStorageService } from 'src/app/services/fire-storage.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ArticoliService } from '../articoli.service';
import { ImmagineComponent } from '../immagine/immagine.component';

@Component({
  selector: 'app-lista-articoli',
  templateUrl: './lista-articoli.component.html',
  styleUrls: ['./lista-articoli.component.scss']
})
export class ListaArticoliComponent implements OnInit{
  articoli$!: Observable<any[]>;
  articoli:Articolo[]=[];
  profileUrl!:Observable<string >;
  id!:string;
  l:string='card';
  Url='';

  constructor(private artSrv: ArticoliService, private db: DbService,private route: ActivatedRoute, private router:Router,private storage:AngularFireStorage) {

  }
  ngOnInit(): void {
    this.articoli$ = this.db.loadArticoli();
    ImmagineComponent.indice=0;
    this.articoli$.subscribe(res=>this.articoli=res);

  }

  openArticolo(id:string){
    //this.articoli.subscribe(res=>console.log('che roba è?',res));
    console.log('ID:',id);


    this.router.navigateByUrl(`/articolo?id=${id}`);

  }
  getDownloadURL(url:string){
    //console.log("url:",this.st.downloadURL);
    //console.log("Starobba!",this.st.downloadUrl());
    const ref=this.storage.ref(url);
    this.profileUrl=ref.getDownloadURL();




  }
  delArticolo(id:string){
    this.db.del(id);
    //this.articoli = this.db.loadArticoli();
    ImmagineComponent.indice=0;
    //this.articoli.subscribe(res=>ImmagineComponent.articoli=res);
    this.router.navigate(['/lista']);
  }
  editArticolo(id:string){
    console.log('ID:',id);

    this.router.navigateByUrl(`/update?id=${id}`);

  }

}
