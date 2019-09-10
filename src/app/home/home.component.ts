import { Component, OnInit } from '@angular/core';
import {MenuItem} from '../models/menuItem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public menuItems: MenuItem[];
  selectedMenuItem : MenuItem;

  constructor() { }

  ngOnInit() {

    this.menuItems = [
      { Name: "Item 1", Colour: 'Red', Description: "The is the content for menu item #1" },
      { Name: "Item 2", Colour: 'Pink', Description: "The is the content for menu item #2" },
      { Name: "Item 3", Colour: 'Yellow', Description: "The is the content for menu item #3" },
      { Name: "Item 4", Colour: 'DodgerBlue', Description: "The is the content for menu item #4" },
      { Name: "Item 5", Colour: 'purple', Description: "The is the content for menu item #5" },
      { Name: "Item 6", Colour: 'lime', Description: "The is the content for menu item #6" },
      { Name: "Item 7", Colour: 'brown', Description: "The is the content for menu item #7" },
      { Name: "Item 8", Colour: 'magenta', Description: "The is the content for menu item #8" },
    ];

    this.selectedMenuItem = this.menuItems[0];

  }

  public menuClick(item: MenuItem)
  {
    //debugger;
    this.selectedMenuItem = item;
  }

}
