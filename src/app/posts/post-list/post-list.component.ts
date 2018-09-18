import { Component, Input } from '@angular/core';
import { Post } from '../Post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent {
  @Input() posts: Post[] = [];
  // [
  //   {title: 'title', content: 'content'},
  //   {title: 'title', content: 'content'},
  //   {title: 'title', content: 'content'}
  // ];

  constructor(public postService: PostsService) {}

}
