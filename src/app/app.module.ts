import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SignupComponent } from './components/signup/signup.component';
import { AppRoutingModule } from './app.routes'; // Modifié: pas besoin d'importer 'routes' directement
import { AuthInterceptor } from './auth/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule, // Contient déjà la configuration des routes
    RouterModule.forRoot([]) // À supprimer car déjà inclus dans AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useValue: AuthInterceptor,
      multi: true
    }
  ],

})
export class AppModule { }