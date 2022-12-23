import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  pupolarOpt = {
    direction: 'horizontal',
    slidesPerView: 2,
    pagination: {
      el: '.swiper-pagination',
    },
  };


  ngOnInit() {}
}
