import { Component, /*, EventEmitter, Output*/
OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../Post.model';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']

})
export class PostCreateComponent implements OnInit{
  textoIngresado = '';
  tituloIngresado = '';
  post: Post;             //es publico porque tiene que verse desde el html?

  private mode = 'create';
  private postId: string;


  // @Output() postCreated = new EventEmitter<Post>();

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')){
        this.mode = 'edit';
        this.postId = paramMap.get('id');
        // this.post = this.postsService.getPost(this.postId);
        this.postsService.getPost(this.postId).subscribe((postData) => {
          this.post = postData;
        });
      } else {
        this.mode = 'create';
        this.postId = null;
        this.post =     {
          id: null,
          titulo: null,
          contenido: null
        };
      }
    });
  }
  onSavePost(form: NgForm) {
    // console.dir(postInput);

    // this.newPost = this.textoIngresado;
    if (form.invalid) {
      return;
    }
    /*
    const post: Post = {
      id: null,
      titulo: form.value.tituloIngresado,
      contenido: form.value.textoIngresado
    };
*/
  if (this.mode === 'create') {
    // this.postCreated.emit(post);
    this.postsService.addPost({
        id: null,
        titulo: form.value.tituloIngresado,
        contenido: form.value.textoIngresado
      });
    } else {
      this.postsService.updatePost({
        id: this.postId,
        titulo: form.value.tituloIngresado,
        contenido: form.value.textoIngresado
      });
    }
    form.resetForm();

  }
}
