import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImg } from './js/pixabay-api';
import { renderImg } from './js/render-functions';

const containerRef = document.querySelector('.container');
const formRef = document.querySelector('.form');
const galRef = document.querySelector('.gallery');

formRef.addEventListener('submit', onSubmit);

function onSubmit(ev) {
  ev.preventDefault();

  loaderOn();

  galRef.innerHTML = '';

  const API_KEY = '42059071-0978dc0d7158b742eee7c30f5';
  const BASE_URL = 'https://pixabay.com/api/';
  const query = formRef.elements.input.value;
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true,`;

  fetch(url)
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    })
    .then(data => {
      if (data.hits.length === 0 || query === '') {
        iziToast.error({
          title: '',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'bottomLeft',
          maxWidth: 360,
        });
        formRef.reset();
      } else {
        const markup = data.hits
          .map(
            ({
              webformatURL,
              largeImageURL,
              tags,
              likes,
              views,
              comments,
              downloads,
            }) => {
              return `<a class="gallery-link "href="${largeImageURL}"
          ><li>
            <img class="gallery-item "src="${webformatURL}" alt="${tags}" />
            <p>Likes: ${likes}</p>
            <p>Views: ${views}</p>
            <p>Comments: ${comments}</p>
            <p>Downloads: ${downloads}</p></li
        ></a>`;
            }
          )
          .join('');
        galRef.insertAdjacentHTML('beforeend', markup);

        lightbox.refresh();
        formRef.reset();
      }
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      loaderOff();
    });
}

function loaderOn() {
  const loader = document.createElement('span');
  loader.classList.add('loader');
  containerRef.append(loader);
}
function loaderOff() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.remove();
  }
}
const options = {
  captions: true,
  captionSelector: 'img',
  captionsData: 'alt',
  captionPosition: 'bottom',
  animation: 250,
};
const lightbox = new SimpleLightbox('.gallery a', options);
lightbox.on('show.simplelightbox');
