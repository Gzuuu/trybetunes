import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Albuns from './Albuns';

class AllAlbuns extends Component {
  render() {
    const { albuns, name } = this.props;
    const allAlbuns = albuns.map((album) => {
      const { artworkUrl100, collectionName, collectionId } = album;
      return (
        <Albuns
          name={ name }
          image={ artworkUrl100 }
          alt={ collectionName }
          key={ collectionId }
          link={ collectionId }
        />
      );
    });
    return (
      <div>
        {albuns.length < 1 ? <h3>Nenhum álbum foi encontrado</h3> : allAlbuns}
      </div>
    );
  }
}

AllAlbuns.propTypes = {
  albuns: PropTypes.arrayOf(PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  )).isRequired,
  name: PropTypes.string.isRequired,
};

export default AllAlbuns;
