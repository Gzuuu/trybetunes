import PropTypes from 'prop-types';
import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const { property, save } = this.props;
    const { trackName, previewUrl, trackId } = property;

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
        <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
          {' '}
          Favorita
          <input type="checkbox" id={ trackId } onClick={ save } />
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
};

export default MusicCard;
