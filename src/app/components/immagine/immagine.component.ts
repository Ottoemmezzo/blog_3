import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';
import { Observable } from '@firebase/util';
import { Articolo } from 'src/app/model/articolo';
import { DbService } from 'src/app/services/db.service';


@Component({
  selector: 'app-immagine',
  templateUrl: './immagine.component.html',
  styleUrls: ['./immagine.component.scss']
})
export class ImmagineComponent implements OnInit {
  imgUrl='';
  articoli:Articolo[]=[];
  articoli$!: Observable<any[]>;
  @Input() imgPath:string="";

  profileUrl: any; //Observable <string | null >;
  static indice=0;
  ref!:AngularFireStorageReference;


  constructor(private db:DbService,private storage:AngularFireStorage){
  }
  ngOnInit(): void {
    console.log('Inizializzo immagine. Percorso Storage:',this.imgPath);

      this.ref=this.storage.ref(this.imgPath);
      this.profileUrl= this.ref.getDownloadURL();
  }

}
