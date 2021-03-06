import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Recipe} from '../classes/recipe';
import {Router} from '@angular/router';
import {RecipeDetailService} from './service/recipe-detail.service';


@Component({
  selector: 'app-recipe-detail-page',
  templateUrl: './recipe-detail-page.component.html',
  styleUrls: ['./recipe-detail-page.component.scss']
})

export class RecipeDetailPageComponent implements OnInit {

  edit = false;
  color = 'primary';
  high = 5;
  highview = 5;
  highedit = 8;

  response: number;

  recipe_old = new Recipe();
  recipe_new = new Recipe();

  recipe_id: number;
  recipeId: Number;
  user_Id: string;

  title: FormControl;
  author: FormControl;
  duration: FormControl;
  calory: FormControl;
  difficulty: FormControl;
  link: FormControl;
  other: FormControl;

  cookie = 'https://raw.githubusercontent.com/MyCookieBook/CookieBookFE/master/src/pictures/Logo.jpg';

  constructor(private recipeDetailService: RecipeDetailService, private router: Router) {
  }

  ngOnInit(): void {

    var userId = localStorage.getItem('UserID');
    if (userId === null) {
      this.router.navigate(['/login']);
    }

    this.user_Id = localStorage.getItem('UserID');
    this.recipe_id = +sessionStorage.getItem('RecipeID');
    if (this.recipe_id === 0) {
      this.createEmptyRecipe();
      this.color = 'basic';
      this.high = this.highedit;
      this.edit = true;
    } else {
      this.recipe_old.setRecipe(sessionStorage.getItem('Recipe'));
      this.highview += this.recipe_old.getIngredient().length - 1;
      this.highview += this.recipe_old.getMaterial().length - 1;
      this.highview += this.recipe_old.getStep().length - 1;
      this.highedit += this.recipe_old.getIngredient().length - 1;
      this.highedit += this.recipe_old.getMaterial().length - 1;
      this.highedit += this.recipe_old.getStep().length - 1;
      this.high = this.highview;
    }
    this.init();
  }

  init() {
    this.recipe_new.copy(this.recipe_old);
    this.setFormControl();
  }

  // ngOnDestroy() {
  //   sessionStorage.removeItem('RecipeID');
  //   sessionStorage.removeItem('Recipe');
  // }

  createEmptyRecipe() {
    this.recipeId = 0;
    this.recipe_old.setId(0);
    this.recipe_old.setCategoryFE('Other');
    this.recipe_old.setTitle('');
    this.recipe_old.setAuthor('');
    this.recipe_old.setBookmark(false);
    this.recipe_old.setDuration(0);
    this.recipe_old.setCalory('');
    this.recipe_old.setDifficulty(1);
    this.recipe_old.setIngredient(['']);
    this.recipe_old.setMaterial(['']);
    this.recipe_old.setStep(['']);
    // this.recipe_old.picture = "https://raw.githubusercontent.com/MyCookieBook/CookieBookFE/master/src/pictures/DefaultRecipePicture.jpg";
    this.recipe_old.setLink('');
    this.recipe_old.setOther('');
  }

  setCategory(category: string) {
    this.recipe_new.setCategoryFE(category);
  }

  inputTitle(event) {
    const title = event.target.value;
    this.recipe_new.setTitle(title);
    this.checkInvalid();
  }

  getErrorMessageTitle() {
    this.color = 'basic';
    if (this.title.hasError('required')) {
      return 'Please enter a title for your recipe!';
    } else if (this.title.hasError('maxlength')) {
      return 'Your title is too long. (Max length 255)';
    } else {
      return '';
    }
  }

  inputAuthor(event) {
    const author = event.target.value;
    this.recipe_new.setAuthor(author);
    this.checkInvalid();
  }

  getErrorMessageAuthor() {
    this.color = 'basic';
    if (this.author.hasError('required')) {
      return 'Please enter a author for your recipe!';
    } else if (this.title.hasError('maxlength')) {
      return 'Your authorname is too long. (Max length 255)';
    } else {
      return '';
    }
  }


  inputDuration(event) {
    const duration = event.target.value;
    this.recipe_new.setDuration(duration);
    this.checkInvalid();
  }

  getErrorMessageDuration() {
    this.color = 'basic';
    if (this.duration.hasError('maxlength')) {
      return 'Your duration is too long. Max 11 signs.';
    } else {
      return '';
    }
  }

  inputCalory(event) {
    const calory = event.target.value;
    this.recipe_new.setCalory(calory);
    this.checkInvalid();
  }

  getErrorMessageCalory() {
    this.color = 'basic';
    if (this.calory.hasError('maxlength')) {
      return 'Your nutritional values are too long. Max 255 signs.';
    } else {
      return '';
    }
  }

  inputIngredient(event, ind: number) {
    const ingredient = event.target.value;
    this.recipe_new.addIngredient(ingredient, ind);
    console.log('Ingredient index: ' + ind);
    this.checkInvalid();
  }

  addIngredient() {
    this.recipe_new.addIngredient('', -1);
    this.highedit++;
    this.highview++;
    this.high = this.highedit;
    console.log(' add ingredient');
  }

  deleteIngredient(index: number) {
    this.recipe_new.deleteIngredient(index);
    if (this.recipe_new.getIngredient.length > 1) {
      this.highedit--;
      this.highview--;
      this.high = this.highedit;
    }
  }

  inputMaterial(event, ind: number) {
    const material = event.target.value;
    this.recipe_new.addMaterial(material, ind);
    console.log('Material index: ' + ind);
    this.checkInvalid();
  }

  addMaterial() {
    this.recipe_new.addMaterial('', -1);
    this.highedit++;
    this.highview++;
    this.high = this.highedit;
    console.log('add material');
  }

