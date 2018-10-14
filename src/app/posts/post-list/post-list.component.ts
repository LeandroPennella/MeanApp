import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../Post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;
  // [
  //   {title: 'title', content: 'content'},
  //   {title: 'title', content: 'content'},
  //   {title: 'title', content: 'content'}
  // ];
  constructor(public postService: PostsService) {}
  ngOnInit() {

    // this.posts =
    this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  onDelete (id: string) {
    this.postService.deletePost(id);
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
