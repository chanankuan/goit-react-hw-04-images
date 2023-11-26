import { useState } from 'react';
import styles from './Searchbar.module.scss';

const Searchbar = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleChange = event => {
    setInput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    onSubmit(input);
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles['SearchForm-button']}>
          <span className={styles['SearchForm-button-label']}>Search</span>
        </button>

        <input
          className={styles['SearchForm-input']}
          name="input"
          type="text"
          autoComplete="off"
          value={input}
          onChange={handleChange}
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
