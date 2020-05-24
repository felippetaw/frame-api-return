import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { AppService } from '../services/app.service';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: any;
  private readonly destroy$ = new Subject()

  constructor(private service: AppService) { }

  ngOnInit() {
    const getPostsFromService$ = this.service.getPosts().pipe(map(dataReturn => {
      this.posts = dataReturn;
    }));

    getPostsFromService$.pipe(takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
