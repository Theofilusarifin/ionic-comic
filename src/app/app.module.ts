import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';

import { ChapterService } from './service/chapter.service';
import { ComicService } from './service/comic.service';
import { CommentService } from './service/comment.service';
import { GenreService } from './service/genre.service';
import { UserService } from './service/user.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { BookmarkComponent } from './component/bookmark/bookmark.component';
import { CompletedComponent } from './component/completed/completed.component';
import { RandomComponent } from './component/random/random.component';
import { DetailchapterComponent } from './component/detailchapter/detailchapter.component';
import { DetailcomicComponent } from './component/detailcomic/detailcomic.component';
import { DetailgenreComponent } from './component/detailgenre/detailgenre.component';
import { GenreComponent } from './component/genre/genre.component';
import { SearchComponent } from './component/search/search.component';

const appRoutes: Routes = [
  // Tab
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'bookmarked', component: BookmarkComponent },
  // Panel
  { path: 'genre', component: GenreComponent },
  { path: 'completed', component: CompletedComponent },
  { path: 'random', component: RandomComponent },
  // Detail
  { path: 'genre/:id', component: DetailgenreComponent },
  { path: 'comic/:id', component: DetailcomicComponent },
  { path: 'comic/:id/chapter/:chapter', component: DetailchapterComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookmarkComponent,
    CompletedComponent,
    RandomComponent,
    DetailchapterComponent,
    DetailcomicComponent,
    DetailgenreComponent,
    GenreComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ChapterService,
    ComicService,
    CommentService,
    GenreService,
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