  deleteMaterial(index: number) {
    this.recipe_new.deleteMaterial(index);
    if (this.recipe_new.getMaterial().length > 1) {
      this.highedit--;
      this.highview--;
      this.high = this.highedit;
    }
  }

  inputStep(event, ind: number) {
    const step = event.target.value;
    this.recipe_new.addStep(step, ind);
    console.log('Step index: '+ ind);
    this.checkInvalid();
  }

  addStep() {
    this.recipe_new.addStep('', -1);
    this.highedit++;
    this.highview++;
    this.high = this.highedit;
    console.log('add step');
  }

  deleteStep(index: number) {
    this.recipe_new.deleteStep(index);
    if (this.recipe_new.getStep().length > 1) {
      this.highedit--;
      this.highview--;
      this.high = this.highedit;
    }
  }

  inputLink(event) {
    const link = event.target.value;
    this.recipe_new.setLink(link);
    this.checkInvalid();
  }

  getErrorMessageLink() {
    this.color = 'basic';
    if (this.link.hasError('maxlength')) {
      return 'Your link is too long. Max 255 signs.';
    } else {
      return '';
    }
  }

  inputOther(event) {
    const other = event.target.value;
    this.recipe_new.setOther(other);
    this.checkInvalid();
  }

  getErrorMessageOther() {
    this.color = 'basic';
    if (this.other.hasError('maxlength')) {
      return 'Your information is too long. Max 255 signs.';
    } else {
      return '';
    }
  }

  setDifficulty(value: number) {
    this.recipe_new.setDifficulty(value);
    this.checkInvalid();
  }

  getDifficulty() {
    return new Array(this.recipe_old.getDifficulty());
  }

  clickSave() {
    if (this.color === 'primary') {
      this.handleAddRecipe();
    }
  }

  clickCancel() {
    if (this.recipe_id === 0) {
      this.router.navigate(['/']);
    } else {
      this.edit = false;
      this.high = this.highview;
      this.recipe_new.copy(this.recipe_old);
    }
  }

  clickBake() {
    localStorage.setItem('Steps', JSON.stringify(this.recipe_old.getStep()));
    this.router.navigate(['/bake_recipe']);
  }

  clickEdit() {
    this.edit = true;
    this.high = this.highedit;
    this.recipeId = this.response;
    this.recipe_old.setId(this.response);
    this.recipe_new.setId(this.recipe_old.getId());
    this.setFormControl();
  }

  clickDelete() {
    this.recipeId = this.response;
    this.handleDeleteRecipe();
  }

  checkInvalid() {
    if (!this.title.invalid &&
      !this.author.invalid &&
      !this.duration.invalid &&
      !this.calory.invalid &&
      this.recipe_new.getDifficulty() > 0 &&
      !(this.recipe_new.getIngredient[0] === '') &&
      !(this.recipe_new.getStep[0] === '') &&
      !this.link.invalid &&
      !this.other.invalid) {
      this.color = 'primary';
    }
  }

  setFormControl() {
    this.title = new FormControl(this.recipe_new.getTitle(), [Validators.required, Validators.maxLength(255)]);
    this.author = new FormControl(this.recipe_new.getAuthor(), [Validators.required, Validators.maxLength(255)]);
    this.duration = new FormControl(this.recipe_new.getDuration(), [Validators.maxLength(11)]);
    this.calory = new FormControl(this.recipe_new.getCalory(), [Validators.maxLength(255)]);
    this.difficulty = new FormControl(this.recipe_new.getDifficulty());
    this.link = new FormControl(this.recipe_new.getLink(), [Validators.maxLength(22)]);
    this.other = new FormControl(this.recipe_new.getOther(), [Validators.maxLength(255)]);
  }

  handleAddRecipe() {
    this.recipeDetailService.addRecipe(this.recipe_new, this.user_Id).subscribe((res) => {
      this.response = res.valueOf();
      if (this.response !== 0) {
        this.recipe_new.setId(res);
        this.recipe_old.copy(this.recipe_new);
        this.edit = false;
        this.high = this.highview;
        this.recipe_id = res;
        sessionStorage.setItem('RecipeID', JSON.stringify(res));
        sessionStorage.setItem('Recipe', this.recipe_old.getRecipe());
      } else if (this.response === 0) {
        localStorage.removeItem('UserID');
        this.router.navigate(['/login']);
      }
    });
  }

  handleDeleteRecipe() {
    this.recipe_id = +sessionStorage.getItem('RecipeID');
    this.recipeDetailService.deleteRecipe(this.recipe_id, this.user_Id).subscribe((res) => {
      this.response = res.valueOf();
      if (this.response === 20) {
        sessionStorage.removeItem('RecipeID');
        sessionStorage.removeItem('Recipe');
        this.router.navigate(['/']);
      } else if (this.response === 40) {
        this.router.navigate(['/login']);
      }
    });
  }

  handleBookmark(bookmarked: boolean) {
    this.recipe_old.setBookmark(bookmarked);
    this.recipe_new.setBookmark(bookmarked);
    sessionStorage.setItem('Recipe', this.recipe_old.getRecipe());
    if (bookmarked === true) {
      this.recipeDetailService.addBookmark(this.recipe_id, this.user_Id).subscribe((res) => {
        this.response = res;
        this.directLogin();
      });
    } else if (bookmarked === false) {
      this.recipeDetailService.deleteBookmark(this.recipe_id, this.user_Id).subscribe((res) => {
        this.response = res;
        this.directLogin();
      });
    }
  }

  directLogin() {
    if (this.response === 40) {
      this.router.navigate(['/login']);
    }
  }
}
