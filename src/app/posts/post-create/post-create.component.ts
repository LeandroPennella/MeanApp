import { Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']

})
export class PostCreateComponent {
  valorIngresado = '';
  newPost = 'nada';
  onAddPost(postInput: HTMLTextAreaElement) {
    //console.dir(postInput);
    this.newPost = this.valorIngresado;
  }
}
