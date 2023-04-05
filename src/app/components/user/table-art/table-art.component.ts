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
  columnsToDisplay = ['titolo', 'dataCreazione', 'categoria'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Articolo | null;
  autore:string='';
  fcolor='white';
  uname:string='';
  pos=new FormControl("");
  //pubblicati:Articolo[]=[];
  userArts:Articolo[]=[];
  admin:boolean=false;

  constructor(private afAuth:AngularFireAuth,
    private db:DbService,
    private router:Router,
    private elRef:ElementRef){

  }
  ngOnInit(){
    //this.pubblicati$.subscribe(p=>this.pubblicati==p);
    let i=0;
    //Stampa solo articoli utente corrente se copywriter, tutti se admin.
    if(this.uid=='PU4wnyTErROVLLCw66YvcnHorq22')
    {
      this.admin=true;
      this.userArts=this.bozze;
    }
    else for(let userArt of this.bozze)if(userArt.idAutore==this.uid) this.userArts[i++]=userArt;












  }
  pubblicaArticolo(art:Articolo){
    let stella = this.elRef.nativeElement.querySelector('mat-icon');

    if(art.pubblicato==false){
      stella.color='warn';

      console.log('sono dentro!:');

      art.pos=this.pos.value as string;
      art.pubblicato=true;
      console.log('sono dentro!:',art.pos);
      //this.db.upd(art.id,'articoli',art);
      this.db.add(art,art.imgUrl,'pubblicati')


    }
    else  {
      art.pubblicato=false;
      stella.color='accent';
      this.db.del(art.id,'pubblicati');
    }
    //art.pubblicato=!art.pubblicato;
    let i=0;
    for(let a of this.bozze ) {

      if(a.id==art.id) this.bozze[i]=art;
      i++;
    }
    this.db.upd(art.id,'articoli',art);


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

