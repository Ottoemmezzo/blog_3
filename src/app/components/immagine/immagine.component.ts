import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';
import { Observable } from '@firebase/util';
import { ImgDirective } from 'src/app/img.directive';
import { Articolo } from 'src/app/model/articolo';
import { FireStorageService } from 'src/app/services/fire-storage.service';
import { ArticoliService } from '../articoli.service';
import { InterImgComponent } from 'src/app/model/interImg.component';
import { imgItem } from '../imgItem';

export interface typeImg{
  path:string;
}

@Component({
  selector: 'app-immagine',
  templateUrl: './immagine.component.html',
  styleUrls: ['./immagine.component.scss']
})
export class ImmagineComponent implements OnInit {
  imgUrl='';
  static articoli:Articolo[]=[];
  @Input() fPath!:imgItem;
  @ViewChild(ImgDirective, {static: true}) adHost!: ImgDirective;
  //@Output() updated= new EventEmitter<string>();


  profileUrl: any; //Observable <string | null >;
  static indice=0;
  ref!:AngularFireStorageReference;


  constructor(private artSrv:ArticoliService, private storage:AngularFireStorage, private storagesrv:FireStorageService){
   /* console.log('ebbene:',ArticoliService.articoli[ArticoliService.currentArticolo].imgUrl);
    console.log('I:',ImmagineComponent.indice);
      */
   //const ref=storage.ref("/14-marzo-2023-1050x1037.jpg");
  /* const ref=storage.ref(ArticoliService.articoli[ArticoliService.currentArticolo].imgUrl);
   this.profileUrl= ref.getDownloadURL();*/
   //ImmagineComponent.indice++;
   //ArticoliService.currentArticolo++;
  }
  ngOnInit(): void {
    console.log('ebbene:',this.fPath);

    if(this.fPath.fPath=="old"){
      console.log("fino a qui...");

      this.ref=this.storage.ref(ImmagineComponent.articoli[ImmagineComponent.indice].imgUrl);
      this.profileUrl= this.ref.getDownloadURL();
      ImmagineComponent.indice++;
      console.log('I:',ImmagineComponent.indice);
    }
    else{
      console.log("qui...",this.fPath);
      const viewContainerRef = this.adHost.viewContainerRef;
      viewContainerRef.clear();
      let img=new ImmagineComponent(this.artSrv,this.storage,this.storagesrv);
      const componentRef = viewContainerRef.createComponent<typeImg>(this.fPath.fPath);
      componentRef.instance.path = this.fPath.fPath;

      this.ref=this.storage.ref(this.fPath.fPath);
      this.profileUrl= this.ref.getDownloadURL();
      ImmagineComponent.indice=0;
      console.log('I:',ImmagineComponent.indice);

    }

  }

}
