import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getPhotos } from './js/pixabay-api';
import { renderPhoto } from './js/render-functions';

const searchForm = document.querySelector('.search-form');
const loaderElement = document.querySelector('.loader');
export const imagesList = document.querySelector('.gallery');
export const lightboxInstance = new SimpleLightbox('.gallery .gallery-link', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
});

hideLoader();
searchForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  showLoader();
  imagesList.innerHTML = '';

  let imagesArray = [];

  const userQuery = encodeURIComponent(event.target.elements['search'].value);

  getPhotos(userQuery)
    .then(data => {
      if (userQuery === '') {
        iziToast.error({
          message: 'Please enter your search query!',
          messageColor: '#FFF',
          messageSize: '16',
          backgroundColor: '#EF4040',
          position: 'topRight',
          icon: 'ico-error',
          iconColor: '#FFF',
        });
        hideLoader();
      } else if (data.total === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please, try again!',
          messageColor: '#FFF',
          messageSize: '16',
          backgroundColor: '#EF4040',
          position: 'topRight',
          icon: 'ico-error',
          iconColor: '#FFF',
        });
        hideLoader();
      } else {
        const hitsArray = data.hits;

        imagesArray = hitsArray.map(Object => {
          return {
            href: Object.largeImageURL,
            src: Object.webformatURL,
            alt: Object.tags,
            likes: Object.likes,
            views: Object.views,
            comments: Object.comments,
            downloads: Object.downloads,
          };
        });
        renderPhoto(imagesArray);
        hideLoader();
        searchForm.reset();
      }
    })
    .catch(error => {
      console.log(error);
      hideLoader();
    });
}

function showLoader() {
  loaderElement.style.display = 'block';
}
function hideLoader() {
  loaderElement.style.display = 'none';
}
