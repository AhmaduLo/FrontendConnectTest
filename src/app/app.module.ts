import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SignupComponent } from './components/signup/signup.component';
import { AppRoutingModule, routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({

    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        AppRoutingModule
    ],
    // providers: [
    //     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    //   ],

})
export class AppModule { }