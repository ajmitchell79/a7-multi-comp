import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestCompComponent } from './test-comp/test-comp.component';

const testRoutes: Routes = [
    {  
      path: '',
      component: TestCompComponent
    }
  ];

  @NgModule({
    imports: [
      RouterModule.forChild(testRoutes)
    ],
    exports:[RouterModule]
  })
  export class TestRouterModule { }
  
  export const testRoutingComponents = [TestCompComponent];