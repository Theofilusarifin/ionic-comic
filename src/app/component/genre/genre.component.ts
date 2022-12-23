import { Component, OnInit } from '@angular/core';
import { GenreService } from 'src/app/service/genre.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent implements OnInit {
  constructor(public gs: GenreService) {}

  ngOnInit() {
    this.getAll()
  }

  // Get Genres 
  genres = null;
  async getAll() {
    this.gs.getAll().subscribe((data) => {
      if (data.result == 'success') {
        // Assign Data
        this.genres = data.genres;
      }
    });
  }
}
