import { Component, EventEmitter, Output} from '@angular/core';
import { Post } from '../Post.model';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']

})
export class PostCreateComponent {
  textoIngresado = '';
  tituloIngresado = '';
  @Output() postCreated = new EventEmitter<Post>();

  onAddPost(postInput: HTMLTextAreaElement) {
    // console.dir(postInput);

    // this.newPost = this.textoIngresado;
    const post: Post = {titulo: this.tituloIngresado, texto: this.textoIngresado};
    this.postCreated.emit(post);

  }
}
