import axios from 'axios';
export { fetchImages };

const baseURL = 'https://pixabay.com/api/';
const KEY = '34696106-88b2027f4b58668cbaef654c9';

async function fetchImages(query, page, perPage) {
  const { data } = await axios.get(
    `${baseURL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return data;
}
