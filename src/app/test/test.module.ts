import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TestRouterModule, testRoutingComponents } from './test-router.module';

@NgModule({
  declarations: [testRoutingComponents],
  imports: [
    CommonModule,
    TestRouterModule,
    HttpClientModule
  ]
})
export class TestModule { }
