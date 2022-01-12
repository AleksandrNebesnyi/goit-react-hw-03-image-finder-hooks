import { useEffect, useState } from 'react';
import Container from './component/Container/Container';
import { ToastContainer } from 'react-toastify';
import Searchbar from './component/Searchbar/Searchbar';
import fetchPixabayImages from './api/pixabay-api.jsx';
import ImageGallery from './component/ImageGallery/ImageGalery';
import Modal from './component/Modal/Modal';
import Loader from './component/Loader/Loader';
import Button from './component/Button/Button';
import ErrorMessage from './component/ErrorMessage/ErrorMasage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState('1');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [status, setStatus] = useState(Status.IDLE);
  console.log(currentPage);
  console.log(searchQuery);

  // Запрос за картинками при обновлении инпута
  useEffect(() => {
    if (!searchQuery) return;

    const getImages = async () => {
      setStatus(Status.PENDING);
      console.log(searchQuery);
      try {
        const hits = await fetchPixabayImages(searchQuery, currentPage).then(
          data => data.hits,
        );

        if (hits.length === 0) {
          toast.info('Введите валидний запрос');
        }

        setImages(prevState => [...prevState, ...hits]);

        setStatus(Status.RESOLVED);

        if (currentPage !== 1) {
          scrollOnLoadButton();
        }
      } catch (error) {
        setError(error);
        setStatus(Status.REJECTED);
      } finally {
        setStatus(Status.IDLE);
      }
    };
    getImages();
  }, [searchQuery, currentPage]);

  // Принимаем с формы запрос и пишем в стейт + сбрасываем после отправки значения из стейта
  const handleOnSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setCurrentPage(1);
    setError(null);
  };

  // при клике на кнопку Load More увеличиваем страницу.
  const handleLoadMore = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  //  Скролл при клике на кнопку
  const scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  // Получаем дату из фетча

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
    setLargeImage('');
  };

  // Получает полное изображение, пишет его в стейт и открывает модалку
  const handleGalleryItem = fullImageUrl => {
    setLargeImage(fullImageUrl);
    setShowModal(true);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleOnSubmit} />
      <ImageGallery images={images} onImageClick={handleGalleryItem} />
      {status !== 'pending' && images.length >= 12 && (
        <Button onClick={handleLoadMore} />
      )}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt="" className="Modal-image" />
        </Modal>
      )}
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <ErrorMessage message={error.message} />}
      <ToastContainer autoClose={3000} />
    </Container>
  );
};

export default App;
