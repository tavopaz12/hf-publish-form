import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../hf-publish-form.js';

let elem;
let elemRoot;

beforeEach(async () => {
  elem = await fixture(html`<hf-publish-form></hf-publish-form>`);
  elemRoot = elem.shadowRoot;
});

describe('When a user wants to create a post', () => {
  it('Then the fields title, description, price and images should be showln', () => {
    const title = elemRoot.querySelector('[data-testid="title"]');
    const description = elemRoot.querySelector('[data-testid="description"]');
    const price = elemRoot.querySelector('[data-testid="price"]');
    const image = elemRoot.querySelector('[data-testid="image"]');

    expect(title).to.not.equal(null);
    expect(description).to.not.equal(null);
    expect(price).to.not.equal(null);
    expect(image).to.not.equal(null);
  });

  it('Then the post should be created', async () => {
    const title = elemRoot.querySelector('[data-testid="title"]');
    const description = elemRoot.querySelector('[data-testid="description"]');
    const price = elemRoot.querySelector('[data-testid="price"]');
    const image = elemRoot.querySelector('[data-testid="image"]');
    const postContainer = elemRoot.querySelector(
      '[data-testid="postContainer"]'
    );
    const add = elemRoot.querySelector('[data-testid="add"]');

    title.value = 'publicacion 1';
    description.value = 'publicacion nueva subida';
    price.value = '23';
    image.value = '';

    add.click();
    await elem.updateComplete;

    expect(postContainer.textContent).to.contains('publicacion 1');
    expect(postContainer.textContent).to.contains('publicacion nueva subida');
    expect(postContainer.textContent).to.contains('23');
    expect(postContainer.textContent).to.contains('');
  });
});


describe('When a post is created ', () => {
  it('Then all the inputs should be cleared', async () => {
    const title = elemRoot.querySelector('[data-testid="title"]');
    const description = elemRoot.querySelector('[data-testid="description"]');
    const price = elemRoot.querySelector('[data-testid="price"]');
    const image = elemRoot.querySelector('[data-testid="image"]');

    const add = elemRoot.querySelector('[data-testid="add"]');

    title.value = 'publicacion 1';
    description.value = 'publicacion nueva subida';
    price.value = '23';
    image.value = '';

    add.click();
    await elem.updateComplete;

    expect(title.value).to.equal('');
    expect(description.value).to.equal('');
    expect(price.value).to.equal('');
    expect(image.value).to.equal('');
  });
});
