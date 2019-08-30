import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../shared/guards/auth.guard';

import { ErrorComponent } from '../shared/error/error.component';
import { HomeComponent } from '../home/home.component';
// import { MenuitemComponent } from '../home/menuitem/menuitem.component';
// import { ContentitemComponent } from '../home/contentitem/contentitem.component';

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
// {
//   path: 'design1', component: Design1Component, canActivate: [AuthGuard],
//   data: {
//     page: 'design1',
//     redirectPath: 'design1'
//   }
// },
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


export const routingComponents = [HomeComponent, ErrorComponent];

