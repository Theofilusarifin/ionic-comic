import { Component, OnInit } from '@angular/core';
import { ComicService } from 'src/app/service/comic.service';
import { ActivatedRoute } from '@angular/router';
import { toArray } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-detailcomic',
  templateUrl: './detailcomic.component.html',
  styleUrls: ['./detailcomic.component.scss'],
})
export class DetailcomicComponent implements OnInit {
  constructor(
    public cs: ComicService,
    public us: UserService,
    public ac: AppComponent,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getDetail(this.route.snapshot.params['id']);
  }

  // Comic detail
  comic_id = null;
  comic_name = null;
  comic_author = null;
  comic_status = null;
  comic_summary = null;
  comic_total_view = null;
  comic_url_poster = null;
  comic_total_comment = null;
  comic_total_favorite = null;
  comic_avg_rating:number = 0;
  favorited:boolean = false;

  // comic chapters
  comic_chapters = null;
  // comic comments
  comic_comments = null;
  // Comic genres
  comic_genres = null;
  // Comic replies
  comic_replies = null;
  // Get Favorite Comic
  async getDetail(comic_id: number) {
    this.cs.getById(comic_id).subscribe((data) => {
      console.log(data);
      if (data.result == 'success') {
        // Assign Data
        // Comic detail
        this.comic_id = data.comic.id;
        this.comic_name = data.comic.name;
        this.comic_author = data.comic.author;
        this.comic_status = data.comic.status;
        this.comic_summary = data.comic.summary;
        this.comic_total_view = data.comic.total_view;
        this.comic_url_poster = data.comic.url_poster;
        this.comic_total_comment = data.all_comment;
        this.comic_total_favorite = data.favorite.total;
        this.comic_avg_rating = Math.floor(parseFloat((data.rating.total_rating / data.rating.banyak_rating).toFixed(2)));
        // comic chapters
        this.comic_chapters = data.chapters;
        // comic comments
        this.comic_comments = data.comments;
        // Comic genre
        this.comic_genres = data.genres;
        // Comic replies
        this.comic_replies = data.replies;

        this.checkFavorite(this.ac.email, this.comic_id);
      }
    });
  }

  // Check Favorite Comic
  async checkFavorite(email: string, comic_id: any) {
    this.us.checkFavorite(email, comic_id).subscribe((data) => {
      if (data.result == "success"){
        this.favorited = (data.checked != "") ? true : false
      }
    });
  }
}
