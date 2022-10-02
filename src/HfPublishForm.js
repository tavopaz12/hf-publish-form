/* eslint-disable arrow-body-style */
import { css, html, LitElement } from 'lit';

export class HfPublishForm extends LitElement {
  static get properties() {
    return {
      posts: { type: Array },
    };
  }

  static get styles() {
    return css`
      form {
        text-align: center;
        align-items: center;
      }
      form textarea,
      input {
        font-size: 14px;
        font-family: Arial;
        padding: 5px;
      }
      h2,
      h1 {
        text-align: center;
      }
      .postContainer {
        text-align: center;
      }
      hr {
        text-align: center;
        width: 420px;
      }
      .post {
        background-color: #2590eb;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        padding: 7px 8px;
        width: 25vh;
        color: white;
      }
      .wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .file-upload {
        height: 30px;
        width: 25vh;
        border-radius: 10px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        overflow: hidden;
        background-color: #2590eb;
        background-size: 100% 200%;
        color: white;
      }

      input[type='file'] {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        cursor: pointer;
      }
    `;
  }

  constructor() {
    super();
    this.posts = [];
  }

  render() {
    return html`
      <h1>Crear un nuevo post</h1>
      <form @submit=${this.onsubmit}>
        <input
          style="width: 270px;"
          type="text"
          name="title"
          placeholder="TITULO"
          data-testid="title"
          required
        />
        <input
          style="width: 70px;"
          type="number"
          name="price"
          placeholder="PRECIO"
          data-testid="price"
          required
        />
        <pre></pre>
        <textarea
          rows="10"
          cols="49"
          type="text"
          name="description"
          placeholder="DESCRIPCION"
          data-testid="description"
          required
        ></textarea>
        <pre></pre>

        <div class="wrapper">
          <div class="file-upload">
            <p>Subir imagen</p>
            <input
              type="file"
              name="image"
              @change=${this.changeImage}
              data-testid="image"
              class="btn-file"
              multiple="2"
            />
          </div>

          <button data-testid="add" class="post">Publicar</button>
        </div>
      </form>
      <br />
      <h2>NUEVAS PUBLICACIONES</h2>
      <hr />
      <div data-testid="postContainer" class="postContainer">
        ${this.posts.map(post => {
          return html`
            <div>
              <h3>${post.title}</h3>
              <p>${post.description}</p>
              <img
                src=${post.urlImage}
                alt="Error al cargar el contenido"
                width="300vh"
              />
              <p>$${post.price}</p>
              <hr />
            </div>
          `;
        })}
      </div>
    `;
  }

  changeImage(e) {
    const input = e.target;
    const file = input.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = evt => {
      this.currentImage = evt.target.result;
    };
  }

  onsubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const image = this.currentImage;

    const newPost = {
      title: data.get('title'),
      description: data.get('description'),
      price: data.get('price'),
      urlImage: image,
    };

    this.posts = [...this.posts, newPost];
    form.reset();
  }
}
