
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManagerComponent } from './manager/manager.component';
import { BreadcrumbModule } from 'primeng-lts/breadcrumb';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng-lts/card';
import { FileUploadModule } from 'primeng-lts/fileupload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng-lts/dropdown';
import { FormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng-lts/inputtext'
import {InputSwitchModule} from 'primeng-lts/inputswitch';
import {ButtonModule} from 'primeng-lts/button';
import { BackendApiService } from './services/backend-api.service';
import { WebSocketAPIService } from './services/web-socket-api.service';
import {ProgressBarModule} from 'primeng-lts/progressbar';
import { NgxJsonViewerModule } from 'ngx-json-viewer';


@NgModule({
  declarations: [
    AppComponent,
    ManagerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     // add keycloakAngular module
    HttpClientModule,
    BreadcrumbModule,
    ReactiveFormsModule,
    CardModule,
    FileUploadModule, 
    BrowserAnimationsModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    InputSwitchModule,
    ButtonModule,
    ProgressBarModule,
    NgxJsonViewerModule

  ],
  providers: [
    // add this provider
    
    BackendApiService,
    WebSocketAPIService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }