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
  const [isShowButton, setIsShowButton] = useState(false);  
  
  // Для варіанта з некерованою формою в Searchbar
  // const handleSubmit = evt => {
  //   evt.preventDefault();
  //   const inputForSearch = evt.target.elements.inputForSearch;
  //   if (inputForSearch.value.trim() === '') return;
    
  //   setIsLoading(true);
  //   setCurrentSearch(inputForSearch.value.trim());
  //   setPage(1);
  //   evt.target.elements.inputForSearch.value = "";
  // };

  // Для варіанта з керованою формою в Searchbar
  const handleSubmit = inputForSearch => {
    if (inputForSearch.trim() === '') return;
    
    setIsLoading(true);
    setCurrentSearch(inputForSearch.trim());
    setPage(1);
  };

  const handleClickMore = () => {
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
    if (currentSearch === '' || !isLoading) return;

    (async () => {
      const response= await fetchImages(currentSearch, page);
      if (page > 1) {
        setImages([...images, ...response.result]);
      } else {
        setImages(response.result);
      };
      
      setIsShowButton(Math.ceil(response.totalHits / response.PER_PAGE) > page);
      setIsLoading(false);
    })();
  });

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
          {isShowButton ? <Button onClick={handleClickMore} /> : null}
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
