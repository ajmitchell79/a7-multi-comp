import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards/auth.guard';

import { ErrorComponent } from '../shared/error/error.component';
import { HomeComponent } from '../home/home.component';
import { GridComponent } from '../grid/grid.component';

const routes: Routes = [{
  path: '', redirectTo: 'home', pathMatch: 'full'
},
{
  path: 'home', component: HomeComponent, canActivate: [AuthGuard],
  data: {
    page: 'home',
    redirectPath: 'home'
  }
},
{
  path: 'grid', component: GridComponent, canActivate: [AuthGuard],
  data: {
    page: 'grid',
    redirectPath: 'grid'
  }
},
{
  //lazy load...
  path: 'testmodule', 
 loadChildren: () => import('../test/test.module').then(m => m.TestModule)
},
{
  path: 'error', component: ErrorComponent
},
{
  path: '**', component: ErrorComponent, data: { error: 404 }
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }


export const routingComponents = [HomeComponent,GridComponent, ErrorComponent];

