import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNamePokemons } from '../../actions/index';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  function handleInputChange(e) {
    setName(e.target.value);
    console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(getNamePokemons(name));
  }

  return (
    <form>
      <input
        className={styles.searchinput}
        type="text"
        placeholder="Pokemon's name..."
        onChange={handleInputChange}
      />
      <button
        className={styles.searchbtn}
        type="button"
        onClick={handleSubmit}
      >
        Search
      </button>
    </form>
  );
}