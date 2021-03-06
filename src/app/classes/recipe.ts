import {Category} from '../classes/category';
import {Material} from './material';
import {Ingredient} from './ingredient';
import {Step} from './step';
import {of} from 'rxjs';

export class Recipe {

  //private userId: Number;
  private id: Number;
  private category: string;
  private subcategory: string;
  private title: string;
  private author: string;
  private bookmark: boolean;
  private duration: Number;
  private calory: string;
  private difficultyLevel: Number;
  private ingredients: Array<Ingredient>;
  private material: Array<Material>;
  private steps: Array<Step>;
  // private _picture: string;
  private link: string;
  private other: string;

  private splitter = '&&&';
  private attribute = '%%%';
  private empty = '§§§';

  public Recipe() {
  };

  getRecipe() {
    var recipe = '';
    if (this.id === undefined) {
      recipe += this.empty;
    } else {
      recipe += this.id.toString();
    }
    recipe += this.splitter;
    if (this.category === null || this.category === undefined || this.category === '') {
      recipe += this.empty;
    } else {
      recipe += this.category;
    }
    recipe += this.splitter;
    if (this.subcategory === null || this.subcategory === undefined || this.subcategory === '') {
      recipe += this.empty;
    } else {
      recipe += this.subcategory;
    }
    recipe += this.splitter;
    if (this.title === null || this.title === undefined|| this.title === '') {
      recipe += this.empty;
    } else {
      recipe += this.title;
    }
    recipe += this.splitter;
    if (this.author === null || this.author === undefined || this.author === '') {
      recipe += this.empty;
    } else {
      recipe += this.author;
    }
    recipe += this.splitter;
    if (this.bookmark === undefined) {
      recipe += this.empty;
    } else {
      recipe += this.bookmark.toString();
    }
    recipe += this.splitter;
    if (this.duration === undefined) {
      recipe += this.empty;
    } else {
      recipe += this.duration.toString();
    }
    recipe += this.splitter;
    if (this.calory === null || this.calory === '') {
      recipe += this.empty;
    } else {
      recipe += this.calory;
    }
    recipe += this.splitter;
    if (this.difficultyLevel === null || this.difficultyLevel === undefined ||this.difficultyLevel === 0) {
      recipe += this.empty;
    } else {
      recipe += this.difficultyLevel.toString();
    }
    recipe += this.splitter;
    if (this.ingredients === null || this.ingredients === undefined || this.ingredients.length === 0) {
      recipe += this.empty;
    } else {
      for (let i = 0; i < this.ingredients.length; i++) {
        if (this.ingredients[i].getIngredientName() !== '') {
          recipe += this.ingredients[i].getIngredientName();
          if (i != this.ingredients.length - 1) {
            recipe += this.attribute;
          }
        } else if (this.ingredients[i].getIngredientName() === null) {
          recipe += this.empty;
          break;
        }
      }
    }
    recipe += this.splitter;
    if (this.material === null || this.material === undefined || this.material.length === 0) {
      recipe += this.empty;
    } else {
      for (let i = 0; i < this.material.length; i++) {
        if (this.material[i].getMaterialName() !== '') {
          recipe += this.material[i].getMaterialName();
          if (i != this.material.length - 1) {
            recipe += this.attribute;
          }
        } else if (this.material[i].getMaterialName() === null) {
          recipe += this.empty;
          break;
        }
      }
    }
    recipe += this.splitter;
    if (this.steps === null || this.steps === undefined || this.steps.length === 0) {
      recipe += this.empty;
    } else {
      for (let i = 0; i < this.steps.length; i++) {
        if (this.steps[i].getStepName() !== '') {
          recipe += this.steps[i].getStepName();
          if (i != this.steps.length - 1) {
            recipe += this.attribute;
          }
        } else if (this.steps[i].getStepName() === null) {
          recipe += this.empty;
          break;
        }
      }
    }
    recipe += this.splitter;
    if (this.link === null || this.link === undefined || this.link === '') {
      recipe += this.empty;
    } else {
      recipe += this.link;
    }
    recipe += this.splitter;
    if (this.other === undefined || this.other === '') {
      recipe += this.empty;
    } else {
      recipe += this.other;
    }
    return recipe;
  }

