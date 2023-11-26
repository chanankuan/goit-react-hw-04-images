import { AnimatePresence } from 'framer-motion';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { getImages } from 'api/Images';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Buton/Button';
import Loader from 'components/Loader/Loader';
import NoResult from 'components/NoResults/NoResults';
import Modal from 'components/Modal/Modal';
import { useCallback, useEffect, useState } from 'react';

const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [modalImageTags, setModalImageTags] = useState('');

  const handleSearch = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await getImages(query, page);
      if (data.totalHits === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      if (page === 1) {
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }

      setImages(prevImages => [...prevImages, ...data.hits]);
      setLoadMore(page < Math.ceil(data.totalHits / 12));
    } catch (error) {
      Notify.failure(error);
    } finally {
      setIsLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [handleSearch, query, page]);

  const onSubmit = searchQuery => {
    if (query === searchQuery) {
      return;
    }

    setQuery(searchQuery);
    setImages([]);
    setPage(1);
    setIsLoading(false);
    setLoadMore(false);
    setShowModal(false);
    setModalImageUrl('');
    setModalImageTags('');
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (url, tags) => {
    setShowModal(true);
    setModalImageUrl(url);
    setModalImageTags(tags);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />

      {images?.length > 0 && (
        <ImageGallery images={images} onOpenModal={openModal} />
      )}

      {loadMore && <Button onLoadMore={onLoadMore}>Load more</Button>}

      {images?.length === 0 && query && !isLoading && <NoResult />}
      {isLoading && <Loader />}

      <AnimatePresence>
        {showModal && (
          <Modal
            imageUrl={modalImageUrl}
            tags={modalImageTags}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
