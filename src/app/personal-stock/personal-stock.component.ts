import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-stock',
  templateUrl: './personal-stock.component.html',
  styleUrls: ['./personal-stock.component.scss']
})
export class PersonalStockComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ingredients = [
    {id: 1, title:'Vodka', description: 'just simple vodka', category: 'Alcohol', imageId: 'ewef2r42', active:true, measurement:'measurement' },
    {id: 2, title:'Vine', description: 'just simple vodka', category: 'Alcohol', imageId: 'ewef2r42', active:true, measurement:'measurement' },
    {id: 3, title:'Vicki', description: 'just simple vodka', category: 'Alcohol', imageId: 'ewef2r42', active:true, measurement:'measurement' },
    {id: 4, title:'Beer', description: 'just simple vodka', category: 'Alcohol', imageId: 'ewef2r42', active:true, measurement:'measurement' },
    {id: 5, title:'Rom', description: 'just simple vodka', category: 'Alcohol', imageId: 'ewef2r42', active:true, measurement:'measurement' },
    {id: 6, title:'', description: 'just simple vodka', category: 'Alcohol', imageId: 'ewef2r42', active:true, measurement:'measurement' },
    {id: 7, title:'Vodka', description: 'just simple vodka', category: 'Alcohol', imageId: 'ewef2r42', active:true, measurement:'measurement' },
  ];

/*  int id;
  String title;
  String description;
  String category;
  String image_id;
  boolean active;
  String measurement;*/
}
