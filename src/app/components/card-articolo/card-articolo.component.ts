import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Articolo } from 'src/app/model/articolo';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-card-articolo',
  templateUrl: './card-articolo.component.html',
  styleUrls: ['./card-articolo.component.scss']
})
export class CardArticoloComponent {
  @Input() data!:Articolo;
  @Input() cat!:string;
  constructor(private db:DbService,private router:Router ){}
  deleteArticolo(){
    console.log("Deleting...:",this.data.id,this.cat);

    this.db.del(this.data.id,this.cat);
  }
  updateArticolo(){
    console.log("Deleting...:",this.data.id,this.cat);

    this.router.navigateByUrl(`/update?id=${this.data.id}&cat=${this.cat}`);


  }
  mostraArticolo(){
    this.router.navigateByUrl(`/articolo?id=${this.data.id}`);
  }
}