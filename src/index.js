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
// kcnkdjnv
let searchQuery = '';
let page = 1;
const perPage = 30;
loadMore.classList.add('is-hidden');

async function onSearch(e) {
  e.preventDefault();

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
    return;
  }
  loadMore.classList.remove('is-hidden');

  page = 1;
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  cleanContainer();
  const galleryRender = onRenderGallery(hits);
  galleryContainer.insertAdjacentHTML('beforeend', galleryRender);
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
  const galleryRenderImg = onRenderGallery(hits);
  galleryContainer.insertAdjacentHTML('beforeend', galleryRenderImg);
}
