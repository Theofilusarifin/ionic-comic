import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ComicService } from 'src/app/service/comic.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss'],
})
export class CompletedComponent implements OnInit {
  constructor(public cs: ComicService, public ac: AppComponent) {}

  ngOnInit() {
    this.getComplete();
  }

  // Get Favorite Comic
  completed_comics = null;
  async getComplete() {
    this.cs.getComplete().subscribe((data) => {
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
        this.completed_comics = data.comics;
      }
    });
  }
}
