import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Articolo } from 'src/app/model/articolo';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit{
  head1!:Articolo;
  head2:Articolo[]=[];
  head3:Articolo[]=[];

  constructor(private db:DbService){}
  ngOnInit(): void {
      this.db.getArt('pubblicati').subscribe(pubblicati=>{
        let i2=0,i3=0;
        for (let art of pubblicati)
        {
          console.log("articolo_main:",art);

          if(art.pos=='h1') this.head1=art;
          else if(art.pos=='h2'){this.head2[i2++]=art;console.log("landing,h2:",art);
          }
          else if(art.pos=='h3')this.head3[i3++]=art;
        }

      })
  }

}
