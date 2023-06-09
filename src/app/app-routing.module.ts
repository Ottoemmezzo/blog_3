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
import { AngularFireAuthGuard, loggedIn, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/compat/auth-guard';
import { AppComponent } from './app.component';
import { PoliticaComponent } from './components/politica/politica.component';
import { StoriaComponent } from './components/storia/storia.component';
import { FilosofiaComponent } from './components/filosofia/filosofia.component';
import { AttualitaComponent } from './components/attualita/attualita.component';

const belongsToAccount = (next:any) => hasCustomClaim(`uid:${next.params.id}`);

const routes: Routes = [{path:'', component: LandingComponent},
{path:'lista', component:ListaArticoliComponent},
{path:'add', component:AddComponent, canActivate:[AngularFireAuthGuard]},
 {path:'articolo', component:DettaglioArticoloComponent},
 {path:'politica', component:PoliticaComponent},
 {path:'storia', component:StoriaComponent},
 {path:'filosofia', component:FilosofiaComponent},
 {path:'attualita', component:AttualitaComponent},
 {path:'update', component:UpdArticoloComponent},
 //{path:'user/:id', component:UserComponent, canActivate:[AngularFireAuthGuard], data:{authGuardPipe:belongsToAccount}},
 {path:'user/:id', component:UserComponent, canActivate:[AngularFireAuthGuard]},
 {path:'login', component:LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
