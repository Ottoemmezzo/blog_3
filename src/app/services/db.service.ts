import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Articolo } from '../model/articolo';
import { Categoria } from '../model/categoria';

export interface Lista {
  nome: Categoria,
 // articoli$: Observable<Articolo[]>
  articoli:Articolo[]
}
@Injectable({
  providedIn: 'root'
})
export class DbService {
  articoli$: Observable<Articolo[]>[]=[];
  categorie$!: Observable<Categoria[]>;
  articoli!: [];
  liste: Array<Lista> = [];
  categorie!: Categoria[];
 // curLista: Lista = { nome: <Categoria>{}, articoli: this.articoli };

  constructor(private firestore: AngularFirestore) {
    this.categorie$=this.loadCategorie();
    /*this.categorie$.subscribe(cats => {
      this.categorie = cats;
      //this.loadArticoli(this.categorie);
    }

    );
*/
  }

  /* loadArticoli(){

     return this.firestore.collection('articoli').valueChanges({idField:'id'}) as Observable<Articolo[]>;

   }*/
  queryArt(categoria:string){
    return this.firestore.collection(`articoli`, ref=> ref.where('categoria','==',categoria)).valueChanges({ idField: 'id' }) as Observable<Articolo[]>;
  }
   loadArticoliBy(id:string) {


    return this.firestore.collection(`/categorie/${id}/articoli`).valueChanges({ idField: 'id' }) as Observable<Articolo[]>;


  }
  loadCategorie() {
    //contiene array valori categorie
    //return this.firestore.collection('categorie').valueChanges({ idField: 'id' });
    //contiene riferimento a collezione
    this.categorie$ = this.firestore.collection('categorie').valueChanges({ idField: 'id' }) as Observable<Categoria[]>;
    return this.categorie$;

  }
  loadArticoli(categorie: Categoria[]) {
    let i = 0;

    for (let cat of categorie) {

      console.log("Load-Articoli. cat-totali:", categorie);
      console.log("Load-Articoli. cat-corrente:", cat.nome);
      //this.curLista.nome=cat;
      //this.articoli$ = this.firestore.collection(`/categorie/${cat.id}/articoli`).valueChanges({ idField: 'id' }) as Observable<Articolo[]>;

      i++;

    }
      this.articoli$.forEach(d=>d
        .subscribe(res => {
          console.log("Load-Articoli. Articoli:", res);
          //this.curLista.articoli = res;
          //this.liste[i]={nome:cat,articoli:res};
          //this.liste.push(this.curLista);
          console.log("bidimensionale:", this.liste);


    }));
    return this.liste;
  }

  loadCollection(nome: string) {
    return this.firestore.collection(nome).valueChanges();
  }

  add(articolo: Articolo, imgPath: string, path: string) {
    console.log('questo è il dato', articolo);
    if(imgPath!='')articolo.imgUrl = imgPath;
    this.firestore.collection(path).doc().set(articolo);
    //this.firestore.collection('articoli').doc().set(articolo);

  }
  getArt(path:string) {
    return this.firestore.collection(path).valueChanges({ idField: 'id' }) as Observable<Articolo[]>;
    /*console.log('questo è fatto...');

    collection.subscribe(res=>console.log('res',res));
    */
  }
  del(id: string, path: string) {
    this.firestore.collection(path).doc(id).delete();


  }
  get(id: string) {
    let path = `/articoli/${id}`;
    console.log('SErvice doc-path:', path);
    return this.firestore.doc(path).valueChanges();
    //return this.firestore.doc(`/categorie/${cat}/articoli/${id}`).valueChanges();
    //return this.firestore.doc('/categorie/0vIibM2ptDfN6Vip6v5j/articoli/ucYGfvdrI4EvT9iqZU1r').valueChanges();
  }
  upd(id: string, path: string, newArt: Articolo) {
    this.firestore.collection(path).doc(id).update(newArt);


  }
  edit(id: string, newArt: Articolo) {
    this.firestore.collection('articoli').doc(id).update(newArt);

  }
}

