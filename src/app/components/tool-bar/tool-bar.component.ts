import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SezioneComponent } from '../sezione/sezione.component';
import { Articolo } from 'src/app/model/articolo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit
{
  @Output() catChosenEvent = new EventEmitter<string>();
  @Input() pubblicati$!:Observable<Articolo[]>;
  chosenCat='';
  ngOnInit(): void {

  }
  catSelected(cat:string){
    this.catChosenEvent.emit(cat);
    //this.chosenCat=cat;





  }
}
