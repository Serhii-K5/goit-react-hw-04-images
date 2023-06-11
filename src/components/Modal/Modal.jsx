import css from './Modal.module.css';
import propTypes from 'prop-types';

// Варіант з некерованою формою без слухача на "keydown"
// export const Modal = ({ src, alt, handleClose }) => (
//   <div className={css.Overlay} onClick={handleClose}>
//     <div className={css.Modal}>
//       <img src={src} alt={alt} />
//     </div>
//   </div>
// );

// Варіант з керованою формою + слухач на "keydown"
import { useEffect } from "react";
export const Modal = ({ src, alt, handleClose }) => {  

  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={css.Overlay} onClick={handleClose}>
      <div className={css.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  )
};

Modal.propTypes = {
  src: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  handleClose: propTypes.func.isRequired,
};
