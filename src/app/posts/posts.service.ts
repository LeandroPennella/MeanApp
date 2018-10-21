import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) {}
  getPosts() {
    // return [...this.posts]; // genera una copia de posts (sino devolveria la referencia)

    this.httpClient
      .get<{message: string, posts: any}>('http://localhost:3000/api/posts')
      .pipe(
        map((responseData) => {
          console.log('svc > ' + responseData.message);
          return responseData.posts.map(post => {
            return {
              titulo: post.titulo,
              contenido: post.contenido,
              id: post._id
            };
          });
        }
      ))
      .subscribe((parsedPosts) => {

        this.posts = parsedPosts;
        this.postsUpdated.next([...this.posts]);
        console.log('svc > posts cargados en local');
      });

  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
      return {...this.posts.find(p => p.id === id)};
  }

  addPost(post: Post) {
    this.httpClient
      .post<{message: string, id: string}>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        console.log('svc >' + responseData.message);
        post.id = responseData.id;
        this.posts.push (post);
        this.postsUpdated.next([...this.posts]);
        console.log('svc > post ' + post.id + ' agregado a local');
      });
  }

  updatePost(post: Post) {
    this.httpClient
    .put<{message: string}>('http://localhost:3000/api/posts/' + post.id, post)
    .subscribe ( (responseData) => {
      console.log('svc > ' + responseData.message);
    });
  }

  deletePost(id: string) {
    this.httpClient
    .delete('http://localhost:3000/api/posts/' + id)
    .subscribe((responseData) => {
      console.log('svc > ' + responseData);
      const updatedPosts = this.posts.filter(post => post.id !== id);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
      console.log('svc > post ' + id + ' deleted from local');

    });
  }
}