  setRecipe(recipe: string) {
    var bigSplit = recipe.split(this.splitter);
    if (bigSplit[0] != this.empty) {
      this.id = +bigSplit[0];
    } else {
      this.setId(0);
    }
    if (bigSplit[1] != this.empty) {
      this.category = bigSplit[1];
    } else {
      this.category = 'OTHER';
    }
    if (bigSplit[2] != this.empty) {
      this.subcategory = bigSplit[2];
    } else {
      this.subcategory = 'DEFAULT';
    }
    if (bigSplit[3] != this.empty) {
      this.title = bigSplit[3];
    } else {
      this.setTitle('');
    }
    if (bigSplit[4] != this.empty) {
      this.author = bigSplit[4];
    } else {
      this.setAuthor('');
    }
    if (bigSplit[5] != this.empty) {
      this.bookmark = (bigSplit[5] === 'true');
    } else {
      this.setBookmark(false);
    }
    if (bigSplit[6] != this.empty) {
      this.duration = +bigSplit[6];
    } else {
      this.setDuration(0);
    }
    if (bigSplit[7] != this.empty) {
      this.calory = bigSplit[7];
    } else {
      this.setCalory('');
    }
    if (bigSplit[8] != this.empty) {
      this.difficultyLevel = +bigSplit[8];
    } else {
      this.setDifficulty(1);
    }
    var ingredients = bigSplit[9].split(this.attribute);
    this.ingredients = [];
    for (let i = 0; i < ingredients.length; i++) {
      if (ingredients[i] != this.empty) {
        this.ingredients.push(new Ingredient(null, ingredients[i]));
      }
    }
    var material = bigSplit[10].split(this.attribute);
    this.material = [];
    for (let i = 0; i < material.length; i++) {
      if (material[i] != this.empty) {
        this.material.push(new Material(null, material[i]));
      }
    }
    var step = bigSplit[11].split(this.attribute);
    this.steps = [];
    for (let i = 0; i < step.length; i++) {
      if (step[i] != this.empty) {
        this.steps.push(new Step(null, step[i]));
      }
    }
    if (bigSplit[12] != this.empty) {
      this.link = bigSplit[12];
    } else {
      this.setLink('');
    }
    if (bigSplit[13] != this.empty) {
      this.other = bigSplit[13];
    } else {
      this.setOther('');
    }
  }

  public getId() {
    return this.id;
  }

  public setId(id: Number) {
    if (id === null) {
      this.id = 0;
    } else {
      this.id = id;
    }
  }

  public getCategoryFE() {
    var cat = new Category();
    return cat.getCategoryFE(this.category, this.subcategory);
  }

  public setCategoryFE(category: string) {
    var cat = new Category();
    cat.setCategoryBE(category);
    this.category = cat.getCategory();
    this.subcategory = cat.getSubcategory();
  }

  public getCategory() {
    return this.category;
  }

  public getSubcategory() {
    return this.subcategory;
  }

  public getTitle() {
    return this.title;
  }

  public setTitle(title: string) {
    this.title = title;
  }

  public getAuthor() {
    return this.author;
  }

  public setAuthor(author: string) {
    this.author = author;
  }

  public getBookmark() {
    return this.bookmark;
  }

  public setBookmark(bookmark: boolean) {
    this.bookmark = bookmark;
  }

  public getDuration() {
    return this.duration;
  }

  public setDuration(duration: Number) {
    this.duration = duration;
  }

  public getCalory() {
    return this.calory;
  }

  public setCalory(calory: string) {
    this.calory = calory;
  }

  public getDifficulty() {
    return this.difficultyLevel;
  }

  public setDifficulty(difficulty: Number) {
    this.difficultyLevel = difficulty;
  }

  public getIngredientBE() {
    return this.ingredients;
  }

  public setIngredientBE(ingredient: Array<Ingredient>) {
    this.ingredients = ingredient;
  }

  public getIngredient() {
    var ingredients = [];
    this.ingredients.forEach((value) => {
      ingredients.push(value.getIngredientName());
    });
    return ingredients;
  }

