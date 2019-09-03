import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuitemComponent } from './menuitem.component';
import {MenuItem} from '../../models/menuItem';

describe('MenuitemComponent', () => {
  let component: MenuitemComponent;
  let fixture: ComponentFixture<MenuitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuitemComponent);
    component = fixture.componentInstance;

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
