import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent /*implements OnInit*/ {

  constructor(private router: Router) { }

  /*ngOnInit(): void {
  }*/

  handleSearchRecipe(search: string): any {
    localStorage.setItem('Search', search);
    localStorage.setItem('searchfield', 'category');
    this.router.navigate(['/recipe/search']);
  }

}
