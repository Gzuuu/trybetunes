import PropTypes from 'prop-types';
import React, { Component } from 'react';

class MusicCard extends Component {
  state = {
    favorite: false,
  };

  saveChecked = ({ target }) => {
    const { checked } = target;
    this.setState(() => ({
      favorite: checked,
    }));
  };

  render() {
    const { property, save, isFavorite } = this.props;
    const { trackName, previewUrl, trackId } = property;
    const { favorite } = this.state;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          {' '}
          Favorita
          <input
            type="checkbox"
            id={ trackId }
            checked={ favorite || isFavorite }
            onChange={ save }
            onClick={ this.saveChecked }
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  property: PropTypes.objectOf(
    PropTypes.oneOfType(
      [PropTypes.string, PropTypes.number, PropTypes.bool],
    ),
  ).isRequired,
  save: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default MusicCard;
