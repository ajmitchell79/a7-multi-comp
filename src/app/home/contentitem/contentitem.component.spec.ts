import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentitemComponent } from './contentitem.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