  public setIngredient(ingredient: Array<string>) {
    // löschen this.ingredients
    this.ingredients = [];
    ingredient.forEach((value) => {
      if (value.length <= 255) {
        this.ingredients.push(new Ingredient(null, value));
      } else {
        this.ingredients.push(new Ingredient(null, value.slice(0, 255)));
      }
    });
  }

  public addIngredient(ingredient: string, index: number) {
    if (index === -1) {
      this.ingredients.push(new Ingredient(null, ingredient));
    } else {
      if (ingredient.length <= 255) {
        this.ingredients[index] = (new Ingredient(null, ingredient));
      } else {
        this.ingredients[index] = (new Ingredient(null, ingredient.slice(0, 255)));
      }
    }
  }

  public deleteIngredient(index: number) {
    if (index === 0) {
      if (this.ingredients.length === 1) {
        this.ingredients = [];
        this.ingredients.push(new Ingredient(null, ''));
      } else {
        this.ingredients.shift();
      }
    } else {
      this.ingredients.splice(index, 1);
    }
  }

  public getMaterialBE() {
    return this.material;
  }

  public setMaterialBE(material: Array<Material>) {
    this.material = material;
  }

  public getMaterial() {
    var materials = [];
    this.material.forEach((value) => {
      materials.push(value.getMaterialName());
    });
    return materials;
  }

  public setMaterial(material: Array<string>) {
    this.material = [];
    material.forEach((value) => {
      if (value.length <= 255) {
        this.material.push(new Material(null, value));
      } else {
        this.material.push(new Material(null, value.slice(0, 255)));
      }
    });
  }

  public addMaterial(material: string, index: number) {
    if (index === -1) {
      this.material.push(new Material(null, material));
    } else {
      if (material.length <= 255) {
        this.material[index] = new Material(null, material);
      } else {
        this.material[index] = new Material(null, material.slice(0, 255));
      }
    }
  }

  public deleteMaterial(index: number) {
    if (index === 0) {
      if (this.material.length === 1) {
        this.material = [];
        this.material.push(new Material(null, ''));
      } else {
        this.material.shift();
      }
    } else {
      this.material.splice(index, 1);
    }
  }

  public getStepBE() {
    return this.steps;
  }

  public setStepBE(step: Array<Step>) {
    this.steps = step;
  }

  public getStep() {
    var steps = [];
    this.steps.forEach((value) => {
      steps.push(value.getStepName());
    });
    return steps;
  }

  public setStep(step: Array<string>) {
    this.steps = [];
    step.forEach((value) => {
      if (value.length <= 255) {
        this.steps.push(new Step(null, value));
      } else {
        this.steps.push(new Step(null, value.slice(0, 255)));
      }
    });
  }

  public addStep(step: string, index: number) {
    if (index === -1) {
      this.steps.push(new Step(null, step));
    } else {
      if (step.length <= 255) {
        this.steps[index] = new Step(null, step);
      } else {
        this.steps[index] = new Step(null, step.slice(0, 255));
      }
    }
  }

  public deleteStep(index: number) {
    if (index === 0) {
      if (this.steps.length === 1) {
        this.steps = [];
        this.steps.push(new Step(null, ''));
      } else {
        this.steps.shift();
      }
    } else {
      this.steps.splice(index, 1);
    }
  }

  //
  // public get picture() {
  //   return this._picture;
  // }
  //
  // public set picture(picture: string) {
  //   this._picture = picture;
  // }

  public getLink() {
    return this.link;
  }

  public setLink(link: string) {
    this.link = link;
  }

  public getOther() {
    return this.other;
  }

  public setOther(other: string) {
    this.other = other;
  }

  public copy(r: Recipe) {
    this.id = r.getId();
    this.category = r.getCategory();
    this.subcategory = r.getSubcategory();
    this.title = r.getTitle();
    this.author = r.getAuthor();
    this.bookmark = r.getBookmark();
    this.duration = r.getDuration();
    this.calory = r.getCalory();
    this.difficultyLevel = r.getDifficulty();
    this.ingredients = r.getIngredientBE().slice();
    this.material = r.getMaterialBE().slice();
    this.steps = r.getStepBE().slice();
    // this._picture = r.picture;
    this.link = r.getLink();
    this.other = r.getOther();
  }

}
