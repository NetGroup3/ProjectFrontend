import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ModeratorService} from "../services/moderator.service";
import {Ingredient} from "../models/ingredient";
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-edit-ingredient',
  templateUrl: './add-edit-ingredient.component.html',
  styleUrls: ['./add-edit-ingredient.component.scss']
})
export class AddEditIngredientComponent implements OnInit {

  @Input() ingridient?: Ingredient;
  constructor(
    private route: ActivatedRoute,
    private moderatorService: ModeratorService,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.getHero();
  }
  goBack(): void {
    this.location.back();
  }
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.moderatorService.get_ingridient(id)
      .subscribe(ingridient => this.ingridient = ingridient);
  }

}