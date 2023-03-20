import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { DettaglioArticoloComponent } from './components/dettaglio-articolo/dettaglio-articolo.component';
import { LandingComponent } from './components/landing/landing.component';
import { ListaArticoliComponent } from './components/lista-articoli/lista-articoli.component';

const routes: Routes = [{path:'', component:LandingComponent},
{path:'lista', component:ListaArticoliComponent},
{path:'add', component:AddComponent},
 {path:'articolo', component:DettaglioArticoloComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
