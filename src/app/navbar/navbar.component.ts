import {Component, OnInit} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {Router} from '@angular/router';
import {UserLogoutService} from './service/user-logout.service';
import {FormControl, Validators, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  logoutSuccess = false;
  status: Number;

  search = new FormControl('');

  constructor(private userLogoutService: UserLogoutService, private router: Router) {
  }

  clickNewRecipe() {
    sessionStorage.setItem('RecipeID', '0');
    this.router.navigate(['/recipe']);
  }

  clickSearch() {
    this.handleSearchRecipe(this.search.value, 'freeSearch');
  }

  handleSearchRecipe(search: string, searchfield: string) {
    localStorage.setItem('Search', search);
    localStorage.setItem('Searchfield', searchfield);
    if (this.router.url === '/recipe/search') {
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
      });
    } else {
      this.router.navigate(['/recipe/search']);
    }
    console.log(this.router.url);
    // this.router.navigate(['/recipe/search']);
  }

  handleLogout() {
    this.userLogoutService.logoutUser(JSON.parse(localStorage.getItem('UserID'))).subscribe((result) => {
      console.log(JSON.parse(localStorage.getItem('UserID')));
      localStorage.removeItem('UserID');
      this.logoutSuccess = true;
      this.status = +result;
      this.router.navigate(['/login']);
    });
  }
}
