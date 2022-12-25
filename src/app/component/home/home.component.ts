import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ComicService } from 'src/app/service/comic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public cs: ComicService, public ac: AppComponent) {}

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
            element['latest_update'] = this.ac.last_update(
              element['latest_update']
            );
          }
        );
        // Assign Data
        this.popular_comics = data.comics;
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
            element['latest_update'] = this.ac.last_update(
              element['latest_update']
            );
          }
        );
        // Assign Data
        this.latest_comics = data.comics;
      }
    });
  }
}
