/* eslint-disable arrow-body-style */
import { html, LitElement } from 'lit';

export class HfPublishForm extends LitElement {
  static get properties() {
    return {
      posts: { type: Array },
    };
  }

  constructor() {
    super();
    this.posts = [];
  }

  render() {
    return html`
      <form @submit=${this.onsubmit}>
        <input
          type="text"
          name="title"
          placeholder="TITULO"
          data-testid="title"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="DESCRIPCION"
          data-testid="description"
          required
        />
        <input
          type="text"
          name="price"
          placeholder="PRECIO"
          data-testid="price"
          required
        />
        <input type="file" name="image" data-testid="image"/>
        <button data-testid="add">Publicar</button>
      </form>
      <br />
      <h2>NUEVAS PUBLICACIONES</h2>
      <hr>
      <div data-testid="postContainer">
        ${this.posts.map(post => {
      return html`
            <div>
              <h3>${post.title}</h3>
              <p>${post.description}</p>
              ${post.image}
              <p>$${post.price}</p>
              <hr>
            </div>
          `;
    })}
      </div>
    `;
  }

  onsubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const image = data.get('image');

    const reader = new FileReader();
    reader.readAsDataURL(image);

    const urlImage = document.createElement('img');
    reader.onload = e => {
      urlImage.src = e.target.result;
      urlImage.width = 300;
      urlImage.alt = 'SIN IMAGEN';
      urlImage.id = 'imgPost'
    };

    const newPost = {
      title: data.get('title'),
      description: data.get('description'),
      price: data.get('price'),
      image: urlImage,
    };

    this.posts = [...this.posts, newPost];
    form.reset();
  }
}
