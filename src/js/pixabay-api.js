import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const API_KEY = '41755914-7aa1ef8e2afd56281fb8e3373';

export async function getPhotos(userQuery, page) {
  const response = await axios.get(
    `/?key=${API_KEY}&q=${userQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`
  );
  return response;
}

export async function loadMorePhotos(query, page) {
  const response = await axios.get(
    `/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`
  );
  return response;
}
