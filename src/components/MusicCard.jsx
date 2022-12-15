import PropTypes from 'prop-types';
import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const { property } = this.props;
    const { trackName, previewUrl } = property;
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
};

export default MusicCard;
