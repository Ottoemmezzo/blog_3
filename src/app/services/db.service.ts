import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Articolo } from '../model/articolo';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private firestore: AngularFirestore) {
  }

  loadArticoli(){
     return this.firestore.collection('articoli').valueChanges({idField:'id'}) as Observable<Articolo[]>;

  }
  add(articolo:Articolo,path:string){
    console.log('questo è il dato',articolo);
    articolo.imgUrl=path;
    this.firestore.collection('articoli').doc().set(articolo);

  }
  getArt(id:string)
  {
    return this.firestore.collection('articoli').valueChanges({idField:'id'}) as Observable<Articolo[]>;
    /*console.log('questo è fatto...');

    collection.subscribe(res=>console.log('res',res));
    */
  }
  del(id:string){
    this.firestore.collection('articoli').doc(id).delete();


  }
  edit(id:string,newArt:Articolo){
    this.firestore.collection('articoli').doc(id).update(newArt);

  }
  }

