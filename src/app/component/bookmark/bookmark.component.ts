import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ComicService } from 'src/app/service/comic.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss'],
})
export class BookmarkComponent implements OnInit {
  constructor(public cs: ComicService, public ac: AppComponent) {}

  ngOnInit() {
    this.getFavorite(this.ac.email);
  }

  // Get Favorite Comic
  favorite_comics = null;
  async getFavorite(email: string) {
    this.cs.getFavorite(email).subscribe((data) => {
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
        this.favorite_comics = data.comics;
      }
    });
  }
}
