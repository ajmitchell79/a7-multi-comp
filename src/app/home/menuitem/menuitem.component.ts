import { Component, OnInit, Input } from '@angular/core';
import {MenuItem} from '../../models/menuItem';

@Component({
  selector: 'app-menuitem',
  templateUrl: './menuitem.component.html',
  styleUrls: ['./menuitem.component.scss']
})
export class MenuitemComponent implements OnInit {

  @Input() item: MenuItem;

  constructor() { }

  ngOnInit() {
  }

}
