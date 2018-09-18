import { Post } from './post.model';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];

  getPosts() {
    return [...this.posts]; // genera una copia de posts (sino devolveria la referencia)
  }

  addPost(post) {
    this.posts.push (post);
  }
}
