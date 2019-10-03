import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
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
  isLoading = false;
  // [
  //   {title: 'title', content: 'content'},
  //   {title: 'title', content: 'content'},
  //   {title: 'title', content: 'content'}
  // ];
  
  // paginator

  totalPosts = 10;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(public postService: PostsService) {}
  ngOnInit() {
    this.isLoading = true;
    // this.posts =
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    console.log(pageData);
  }

  onDelete (id: string) {
    this.postService.deletePost(id);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
