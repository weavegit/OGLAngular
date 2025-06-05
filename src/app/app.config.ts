import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [ importProvidersFrom(HttpClientModule), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
