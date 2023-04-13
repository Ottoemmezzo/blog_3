import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Articolo } from 'src/app/model/articolo';
import { Categoria } from 'src/app/model/categoria';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit{
  head1!:Articolo;
  h1:Articolo[]=[];
  head2:Articolo[]=[];
  head3:Articolo[]=[];
  categorie:Categoria[]=[];
  //chosenCat:string='Politica';
  pubblicati$!:Observable<Articolo[]>;
  pubblicati!:Articolo[];
  chosenCat!:Observable<string>;

  constructor(private db:DbService){}
  ngOnInit(): void {
    /*this.db.getArt('pubblicati').subscribe(pubblicati=>{
      console.log("categoria scelta:",this.chosenCat);
      this.pubblicati=pubblicati.filter(c=> c.categoria==this.chosenCat);
      this.h1=this.pubblicati.filter(c=> c.pos=='h1');
      this.head1=this.h1[0];
      console.log("head1:",this.head1);

      this.head2=this.pubblicati.filter(c=> c.pos=='h2');


  });*/
  this.pubblicati$=this.db.getArt('pubblicati');//.subscribe(p=> this.pubblicati=p);
  console.log("categoria_main:",this.chosenCat);










     // let i2=0,i3=0;

      /*for (let art of pubblicati)
      {
        console.log("articolo_main:",art);

        if(art.pos=='h1'&& art.categoria==this.chosenCat) this.head1=art;
        else if(art.pos=='h2' && art.categoria==this.chosenCat){this.head2[i2++]=art;console.log("landing,h2:",art);
        }
        else if(art.pos=='h3' && art.categoria==this.chosenCat)this.head3[i3++]=art;
      }*/

    //})
    /*this.db.loadCategorie().subscribe(c=>this.categorie=c);
    this.db.getArt('pubblicati').subscribe(pubblicati=>{
        let i2=0,i3=0;
        for (let art of pubblicati)
        {
          console.log("articolo_main:",art);

          if(art.pos=='h1'&& art.categoria==this.chosenCat) this.head1=art;
          else if(art.pos=='h2' && art.categoria==this.chosenCat){this.head2[i2++]=art;console.log("landing,h2:",art);
          }
          else if(art.pos=='h3' && art.categoria==this.chosenCat)this.head3[i3++]=art;
        }

      })*/
  }
  loadChosenCat(cat:string){
    console.log("categoria scelta:",cat);

    this.chosenCat= from(cat);
    /*
    this.ngOnInit();
    this.h1=this.pubblicati.filter(c=>c.categoria==cat && c.pos=='h1');
    this.head1=this.h1[0];
    this.head2=this.pubblicati.filter(c=>c.categoria==cat && c.pos=='h2');
    return cat;*/
    //this.chosenCat=cat;
    /*this.db.getArt('pubblicati').subscribe(pubblicati=>{
      console.log("categoria scelta:",this.chosenCat);
      this.pubblicati=pubblicati.filter(c=> c.categoria==cat);
      this.h1=this.pubblicati.filter(c=> c.pos=='h1');
      this.head1=this.h1[0];
      console.log("head1:",this.head1);

      this.head2=this.pubblicati.filter(c=> c.pos=='h2');

  });


    /*this.pubblicati$=this.db.getArt('pubblicati').subscribe(pubblicati=>{
      let i2=0,i3=0;
      for (let art of pubblicati)
      {
        console.log("articolo_main:",art);

        if(art.pos=='h1'&& art.categoria==this.chosenCat) this.head1=art;
        else if(art.pos=='h2' && art.categoria==this.chosenCat){this.head2[i2++]=art;console.log("landing,h2:",art);
        }
        else if(art.pos=='h3' && art.categoria==this.chosenCat)this.head3[i3++]=art;
      }

    })*/

}
  }


