import propTypes from 'prop-types';
import css from './Searchbar.module.css';

// Варіант з некерованою формою
// export const Searchbar = ({ onSubmit }) => (
//   <header className={css.Searchbar}>
//     <form className={css.SearchForm} onSubmit={onSubmit}>

//       <input
//         name="inputForSearch"
//         className={css.SearchFormInput}
//         type="text"
//         autoComplete="off"
//         autoFocus
//         placeholder="Enter data to search"
//       />

//       <button type="submit" className={css.SearchFormButton}>
//         <span className={css.SearchFormButtonLabel}>Search</span>
//       </button>
//     </form>
//   </header>
// );


// Варіант з керованою формою
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = evt => {
    setQuery(evt.currentTarget.value.toLowerCase().trim());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (query === '') return;

    onSubmit(query);
  };

  return (
    <header className={css.Searchbar}>
      {/* <form className={css.SearchForm} onSubmit={onSubmit}>  /*для некерованої форми  */}
      <form className={css.SearchForm} onSubmit={handleSubmit}>        

        <input
          name="inputForSearch"
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Enter data to search"
          onChange={handleChange}
        />

        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: propTypes.func,
};