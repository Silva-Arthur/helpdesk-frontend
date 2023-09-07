import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { LoginComponent } from './components/login/login.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: '', // path de acesso
    component: NavComponent, // componente de acesso
    canActivate: [AuthGuard], //guardião das rotas, para verificar se o token é válido ou não
    children: [ // rotas filhas
      {path: 'home', component: HomeComponent},

      {path: 'tecnicos', component: TecnicoListComponent},
      {path: 'tecnicos/create', component: TecnicoCreateComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
