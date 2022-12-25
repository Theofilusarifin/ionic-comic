import { Component, OnInit } from '@angular/core';
import { GenreService } from 'src/app/service/genre.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-detailgenre',
  templateUrl: './detailgenre.component.html',
  styleUrls: ['./detailgenre.component.scss'],
})
export class DetailgenreComponent implements OnInit {
  constructor(
    public gs: GenreService,
    public route: ActivatedRoute,
    public ac: AppComponent
  ) {}

  ngOnInit() {
    this.getComic(this.route.snapshot.params['id']);
  }

  // Get Genres
  genre_comics = null;
  genre_name = null;
  genre_desc = null;

  async getComic(genre_id: number) {
    this.gs.getById(genre_id).subscribe((data) => {
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
        this.genre_comics = data.comics;
        this.genre_name = data.genre.name;
        this.genre_desc = data.genre.description;
      }
    });
  }
}
