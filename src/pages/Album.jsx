import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      musicList: [],
      albumName: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.requestMusicAndAtt();
  }

  requestMusicAndAtt = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState(() => ({
      id: musics[0].artistName,
      albumName: musics[0].collectionName,
      musicList: musics.filter((music) => music.kind === 'song'),
    }));
  };

  saveSong = async (song) => {
    this.setState(() => ({
      loading: true,
    }));
    await addSong(song);

    this.setState(() => ({
      loading: false,
    }));
  };

  render() {
    const { albumName, musicList, id, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{ id }</h2>
        <p data-testid="album-name">
          {' '}
          { albumName }
        </p>
        {loading && <Loading />}
        {musicList
          .map((music, index) => (
            <MusicCard
              property={ music }
              key={ index }
              save={ () => this.saveSong(music) }
            />))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
};
export default Album;
