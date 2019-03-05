import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }      from './home/home.component';
import { PanelComponent } from './components/panel/panel.component';
import { PathComponent } from './components/d3viz/path/path.component';
import { TpeComponent } from './components/d3viz/tpe/tpe.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'panel', component: PanelComponent },
  { path: 'd3viz/path', component: PathComponent },
  { path: 'd3viz/tpe', component: TpeComponent },
];


@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
