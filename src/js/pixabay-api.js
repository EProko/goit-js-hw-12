const API_KEY = '41755914-7aa1ef8e2afd56281fb8e3373';

export function getPhotos(userQuery) {
  return fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=${userQuery}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
