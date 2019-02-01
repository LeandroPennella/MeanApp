import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private httpClient: HttpClient, private router: Router) {}
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
              id: post._id,
              imagen: null // resolver
            };
          });
        }
      ))
      .subscribe((parsedPosts) => {

        this.posts = parsedPosts;
        this.postsUpdated.next([...this.posts]);
        //console.log('svc > posts cargados en local');
      });

  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.httpClient.
      get<{message: string, post: any}>('http://localhost:3000/api/posts/' + id)
      .pipe(
        map((responseData) => {
          console.log('svc > ' + responseData.message);
          return {
            titulo: responseData.post.titulo,
            contenido: responseData.post.contenido,
            id: responseData.post._id,
            imagen: null, //TODO: resolverpostData
            imagePath: null
          };
        }));
        /*
      .subscribe((parsedPost) => {
        return {...this.posts.find(p => p.id === id)};
      });
*/
  }

  addPost(post: Post) {
    const postData = new FormData();
    postData.append('titulo', post.titulo);
    postData.append('contenido', post.contenido);
    postData.append('imagen', post.imagen, post.titulo);
    this.httpClient
      .post<{message: string, id: string}>('http://localhost:3000/api/posts', postData)
      .subscribe((responseData) => {
        console.log('svc >' + responseData.message);
        post.id = responseData.id;
        this.posts.push ({
          id: post.id,
          titulo: post.titulo,
          contenido: post.contenido,
          imagen: post.imagen,
          imagePath: null});
        this.postsUpdated.next([...this.posts]);
        console.log('svc > post ' + post.id + ' agregado a local');
        this.router.navigate(['/']);
      });
  }

  updatePost(post: Post) {
    this.httpClient
    .put<{message: string}>('http://localhost:3000/api/posts/' + post.id, post)
    .subscribe ( (responseData) => {
      console.log('svc > ' + responseData.message);
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);
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
