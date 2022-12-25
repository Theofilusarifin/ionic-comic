import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChapterService } from 'src/app/service/chapter.service';

@Component({
  selector: 'app-detailchapter',
  templateUrl: './detailchapter.component.html',
  styleUrls: ['./detailchapter.component.scss'],
})
export class DetailchapterComponent implements OnInit {
  constructor(
    public chs: ChapterService,
    public route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getDetail(
      this.route.snapshot.params['id'],
      this.route.snapshot.params['chapter']
    );
  }

  pages = null;
  comic_id: number = 0;
  comic_name = null;
  chapter_number: number = 1;
  total_chapter: number = 1;

  // Get Pages Detail
  async getDetail(comic_id: number, chapter_id: number) {
    this.chs.getById(comic_id, chapter_id).subscribe((data) => {
      if (data.result == 'success') {
        this.pages = data.pages;
        this.comic_id = data.comic.id;
        this.comic_name = data.comic.name;
        this.chapter_number = data.chapter.number;
        this.total_chapter = data.total_chapter.total;
      }
    });
  }

  // Get Next Chapter
  async getNext() {
    this.chs.getNext(this.comic_id, this.chapter_number).subscribe((data) => {
      if (data.result == 'success') {
        this.router.navigate([
          '/comic/' + this.comic_id + '/chapter/' + data.chapter.id,
        ]);
        this.getDetail(this.comic_id, data.chapter.id);
      }
    });
  }

  // Get Next Chapter
  async getPrev() {
    this.chs.getPrev(this.comic_id, this.chapter_number).subscribe((data) => {
      if (data.result == 'success') {
        this.router.navigate([
          '/comic/' + this.comic_id + '/chapter/' + data.chapter.id,
        ]);
        this.getDetail(this.comic_id, data.chapter.id);
      }
    });
  }
}
