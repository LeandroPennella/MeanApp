import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) {}
  getPosts() {
    // return [...this.posts]; // genera una copia de posts (sino devolveria la referencia)

    this.httpClient.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });

  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(post) {
    this.httpClient.post<{message: string}>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.posts.push (post);
        this.postsUpdated.next([...this.posts]);
      });

  }
}
