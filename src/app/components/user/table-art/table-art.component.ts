import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Articolo } from 'src/app/model/articolo';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DbService } from 'src/app/services/db.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-table-art',
  templateUrl: './table-art.component.html',
  styleUrls: ['./table-art.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableArtComponent implements OnInit{
  @Input() uid:string='';
  @Input() bozze:Articolo[]=[];
  @Input() pubblicati:Articolo[]=[];
 // @ViewChild('stella') stella:any;


  expandedElement!: Articolo | null;
  autore:string='';
  fcolor='white';
  uname:string='';
  pos='p';//=new FormControl("");
  //pubblicati:Articolo[]=[];
  userArts:Articolo[]=[];
  userPubb:Articolo[]=[];
  admin:boolean=false;
  displayedColumns: string[] = ['titolo', 'dataCreazione', 'autore','azioni'];
  columnsToDisplay: string[] = this.displayedColumns.slice();


  constructor(private afAuth:AngularFireAuth,
    private db:DbService,
    private router:Router,
    private elRef:ElementRef){

  }
  ngOnInit(){
    //this.pubblicati$.subscribe(p=>this.pubblicati==p);

    //Stampa solo articoli utente corrente se copywriter, tutti se admin.
    if(this.uid=='PU4wnyTErROVLLCw66YvcnHorq22')
    {
      this.admin=true;
      this.userArts=this.bozze;
      this.userPubb=this.pubblicati;
    }
    else {
      let i=0;
      for(let userArt of this.bozze)if(userArt.idAutore==this.uid) this.userArts[i++]=userArt;
      i=0;
      for(let userPubb of this.pubblicati)if(userPubb.idAutore==this.uid) this.userPubb[i++]=userPubb;
    }












  }
  pubblicaArticolo(art:Articolo){
    art.pos=this.pos;
    console.log('sono dentro!:',art.pos);
    this.db.add(art,art.imgUrl,'pubblicati');
    this.db.del(art.id,'articoli');
    let i=0;
    for(let a of this.bozze ) {

      if(a.id!=art.id) this.userArts.splice(i);
      i++;
    }


  }
  ritiraArticolo(art:Articolo)
  {
    this.db.del(art.id,'pubblicati');
    this.db.add(art,art.imgUrl,'articoli');
    let i=0;
    for(let a of this.userPubb) {

      if(a.id!=art.id) this.userPubb.splice(i);
      i++;
    }
  }
  deleteArticolo(id:string,cat:string){


    this.db.del(id,cat);
  }
  updateArticolo(id:string,cat:string){


    this.router.navigateByUrl(`/update?id=${id}&cat=${cat}&aut${this.autore}`);


  }
  mostraArticolo(id:string){
    this.router.navigateByUrl(`/articolo?id=${id}`);
  }
}

