import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Articolo } from 'src/app/model/articolo';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-laz',
  templateUrl: './laz-table.component.html',
  styleUrls: ['./laz-table.component.scss']
})
export class LazTableComponent implements OnInit{
@Input() source:Articolo[]=[];
pubblicati:Articolo[]=[];
@Input() uid:string='';
visibilita=new FormControl("");

userArt:Articolo[]=[];
 constructor(private router:Router,private afs:AngularFirestore, auth:AngularFireAuth,private db:DbService){

 }
 ngOnInit(): void {
  if(this.uid=='admin') this.userArt=this.source;
  else this.source.filter(u=>this.uid==u.idAutore);
  this.db.getArt('pubblicati').subscribe(p=> this.pubblicati=p);

 }
 delArticolo(item:Articolo, i :number)
 {
   //this.source.filter(u=>u.id==item.id);
   this.source.splice(i, 1);
   this.db.del(item.id,'articoli');
   this.ngOnInit();
 }
 pubblica(item:Articolo, i:number){
  this.source.splice(i,1);
  this.db.del(item.id,'articoli');
  item.pos=this.visibilita.value as string;
  this.pubblicati.push(item);
  this.db.add(item,item.imgUrl,'pubblicati');
  this.ngOnInit();
 }
 delPubbArticolo(item:Articolo, i:number)
 {
   this.pubblicati.splice(i, 1);
   this.db.del(item.id,'pubblicati');
   this.ngOnInit();
 }
 ritira(item:Articolo, i :number){
  this.pubblicati.splice(i, 1);
  this.db.del(item.id,'pubblicati');
  this.source.push(item);
  this.db.add(item,item.imgUrl,'articoli');
  this.ngOnInit();

 }
 edit(item:Articolo){
  console.log("edit--id:",item.id);

  this.router.navigateByUrl(`/update?id=${item.id}&cat=${item.categoria}`);

 }
}
