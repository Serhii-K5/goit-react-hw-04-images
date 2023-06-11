import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from './api/fetchImages';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import cssApp from './App.module.css'
import cssLoader from './Loader/Loader.module.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSearch, setCurrentSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  
  const handleSubmit = async evt => {
    evt.preventDefault();
    const inputForSearch = evt.target.elements.inputForSearch;
    if (inputForSearch.value.trim() === '') return;
    
    setIsLoading(true);
    setCurrentSearch(inputForSearch.value);
    setPage(1);
    evt.target.elements.inputForSearch.value = "";
  };

  const handleClickMore = async () => {
    setIsLoading(true);
    setPage(page + 1);
  };

  const handleImageClick = evt => {
    setIsModalOpen(true);
    setModalImg(evt.target.name);
    setModalAlt(evt.target.alt);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalImg('');
    setModalAlt('');
  };

  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        handleModalClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (currentSearch.trim() === '' || !isLoading) return;
    (async () => {
      const response = await fetchImages(currentSearch, page);
      if (page > 1) {
        setImages([...images, ...response]);
      } else {
        setImages(response);
      };
      setIsLoading(false);
    })();
  });

  useEffect(() => {
    return () => localStorage.removeItem('totalHits');
  }, []);

  return (
    <div className={cssApp.App}>
      {isLoading ? (
        <div className={cssLoader.loader}>
          <Loader />
        </div>
      ) : (
        <React.Fragment>
          <Searchbar onSubmit={handleSubmit} />
          <ImageGallery
            onImageClick={handleImageClick}
            images={images}
          />
          {images.length > 0 &&
              Math.ceil(localStorage.getItem('totalHits') / 12) > page ? (
            <Button onClick={handleClickMore} />
          ) : null} 
            {/* <p>Сторінка {this.state.page} з {Math.ceil(localStorage.getItem('totalHits') / 12)} </p> */}
        </React.Fragment>
      )}
      {isModalOpen ? (
        <Modal
          src={modalImg}
          alt={modalAlt}
          handleClose={handleModalClose}
        />
      ) : null}
    </div>
  );
}
