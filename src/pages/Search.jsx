import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Search extends Component {
  render() {
    const { handleChange, length } = this.props;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            placeholder="Nome do Artista"
            data-testid="search-artist-input"
            onChange={ handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ length < 2 }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  handleChange: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
};

export default Search;
