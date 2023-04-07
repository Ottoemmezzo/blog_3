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
  doc$!:Observable<Articolo>;

  constructor(
    private route: ActivatedRoute,
    private db:DbService
  ) {}
  ngOnInit() {
      this.route.queryParams.subscribe(params => {
      this.id = params['id'];
     /* this.db.get(this.id).subscribe(res=>{
        res.forEach(data=>{
          if(data.id==this.id)this.doc=data;


        });*/
        console.log("ID:",this.id);
        this.doc$=this.db.get(this.id,'articoli') as Observable<Articolo>//.subscribe(a=>this.doc=a as Articolo);
        this.doc$.subscribe(a=>console.log("arti:",a));


      });


       /*this.doc=this.db.getArt(this.id);
       this.doc.subscribe(res=>{
        console.log(res)
        console.log('reference',res.ref);


      });
*/


   // });

  }

}
