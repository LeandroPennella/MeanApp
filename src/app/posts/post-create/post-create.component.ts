import { Component, /*, EventEmitter, Output*/
OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = 'create';
  private postId: string;


  // @Output() postCreated = new EventEmitter<Post>();

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}
  ngOnInit() {
    this.form = new FormGroup({
      'tituloIngresado': new FormControl(
        null, {validators: [Validators.required, Validators.minLength(3)]}
      ),
      'textoIngresado': new FormControl(
        null, {validators: [Validators.required]}
      ),
      'imagenSubida': new FormControl(
        null, {validators: [Validators.required]}
      )
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.postId = paramMap.get('id');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe((postData) => {
          this.isLoading = false;
          this.post = postData;
          this.form.setValue({
            'tituloIngresado': this.post.titulo,
            'textoIngresado': this.post.contenido
          });
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

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({imagenSubida: file});
    this.form.get('imagenSubida').updateValueAndValidity();
    console.log(file);
    console.log(this.form);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(file);
  }
  onSavePost() {
    // console.dir(postInput);

    // this.newPost = this.textoIngresado;
    if (this.form.invalid) {
      return;
    }


  this.isLoading = true;
  if (this.mode === 'create') {
    // this.postCreated.emit(post);
    this.postsService.addPost({
        id: null,
        titulo: this.form.value.tituloIngresado,
        contenido: this.form.value.textoIngresado
      });
    } else {
      this.postsService.updatePost({
        id: this.postId,
        titulo: this.form.value.tituloIngresado,
        contenido: this.form.value.textoIngresado
      });
    }
    this.form.reset();
    // TODO: redireccion aca en lugar de en servicio?
  }
}
