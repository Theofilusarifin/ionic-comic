import { Component, OnInit } from '@angular/core';
import { ComicService } from 'src/app/service/comic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public cs: ComicService) {}

  ngOnInit() {
    this.getPopular();
  }

  // Options for popular slides
  pupolarOpt = {
    direction: 'horizontal',
    slidesPerView: 2,
    pagination: {
      el: '.swiper-pagination',
    },
  };

  popular_comics = null;
  async getPopular() {
    this.cs.getPopular().subscribe((data) => {
      if (data.result == 'success') {
        this.popular_comics = data.comics;
        console.log(this.popular_comics);
      }
    });
  }
}
