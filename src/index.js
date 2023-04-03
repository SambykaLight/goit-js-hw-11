import './sass/index.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { onRenderGallery } from './js/renderGallery';
import Notiflix from 'notiflix';
import { fetchImages } from './js/fetchImages';

const searchBtn = document.querySelector('.search_box');
const loadMore = document.querySelector('.load-more');
const galleryContainer = document.querySelector('.gallery');

searchBtn.addEventListener('submit', onSearch);
loadMore.addEventListener('click', onLoadMore);

let searchQuery = '';
let page = 1;
const perPage = 40;
loadMore.classList.add('is-hidden');

async function onSearch(e) {
  e.preventDefault();
  page = 1;

  searchQuery = e.currentTarget.elements.searchQuery.value.trim();
  const { hits, totalHits, total } = await fetchImages(
    searchQuery,
    page,
    perPage
  );

  if (searchQuery === '' || totalHits === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    cleanContainer();
    loadMore.classList.add('is-hidden');
    return;
  } else if (hits.length < 40) {
    loadMore.classList.add('is-hidden');
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  } else {
    loadMore.classList.remove('is-hidden');

    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    cleanContainer();
    const galleryRender = onRenderGallery(hits);
    galleryContainer.insertAdjacentHTML('beforeend', galleryRender);
  }
}

function cleanContainer() {
  galleryContainer.innerHTML = '';
}

async function onLoadMore(e) {
  page += 1;
  searchQuery = searchBtn.searchQuery.value.trim();
  const { hits, totalHits, total } = await fetchImages(
    searchQuery,
    page,
    perPage
  );
  if (page > totalHits / perPage) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    loadMore.classList.add('is-hidden');
    return;
  }
  const galleryRenderImg = onRenderGallery(hits);
  galleryContainer.insertAdjacentHTML('beforeend', galleryRenderImg);
}
