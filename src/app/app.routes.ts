import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { AccueilComponent } from './components/acuueil/accueil.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'accueil', component: AccueilComponent },
    { path: '**', redirectTo: '' } // Redirection pour les routes inconnues
];

@NgModule({
    imports: [RouterModule.forRoot(routes)], // Ajoute forRoot()
    exports: [RouterModule] // Exporte RouterModule
})
export class AppRoutingModule { }