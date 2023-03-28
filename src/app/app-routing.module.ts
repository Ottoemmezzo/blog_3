import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { AuthGuard } from './components/auth.guard';
import { DettaglioArticoloComponent } from './components/dettaglio-articolo/dettaglio-articolo.component';
import { LandingComponent } from './components/landing/landing.component';
import { ListaArticoliComponent} from './components/lista-articoli/lista-articoli.component';
import { LoginComponent } from './components/login/login.component';
import { UpdArticoloComponent } from './components/upd-articolo/upd-articolo.component';
import { UserComponent } from './components/user/user.component';


const routes: Routes = [{path:'', component:LandingComponent},
{path:'lista', component:ListaArticoliComponent},
{path:'add', component:AddComponent},
 {path:'articolo', component:DettaglioArticoloComponent},
 {path:'update', component:UpdArticoloComponent},
 {path:'user', component:UserComponent, canActivate:[AuthGuard]},
 {path:'login', component:LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
