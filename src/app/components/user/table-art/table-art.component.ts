import { Component, Input, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Articolo } from 'src/app/model/articolo';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DbService } from 'src/app/services/db.service';
import { Router } from '@angular/router';


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
  @Input() dataInput: Articolo[]=[];
  dataSource:Articolo[] =[];
  columnsToDisplay = ['titolo', 'dataCreazione', 'categoria'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Articolo | null;
  autore:string='';
  fcolor='white';
  uname:string='';
  constructor(private afAuth:AngularFireAuth,
    private db:DbService,
    private router:Router){

  }
  ngOnInit(){
    console.log("Input:",this.dataInput);

    this.afAuth.authState.subscribe(u=>{
      this.uname=u?.uid as string;
      let newData:Articolo[]=[];
      let i=0;

      for(let data of this.dataInput)
      {
        if(this.uname==data.idAutore)
        {
          newData[i]=data;
          this.autore=data.autore;
          i++;


        }

      }
      this.dataSource=newData;
    })



  }
  pubblicaArticolo(art:Articolo){
    let flag:boolean=!art.pubblicato;
    this.db.upd(art.id,art.categoria,{...art,pubblicato:flag});

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

