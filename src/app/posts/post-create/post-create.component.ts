import { Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']

})
export class PostCreateComponent {
  textoIngresado = '';
  tituloIngresado = '';
  @Output() postCreated = new EventEmitter();

  onAddPost(postInput: HTMLTextAreaElement) {
    // console.dir(postInput);
    // this.newPost = this.textoIngresado;
    const post = {titulo: this.tituloIngresado, texto: this.textoIngresado};
    this.postCreated.emit(post);
  }
}
