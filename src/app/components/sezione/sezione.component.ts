import { Component, DoCheck, ElementRef, Input, OnInit } from '@angular/core';
import { Articolo } from 'src/app/model/articolo';

@Component({
  selector: 'app-sezione',
  templateUrl: './sezione.component.html',
  styleUrls: ['./sezione.component.scss']
})
export class SezioneComponent implements OnInit, DoCheck{
  @Input() l:string='1000px';
  @Input() h:string='400px';
  @Input() head1!:Articolo;
  @Input() head2:Articolo[]=[];
  @Input() size='L';

  curPage=1;
  totalPage=1;
  pagina:Articolo[]=[];
  constructor(private elRef:ElementRef){}
  ngOnInit(): void {
    let container = this.elRef.nativeElement.querySelector('#container');
    console.log("html cont:",container);
    let head = this.elRef.nativeElement.querySelector('#headline');
    console.log("html head:",head);
    let mosaico = this.elRef.nativeElement.querySelector('#mosaico');
    console.log("html mos:",mosaico);
    console.log("card:",this.head2);

    let modulo=this.head2.length/3;
    console.log("modulo",this.head2.length);

    this.totalPage=Math.ceil(modulo);
    this.loadPage();

    //modulo==0?this.totalPage=1:this.totalPage=Math.ound(this.head2.length/3);

    //let body1 = this.elRef.nativeElement.querySelector('#body1');




    switch(this.size){
      case 'L':
        container.style.width='1250px';
        container.style.height='1000px';
        head.style.width='1000px';
        head.style.height='400px';
        head.style.backgroundImage="url('../../assets/img/graffe_rosso_bianche.png')";
        head.style.backgroundRepeat='no-repeat';
        head.style.backgoundSize='cover';
        mosaico.style.width="1250px";
        mosaico.style.height="570px";
        mosaico.style.backgroundImage="url('../../assets/img/graffe_mosaico.png')";
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
    this.loadPage();

  }
  loadPage(){
    this.totalPage=Math.ceil(this.head2.length/3);
    let p=this.curPage;
    if(p+2<=this.head2.length)this.pagina=this.head2.slice(p-1,p+2);
    else this.pagina=this.head2.slice(p-1,this.head2.length);

  }
  pageUp(){
    if(this.curPage<=this.head2.length-3)this.curPage+=3;
    console.log("pagina",this.curPage);

    this.loadPage();
  }
  pageDown(){
    if(this.curPage>=2)this.curPage-=3;
    this.loadPage();

  }

}
