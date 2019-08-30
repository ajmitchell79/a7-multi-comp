import { Component, OnInit, Input } from '@angular/core';
import {MenuItem} from '../../models/menuItem';

@Component({
  selector: 'app-contentitem',
  templateUrl: './contentitem.component.html',
  styleUrls: ['./contentitem.component.scss']
})
export class ContentitemComponent implements OnInit {

  @Input() item: MenuItem;

  constructor() { }

  ngOnInit() {
  }

}
