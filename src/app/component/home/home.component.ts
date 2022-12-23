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
    this.getLatest();
  }

  // Options for popular slides
  pupolarOpt = {
    direction: 'horizontal',
    slidesPerView: 3,
    pagination: {
      el: '.swiper-pagination',
    },
  };

  // Get Popular Comic
  popular_comics = null;
  async getPopular() {
    this.cs.getPopular().subscribe((data) => {
      if (data.result == 'success') {
        // convert last update into proper string
        data.comics.forEach(
          (element: { [x: string]: string | number | Date }) => {
            element['latest_update'] = this.last_update(
              element['latest_update']
            );
          }
        );
        // Assign Data
        this.popular_comics = data.comics;
        console.log(this.popular_comics);
      }
    });
  }

  // Get Latest Comic
  latest_comics = null;
  async getLatest() {
    this.cs.getLatest().subscribe((data) => {
      if (data.result == 'success') {
        // convert last update into proper string
        data.comics.forEach(
          (element: { [x: string]: string | number | Date }) => {
            element['latest_update'] = this.last_update(
              element['latest_update']
            );
          }
        );
        // Assign Data
        this.latest_comics = data.comics;
        console.log(this.latest_comics);
      }
    });
  }

  last_update = (latest_update: string | number | Date) => {
    // Converting datetime
    let difference =
      ((Number(new Date()) - Number(new Date(latest_update))) / 1000) | 0;
    let timePassed = `${difference} seconds ago`;

    if (difference >= 60) {
      difference /= 60;
      timePassed = `${difference | 0} minutes ago`;

      if (difference >= 60) {
        difference /= 60;
        timePassed = `${difference | 0} hours ago`;

        if (difference >= 24) {
          difference /= 24;
          timePassed = `${difference | 0} days ago`;

          if (difference >= 30) {
            difference /= 30;
            timePassed = `${difference | 0} months ago`;

            if (difference >= 365) {
              difference /= 365;
              timePassed = `${difference | 0} years ago`;
            }
          }
        }
      }
    }

    // Assign value
    return timePassed;
  };
}
