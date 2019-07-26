import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
              imagen: null, // resolver
              imagenPath: post.imagenPath
            };
          });
        }
      ))
      .subscribe((parsedPosts) => {

        this.posts = parsedPosts;
        this.postsUpdated.next([...this.posts]);
        // console.log('svc > posts cargados en local');
      });

  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.httpClient.
      get<{message: string, post: Post}>('http://localhost:3000/api/posts/' + id);
      /*.pipe(
        map((responseData) => {
          console.log('svc > ' + responseData.message);
          return {
            titulo: responseData.post.titulo,
            contenido: responseData.post.contenido,
            id: responseData.post._id,
            imagen: null, // TODO: resolverpostData
            imagenPath: responseData.post.imagenPath
          };
        }));
        */
        /*
      .subscribe((parsedPost) => {
        return {...this.posts.find(p => p.id === id)};
      });
*/
  }

  addPost(addedPost: Post) {
    const postData = new FormData();
    postData.append('titulo', addedPost.titulo);
    postData.append('contenido', addedPost.contenido);
    postData.append('imagen', addedPost.imagen, addedPost.titulo);
    this.httpClient
      .post<{message: string, post: Post}>('http://localhost:3000/api/posts', postData)
      .subscribe((responseData) => {
        console.log('svc >' + responseData.message);
        addedPost.id = responseData.post.id;
        this.posts.push ({

          // todo: ... addedPost
/*
          id: addedPost.id,
          titulo: addedPost.titulo,
          contenido: addedPost.contenido,
          imagen: null, // addedPost.imagen,
          */
          ...addedPost,
          imagenPath: responseData.post.imagenPath
        });
        this.postsUpdated.next([...this.posts]);
        console.log('svc > post ' + addedPost.id + ' agregado a local');
        this.router.navigate(['/']);
      });
  }

  updatePost(post: Post) {
    console.log('svc > update');
    let postData: Post | FormData;
    if (typeof(post.imagen)==='object') {
      console.log('svc > update > file');
      const postData = new FormData();
      postData.append('titulo', post.titulo);
      postData.append('contenido', post.contenido);
      console.log('svc > update > append 3 > post.imagen' + post.imagen);
      console.log('svc > update > append 3 > post.imagenPath' + post.imagenPath);
      postData.append('imagen', post.imagen, post.titulo);
    } else {
      console.log('svc > update > filePath');
      const postData: Post = {
        id: post.id,
        titulo: post.titulo,
        contenido: post.contenido,
        imagen: null,
        imagenPath: post.imagenPath
      };
    }
    console.log('svc > update > put');
    this.httpClient
    .put<{message: string}>('http://localhost:3000/api/posts/' + post.id, postData)
    .subscribe ( (responseData) => {
      console.log('svc > ' + responseData.message);
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
      const postOut: Post = {
        id: post.id,
        titulo: post.titulo,
        contenido: post.contenido,
        imagen: null,
        imagenPath: '' // postData.imagenPath
      };
      updatedPosts[oldPostIndex] = postOut;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);
      console.log('svc > update > fin');
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
