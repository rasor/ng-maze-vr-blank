import { BrowserModule } from '@angular/platform-browser';
// https://medium.com/@pitipon/a-frame-with-angular-setup-project-5797b2f2a03b
// https://stackoverflow.com/questions/42279323/use-untyped-a-frame-components-with-angular-2
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

// Require aframe in main bundle before an aframe component is loaded
//import 'aframe';
//import 'aframe-extras';
import { AframeVrComponent } from './components/aframe-vr/aframe-vr.component';

@NgModule({
  declarations: [
    AppComponent,
    AframeVrComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
