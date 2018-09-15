import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent {
  @Input() posts = [];
  // [
  //   {title: 'title', content: 'content'},
  //   {title: 'title', content: 'content'},
  //   {title: 'title', content: 'content'}
  // ];
}
