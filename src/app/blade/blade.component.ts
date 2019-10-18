import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'
import { debug } from 'util';

@Component({
  selector: 'app-blade',
  templateUrl: './blade.component.html',
  styleUrls: ['./blade.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('250ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('250ms ease-in', style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class BladeComponent implements OnInit {

  visible: boolean = false;
  
  constructor() { }

  

  ngOnInit() {
  }

  btnClick()
  {
    //debugger;
    this.visible = !this.visible;
  }

}
