import { Component /*, EventEmitter, Output*/} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../Post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']

})
export class PostCreateComponent {
  textoIngresado = '';
  tituloIngresado = '';
  // @Output() postCreated = new EventEmitter<Post>();

  constructor(public postsService: PostsService) {}

  onAddPost(form: NgForm) {
    // console.dir(postInput);

    // this.newPost = this.textoIngresado;
    if (form.invalid) {
      return;
    }
    const post: Post = {
      titulo: form.value.tituloIngresado,
      texto: form.value.textoIngresado
    };

    // this.postCreated.emit(post);
    this.postsService.addPost(post);

  }
}
