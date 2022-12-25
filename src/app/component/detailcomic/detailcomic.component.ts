import { Component, OnInit } from '@angular/core';
import { ComicService } from 'src/app/service/comic.service';
import { ActivatedRoute } from '@angular/router';
import { toArray } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { AppComponent } from 'src/app/app.component';
import { AlertController } from '@ionic/angular';
import { CommentService } from 'src/app/service/comment.service';

@Component({
  selector: 'app-detailcomic',
  templateUrl: './detailcomic.component.html',
  styleUrls: ['./detailcomic.component.scss'],
})
export class DetailcomicComponent implements OnInit {
  constructor(
    public cs: ComicService,
    public cos: CommentService,
    public us: UserService,
    public ac: AppComponent,
    public route: ActivatedRoute,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.getDetail(this.route.snapshot.params['id']);
    this.stars = Array(5)
      .fill(4)
      .map((x, i) => i + 1); // [1,2,3,4,5]
  }
  stars: number[] = [];
  // Comic detail
  comic_id: number = 0;
  first_chapter_id = null;
  last_chapter_id = null;
  comic_name = null;
  comic_author = null;
  comic_status = null;
  comic_summary = null;
  comic_total_view = null;
  comic_url_poster = null;
  comic_total_comment: number = 0;
  comic_total_reply: number = 0;
  comic_total_favorite = null;
  comic_avg_rating: number = 0;
  comic_total_rating: number = 0;
  rating_given: number = 0;
  favorited: boolean = false;
  comment_given: string = '';

  // Reply
  comment_selected_id: number = 0;
  reply_given: string = '';

  // comic chapters
  comic_chapters = null;
  // comic comments
  comic_comments: any = null;
  // Comic genres
  comic_genres = null;
  // Comic replies
  comic_replies: any = null;
  // Get Favorite Comic
  async getDetail(comic_id: number) {
    this.cs.getById(comic_id).subscribe((data) => {
      if (data.result == 'success') {
        // Assign Data
        // Comic detail
        this.comic_id = data.comic.id;
        this.first_chapter_id = data.first_chapter.id;
        this.last_chapter_id = data.last_chapter.id;
        this.comic_name = data.comic.name;
        this.comic_author = data.comic.author;
        this.comic_status = data.comic.status;
        this.comic_summary = data.comic.summary;
        this.comic_total_view = data.comic.total_view;
        this.comic_url_poster = data.comic.url_poster;
        this.comic_total_comment = data.all_comment;
        this.comic_total_favorite = data.favorite.total;
        if (data.rating.total_rating > 0 && data.rating.banyak_rating > 0) {
          this.comic_total_rating = data.rating.banyak_rating;
          this.comic_avg_rating = Math.floor(
            parseFloat(
              (data.rating.total_rating / data.rating.banyak_rating).toFixed(2)
            )
          );
        } else {
          this.comic_total_rating = 0;
          this.comic_avg_rating = 0;
        }
        // convert last update into proper string
        data.chapters.forEach(
          (element: { [x: string]: string | number | Date }) => {
            element['release_date'] = this.ac.last_update(
              element['release_date']
            );
          }
        );

        // convert last update into proper string
        data.comments.forEach(
          (element: { [x: string]: string | number | Date }) => {
            element['date'] = this.ac.last_update(element['date']);
          }
        );

        // convert last update into proper string
        data.replies.forEach(
          (element: { [x: string]: string | number | Date }) => {
            element['date'] = this.ac.last_update(element['date']);
          }
        );
        // comic chapters
        this.comic_chapters = data.chapters;
        // comic comments
        this.comic_comments = data.comments;
        // Comic genre
        this.comic_genres = data.genres;
        // Comic replies
        this.comic_replies = data.replies;
        this.comic_total_reply = data.replies.length;

        // Assign replies to comment
        if (data.comments !== null) {
          let i = 0;
          data.comments.forEach((comment: any) => {
            if (data.replies !== null) {
              let temp_replies: any[] = [];
              data.replies.forEach((reply: any) => {
                if (comment.id == reply.comment_id) {
                  temp_replies.push(reply);
                }
              });
              if (temp_replies.length > 0) {
                this.comic_comments[i] = Object.assign(
                  {},
                  this.comic_comments[i],
                  {
                    replies: temp_replies,
                  }
                );
              }
            }
            i++;
          });
          console.log(this.comic_comments);
        }
        this.checkFavorite(this.ac.email, this.comic_id);
      }
    });
  }

