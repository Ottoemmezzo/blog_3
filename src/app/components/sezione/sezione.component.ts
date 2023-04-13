import { Component, DoCheck, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, fromEvent } from 'rxjs';
import { Articolo } from 'src/app/model/articolo';
import { Categoria } from 'src/app/model/categoria';
import { ToolBarComponent } from '../tool-bar/tool-bar.component';

@Component({
  selector: 'app-sezione',
  templateUrl: './sezione.component.html',
  styleUrls: ['./sezione.component.scss']
})
export class SezioneComponent implements OnInit, DoCheck{
  @Input() l:string='1000px';
  @Input() h:string='400px';
  head1:Articolo[]=[];
  head2:Articolo[]=[];
  @Input() size='L';
 //@Input() cat:string='Politica';
  //@Input() source$!:Observable<Articolo[]>;
  sourceArray:Articolo[]=[];
  @Input() source!:Articolo[];
  //@Input() chosenCat='Politica';
  @Input() chosenCat!:Observable<string>;
 head!:HTMLElement;
  index=0;
  curPage=1;
  totalPage=1;
  pagina:Articolo[]=[];
  categoria:string='';
  //chosenCat='Politica';
  constructor(private elRef:ElementRef, public router:Router){}
  ngOnInit(): void {
    let container = this.elRef.nativeElement.querySelector('#container');
    console.log("html cont:",container);
    this.head = this.elRef.nativeElement.querySelector('#headline');
    console.log("html head:",this.head);
    let mosaico = this.elRef.nativeElement.querySelector('#mosaico');
    console.log("html mos:",mosaico);
    console.log("card:",this.head2);
    let img=this.elRef.nativeElement.querySelector('#h1Img');
    console.log("img:",img);
    console.log("Source:",this.source);

    this.head1=this.source?.filter(c=> c.pos=='h1') as Articolo[];
          console.log("H1:",this.head1);
          this.head2=this.source?.filter(c=> c.pos=='h2') as Articolo[];
          console.log("H2:",this.head2);

   //console.log("Articoli:",this.sourceArray);

    //fromEvent(ToolBarComponent, 'click').subscribe(() => console.log('Clicked!'));
    //this.source$.subscribe(a=>this.sourceArray=a);
   //console.log("$$$cat:",this.chosenCat);

   /* this.chosenCat.subscribe({
        next:(cat) =>{
          console.log("categoria sottoscritta dentro sezione:",cat);
          this.head1=this.sourceArray?.filter(c=> c.categoria==cat.charAt(0) && c.pos=='h1') as Articolo[];
          console.log("H1:",this.head1);
          this.head2=this.sourceArray?.filter(c=> c.categoria==cat.charAt(0) && c.pos=='h2') as Articolo[];
          console.log("H2:",this.head2);
        }
      });*/
/*
        this.head1=this.sourceArray?.filter(c=> c.categoria==cat.charAt(0) && c.pos=='h1') as Articolo[];
        //this.head1=h1[0];
        console.log("H1:",this.head1);
        this.head2=this.sourceArray?.filter(c=> c.categoria==cat.charAt(0) && c.pos=='h2') as Articolo[];
       console.log("H2:",this.head2);
       //window.location.reload();
       //let h1=this.elRef.nativeElement.querySelector('#headline');
       console.log('H1:',this.head);

      }*/


      //)
    /*this.source.subscribe(

      source=>{this.pagina=source;

        this.head1=source.filter(c=> c.categoria==this.chosenCat && c.pos=='h1') as Articolo[];
        //this.head1=h1[0];
        console.log("H1:",this.head1);
        this.head2=source.filter(c=> c.categoria==this.chosenCat && c.pos=='h2') as Articolo[];
       console.log("H2:",this.head2);
       //window.location.reload();
       //let h1=this.elRef.nativeElement.querySelector('#headline');
       console.log('H1:',this.head);

       this.head.style.display="true";

      }
    )*/

  //img.attributes.ngReflectImgPath=this.head1.imgUrl;
    ///img.data.imgPath=this.head1.imgUrl;
   // img.imgPath=this.head1.imgUrl;
    //console.log("img.imgPath=",img.attributes.NamedNodeMap['2']);
    let modulo=this.head2.length/4;
    console.log("modulo",this.head2.length);

    this.totalPage=Math.ceil(modulo);
    this.loadPage();
    //this.loadChosenCat('Politica');

    //modulo==0?this.totalPage=1:this.totalPage=Math.ound(this.head2.length/3);

    //let body1 = this.elRef.nativeElement.querySelector('#body1');




    switch(this.size){
      case 'L':
        container.style.width='1200px';
        container.style.height='955px';
        this.head.style.width='1000px';
        this.head.style.height='400px';
       // head.style.backgroundImage="url('../../assets/img/graffe_rosso_bianche.png')";
        this.head.style.backgroundRepeat='no-repeat';
        this.head.style.backgroundSize='cover';
        mosaico.style.width="100%";
        mosaico.style.height="500px";
        //mosaico.style.backgroundImage="url('../../assets/img/graffe_mosaico.png')";
        mosaico.style.backgroundRepeat='no-repeat';
        mosaico.style.backgoundSize='cover';

        break;
      case 'M':
        break;
      case 'S':
        break;


    }
  }
  ngDoCheck(){
    /*this.totalPage=Math.ceil(this.head2.length/3);
    let p=this.totalPage*(this.curPage-1);
    if(p+3<=this.head2.length)this.pagina=this.head2.slice(p,p+3);
    else this.pagina=this.head2.slice(p,this.head2.length);*/
    //this.loadPage();



  }
  loadPage(){
    this.totalPage=Math.ceil((this.head2.length+1)/4);
    let p=this.index;
    if(p<=this.head2.length)this.pagina=this.head2.slice(p,p+4);
    else this.pagina=this.head2.slice(p,this.head2.length);

  }
  pageUp(){
    if(this.index<=this.head2.length-3){this.index+=3;this.curPage++;}
    console.log("pagina",this.curPage);

    this.loadPage();
  }
  pageDown(){
    if(this.index>=3){this.index-=3;this.curPage--}
    this.loadPage();

  }


}
