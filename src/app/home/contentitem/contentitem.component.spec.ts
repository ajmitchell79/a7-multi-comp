import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentitemComponent } from './contentitem.component';
import {MenuItem} from '../../models/menuItem';

describe('ContentitemComponent', () => {
  let component: ContentitemComponent;
  let fixture: ComponentFixture<ContentitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentitemComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();

    let item = new MenuItem();
    item.Colour = "red";
    item.Name = "item 1";
    item.Description = "desc 1";

    component.item = item;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
