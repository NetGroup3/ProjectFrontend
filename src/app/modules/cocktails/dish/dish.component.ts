import {Component, OnInit} from '@angular/core';
import {ModeratorService} from "../../core/services/moderator.service";
import {Dish} from "../../core/models/dish";
import {Ingredient} from "../../core/models/ingredient";
import {Cloudinary, CloudinaryImage} from "@cloudinary/url-gen";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {AuthService} from "../../auth/services/client/auth.service";
import {DishFormat} from "../../core/models/dishFormat";

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {
  listOfOption: Array<{ value: string; label: string; id: number; }> = []
  ingredients: Ingredient[] = []
  listOfSelectedValue = []
  limit: number = 10
  page: number = 0
  Dishes: DishFormat[] = [];
  key: string = ""
  category: string = ""
  desc: boolean = false
  toggle: boolean = true
  editDelete: boolean = false
  like: boolean = true
  favourite: boolean = true
  liked: boolean = false

  role: string | null = localStorage.getItem("USER_ROLE")

  delDish: Dish = {
    id: 0,
    title: "",
    description: "",
    category: "",
    receipt: "",
    imageId: "",
    active: false,
    likes: 0
  }

  constructor(private moderatorService: ModeratorService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    if (this.authService.getUserRole() == "ADMIN") {
      this.editDelete = false
      this.liked = true
    } else if (this.authService.getUserRole() == "MODERATOR") {
      this.editDelete = false
      this.liked = true
    } else if (this.authService.getUserRole() == "USER") {
      this.editDelete = true
      this.like = false
      this.favourite = false
    } else {
      this.editDelete = true
      this.like = true
      this.favourite = true
    }
    this.search(this.desc)
    this.getIngredients();
  }

  getDishes(limit: number, page: number, desc: boolean, key: string, category: string): void {
    this.moderatorService.getDishes(limit, page, desc, key, category)
      .subscribe((response) => {
          this.Dishes = response
          if (this.Dishes.length === 0) {
            this.page = -1
            this.next()
          }
        }
      )
    ;
  }

  getIngredients() {
    this.moderatorService.getIngredients(50, 0, "", "", "")
      .subscribe((response) => {
        this.ingredients = response
        this.listOfOption = this.ingredients.map(item => ({
          value: item.title,
          label: item.title,
          id: item.id
        }));
      });
  }

  next() {
    this.page = this.page + 1;
    this.ngOnInit()

  }

  prev() {
    if (this.page > 0) {
      this.page = this.page - 1;
      this.ngOnInit();
    }
  }

  change() {
    this.toggle = !this.toggle;
  }

  ok() {
    this.toggle = !this.toggle;
    this.moderatorService.deleteDish(this.delDish.id).subscribe(() => {
      this.ngOnInit()
    });
  }

  initImage(imageId: string):
    CloudinaryImage {
    const cld = new Cloudinary({cloud: {cloudName: 'djcak19nu'}});
    return cld.image(imageId)
      .resize(thumbnail().width(50).height(50))
      .roundCorners(byRadius(10));
  }

  delete(dish: Dish) {
    this.delDish = dish;
    this.toggle = !this.toggle;

  }

  search(desc: boolean) {
    this.desc = desc
    this.getDishes(this.limit, this.page, this.desc, this.key, this.category);
  }

  likes(id: number) {
    this.liked = !this.liked;
    if (this.liked) {
      this.moderatorService.like(id).subscribe(() => {
      })
    }
  }

  searchIngredients() {
    if (this.listOfSelectedValue.length != 0) {
      this.moderatorService.searchByIngredients(this.listOfSelectedValue, this.limit, this.page).subscribe((response) => {
        this.Dishes = response
      })
    }
  }

  favouriteToggle (favourite : boolean, dish : number) : boolean {
    if (favourite) return this.moderatorService.removeFavourite(dish).subscribe().closed
    return !this.moderatorService.addFavourite({
      user: Number(this.authService.getUserId()),
      dish: dish
    }).subscribe().closed
  }
}
