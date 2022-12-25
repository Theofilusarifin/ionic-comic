import { Component, OnInit } from '@angular/core';
import { ComicService } from 'src/app/service/comic.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(public cs: ComicService) {}

  ngOnInit() {
    this.searchComic();
  }

  // Get Genres
  comics = null;
  keyword = '';

  async searchComic() {
    this.cs.getByKeyword(this.keyword).subscribe((data) => {
      if (data.result == 'success') {
        // Assign Data
        this.comics = data.comics;
      }
    });
  }
}
