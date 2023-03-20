import { Injectable } from '@angular/core';
import { Articolo } from '../model/articolo';

@Injectable({
  providedIn: 'root'
})
export class ArticoliService {
  static articoli:Articolo[]=[];
  static currentArticolo=0;
  constructor() {

  }

}
