import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getPhotos } from './js/pixabay-api';
import { loadMorePhotos } from './js/pixabay-api';
import { renderPhoto } from './js/render-functions';

const searchForm = document.querySelector('.search-form');
const loaderElement = document.querySelector('.loader');
const imagesList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('[data-action ="load-more"]');
const lightboxInstance = new SimpleLightbox('.gallery .gallery-link', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
});

hideLoadBtn();
hideLoader();

searchForm.addEventListener('submit', handleSubmit);

let imagesArray = [];
let query;
let page = 1;
const totalPages = 500 / 15;

function handleSubmit(event) {
  event.preventDefault();
  showLoader();
  imagesList.innerHTML = '';

  const userQuery = encodeURIComponent(event.target.elements['search'].value);
  query = userQuery;

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
    return;
  }

  getPhotos(userQuery, page)
    .then(response => {
      if (response.data.total === 0) {
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
        hideLoadBtn();
        hideLoader();
      } else {
        imgArray(response);
        searchForm.reset();
      }
    })
    .catch(error => {
      console.log(error);
      hideLoader();
    });
}

loadMoreBtn.addEventListener('click', renderMorePhoto);

async function renderMorePhoto() {
  if (page > totalPages) {
    hideLoadBtn();
    return iziToast.info({
      position: 'topRight',
      message: "We're sorry, but you've reached the end of search results.",
    });
  }

  hideLoadBtn();
  showLoader();

  page++;
  await loadMorePhotos(query, page).then(response => {
    imgArray(response);
  });

  const heightCard = document.querySelector('.gallery-card');
  const rect = heightCard.getBoundingClientRect();
  const options = {
    top: rect.height * 2,
    behavior: 'smooth',
  };
  window.scrollBy(options);
}

function imgArray(response) {
  const hitsArray = response.data.hits;

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
  renderPhoto(imagesArray, imagesList);
  lightboxInstance.refresh();
  hideLoader();
  showLoadBtn();
}

function showLoader() {
  loaderElement.style.display = 'block';
}
function hideLoader() {
  loaderElement.style.display = 'none';
}
function hideLoadBtn() {
  loadMoreBtn.classList.add('is-hidden');
}
function showLoadBtn() {
  loadMoreBtn.classList.remove('is-hidden');
}
