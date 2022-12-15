import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Albuns extends Component {
  render() {
    const { name, image, alt, link } = this.props;
    return (
      <div>
        <img src={ image } alt={ alt } />
        <Link to={ `/album/${link}` } data-testid={ `link-to-album-${link}` }>
          <h3>
            Álbum
            { alt }
          </h3>
        </Link>
        <p>
          Artista :
          { name }
        </p>
      </div>
    );
  }
}

Albuns.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  link: PropTypes.oneOfType(
    [PropTypes.number.isRequired, PropTypes.string.isRequired],
  ).isRequired,
};

export default Albuns;
