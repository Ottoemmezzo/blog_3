import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { DettaglioArticoloComponent } from './components/dettaglio-articolo/dettaglio-articolo.component';
import { LandingComponent } from './components/landing/landing.component';
import { ListaArticoliComponent} from './components/lista-articoli/lista-articoli.component';
import { UpdArticoloComponent } from './components/upd-articolo/upd-articolo.component';

const routes: Routes = [{path:'', component:LandingComponent},
{path:'lista', component:ListaArticoliComponent},
{path:'add', component:AddComponent},
 {path:'articolo', component:DettaglioArticoloComponent},
 {path:'update', component:UpdArticoloComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
