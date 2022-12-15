import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from './Loading';
import AllAlbuns from '../components/AllAlbuns';

class Search extends Component {
  componentDidMount() {

  }

  render() {
    const {
      handleChange,
      length,
      searchApi,
      name,
      loading,
      artistName,
      albuns } = this.props;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          {
            loading
              ? <Loading /> : (
                <div>
                  <input
                    type="text"
                    placeholder="Nome do Artista"
                    data-testid="search-artist-input"
                    onChange={ handleChange }
                    value={ name }
                  />
                  <button
                    type="button"
                    data-testid="search-artist-button"
                    disabled={ length < 2 }
                    onClick={ searchApi }
                  >
                    Pesquisar
                  </button>
                </div>)
          }
          {
            artistName ? (
              <h4>
                Resultado de álbuns de:
                {' '}
                {artistName}
              </h4>) : ''
          }
          <AllAlbuns albuns={ albuns } name={ artistName } />
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  handleChange: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
  searchApi: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  artistName: PropTypes.string.isRequired,
  albuns: PropTypes.arrayOf(PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  )).isRequired,
};

export default Search;
