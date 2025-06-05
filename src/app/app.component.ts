import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  imports: [ RouterModule,FormsModule,ReactiveFormsModule, GoogleMapsModule, NgbModule],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'OGLClient';
   public isCollapsed = true;
  constructor(
    // private routerLink: RouterLink
  ) { }
}
