import { Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']

})
export class PostCreateComponent {
  textoIngresado = '';
  tituloIngresado = '';
  // newPost = 'nada';
  onAddPost(postInput: HTMLTextAreaElement) {
    // console.dir(postInput);
    // this.newPost = this.textoIngresado;
    const post = {title: 'Ingresar Titulo', texto: 'Ingresar Texto'};
  }
}
