import { imagesList } from '../main';
import { lightboxInstance } from '../main';

export function renderPhoto(imagesArray) {
  const imgElements = imagesArray
    .map(image => {
      return `<li class="gallery-card"><a class="gallery-link" href="${image.href}"><img class="gallery-image" src="${image.src}" alt="${image.alt}" /><div class="image-stats-card"><div class="image-stats-block"><p>Likes</p>${image.likes}</div><div class="image-stats-block"><p>Views</p>${image.views}</div><div class="image-stats-block"><p>Comments</p>${image.comments}</div><div class="image-stats-block"><p>Downloads</p>${image.downloads}</div></div></a></li>`;
    })
    .join('');
  imagesList.insertAdjacentHTML('beforeend', imgElements);
  lightboxInstance.refresh();
}
