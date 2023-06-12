import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api`;
const API_KEY = '35066841-52545c4d4852ad26238ef3ed2';
const PER_PAGE = 12;

export const fetchImages = async (searchText, page) => {
  const response = await axios.get(`/?key=${API_KEY}&q=${searchText}&page=${page}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`);
  
  const totalHits = response.data.totalHits;
  const result =  response.data.hits.map(image => {
    return {
      id: image.id,
      webformatURL: image.webformatURL,
      largeImageURL: image.largeImageURL,
      tags: image.tags,
    };
  });
  
  return ({result, totalHits, PER_PAGE});
};