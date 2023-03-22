import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/compat/firestore';
import { DocumentSnapshot } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Articolo } from 'src/app/model/articolo';
import { DbService } from 'src/app/services/db.service';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-dettaglio-articolo',
  templateUrl: './dettaglio-articolo.component.html',
  styleUrls: ['./dettaglio-articolo.component.scss']
})
export class DettaglioArticoloComponent implements OnInit{
  id!:string;
  doc!:Articolo;
  tiles: Tile[] = [
    {text: 'One', cols: 1, rows: 8, color: 'gray'},
    {text: 'main', cols: 6, rows: 8, color: 'white'},
    {text: 'Three', cols: 1, rows: 8, color: 'gray'}
    //{text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  constructor(
    private route: ActivatedRoute,
    private db:DbService
  ) {}
  ngOnInit() {
      this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.db.getArt().subscribe(res=>{
        res.forEach(data=>{
          if(data.id==this.id)this.doc=data;


        });

      });


       /*this.doc=this.db.getArt(this.id);
       this.doc.subscribe(res=>{
        console.log(res)
        console.log('reference',res.ref);


      });
*/


    });

  }

}