  // Check Favorite Comic
  async checkFavorite(email: string, comic_id: any) {
    this.us.checkFavorite(email, comic_id).subscribe((data) => {
      if (data.result == 'success') {
        this.favorited = data.checked != '' ? true : false;
      }
    });
  }

  // Add Favorite Comic
  async addFavorite() {
    this.us
      .addFavorite(this.ac.email, this.comic_id)
      .subscribe(async (data) => {
        if (data.result == 'success') {
          this.favorited = true;
          const alert = await this.alertController.create({
            header: 'Alert',
            message: 'Favorite Added Successfuly!',
            buttons: ['OK'],
          });
          await alert.present();
        } else {
          const alert = await this.alertController.create({
            header: 'Alert',
            message: data.message,
            buttons: ['OK'],
          });
          await alert.present();
        }
      });
  }

  // Delete Favorite Comic
  async deleteFavorite() {
    this.us
      .deleteFavorite(this.ac.email, this.comic_id)
      .subscribe(async (data) => {
        if (data.result == 'success') {
          this.favorited = false;
          const alert = await this.alertController.create({
            header: 'Alert',
            message: 'Favorite Deleted Successfuly!',
            buttons: ['OK'],
          });
          await alert.present();
        } else {
          const alert = await this.alertController.create({
            header: 'Alert',
            message: data.message,
            buttons: ['OK'],
          });
          await alert.present();
        }
      });
  }

  // Add rating Comic
  async addRating(star_number: number) {
    this.us
      .addRating(this.ac.email, this.comic_id, star_number)
      .subscribe(async (data) => {
        if (data.result == 'success') {
          this.rating_given = star_number;
          const alert = await this.alertController.create({
            header: 'Alert',
            message: 'Rating Added Successfuly!',
            buttons: ['OK'],
          });
          await alert.present();
        } else {
          const alert = await this.alertController.create({
            header: 'Alert',
            message: data.message,
            buttons: ['OK'],
          });
          await alert.present();
        }
      });
  }

  // Reset Rating Comic
  async resetRating() {
    this.us
      .resetRating(this.ac.email, this.comic_id)
      .subscribe(async (data) => {
        if (data.result == 'success') {
          this.rating_given = 0;
          const alert = await this.alertController.create({
            header: 'Alert',
            message: 'Rating Reset Successfuly!',
            buttons: ['OK'],
          });
          await alert.present();
        } else {
          this.rating_given = 0;
          const alert = await this.alertController.create({
            header: 'Alert',
            message: data.message,
            buttons: ['OK'],
          });
          await alert.present();
        }
      });
  }

  // Add Comment Comic
  async addComment() {
    if (this.comment_given != '') {
      this.cos
        .addComment(this.ac.email, this.comic_id, this.comment_given)
        .subscribe(async (data) => {
          if (data.result == 'success') {
            this.getDetail(this.comic_id);
            this.comment_given = '';
            const alert = await this.alertController.create({
              header: 'Alert',
              message: 'Comment Added Successfuly!',
              buttons: ['OK'],
            });
            await alert.present();
          } else {
            const alert = await this.alertController.create({
              header: 'Alert',
              message: data.message,
              buttons: ['OK'],
            });
            await alert.present();
          }
        });
    } else {
      alert('Please input a comment!');
    }
  }

  // Show Reply Section
  async showReply(comic_id: number) {
    if (comic_id == this.comment_selected_id) {
      // Close Section
      this.comment_selected_id = 0;
    } else {
      // Open Section
      this.comment_selected_id = comic_id;
    }
  }

  // Add Reply Comic
  async addReply() {
    if (this.reply_given != '') {
      this.cos
        .addReply(
          this.ac.email,
          this.comment_selected_id,
          this.comic_id,
          this.reply_given
        )
        .subscribe(async (data) => {
          if (data.result == 'success') {
            this.getDetail(this.comic_id);
            this.comment_selected_id = 0;
            this.reply_given = '';
            const alert = await this.alertController.create({
              header: 'Alert',
              message: 'Reply Added Successfuly!',
              buttons: ['OK'],
            });
            await alert.present();
          } else {
            const alert = await this.alertController.create({
              header: 'Alert',
              message: data.message,
              buttons: ['OK'],
            });
            await alert.present();
          }
        });
    } else {
      alert('Please input a reply!');
    }
  }
}
