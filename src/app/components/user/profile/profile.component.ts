import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ImmagineComponent } from '../../immagine/immagine.component';
import { NgModel } from '@angular/forms';
import { FireStorageService } from 'src/app/services/fire-storage.service';
import { DbService } from 'src/app/services/db.service';
import { Articolo } from 'src/app/model/articolo';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

 updPath:string='';
 imgUrl:string='';
 name:string='';
 articoli:Articolo[]=[];
 user!:User;
 @ViewChild('img') img!:ImmagineComponent;

  constructor(public afAuth:AngularFireAuth,private st: FireStorageService, private db:DbService){
    afAuth.authState.subscribe(d=> {this.user=d as User;this.name=this.user.displayName as string});


  }

  uploadFile(event: any, filePath: string) {
    this.updPath = filePath.slice(12, filePath.length);
    console.log("Path ripulito:", this.updPath);

    this.st.uploadFile(event, this.updPath)
    this.imgUrl = this.updPath;
    /*this.img.imgPath=this.imgUrl;
    this.img.ngOnInit();*/
  }
  saveProfile()
  {
    this.afAuth.authState.subscribe(d=>{
      d?.updateProfile({displayName:this.name,photoURL: this.imgUrl});
   /* this.db.getArt().subscribe(a=>this.articoli=a);
    this.articoli.map(a=> if(a.autore==this.user.uid) {

    })*/

  })
  }
}
