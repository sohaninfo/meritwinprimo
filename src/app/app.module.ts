import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {PanelModule} from 'primeng/panel';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HelloWorldDirective } from './directives/hello-world.directive';
import { MsgComponent } from './components/msg/msg.component';
import { PanelComponent } from './components/panel/panel.component';
import { PathComponent } from './components/d3viz/path/path.component';
import { TpeComponent } from './components/d3viz/tpe/tpe.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HelloWorldDirective,
        MsgComponent,
        PanelComponent,
        PathComponent,
        TpeComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        TableModule,
        HttpClientModule,
        InputTextModule,
        DialogModule,
        ButtonModule,
        AppRoutingModule,
        PanelModule,
        MenubarModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
