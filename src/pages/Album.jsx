import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      musicList: [],
      albumName: '',
      loading: false,
      musicCompare: [],
    };
  }

  componentDidMount() {
    this.requestMusicAndAtt();
    this.requestSavedSong();
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

  requestSavedSong = async () => {
    this.setState(() => ({
      loading: true,
    }));
    const musics = await getFavoriteSongs();
    this.setState(() => ({
      loading: false,
      musicCompare: musics,
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

  deleteSong = async (song) => {
    this.setState(() => ({
      loading: true,
    }));
    await removeSong(song);
    const musics = await getFavoriteSongs();
    this.setState(() => ({
      loading: false,
      musicCompare: musics,
    }));
  };

  saveAndRemoveSong = ({ target }, song) => {
    const { checked } = target;
    return checked ? this.saveSong(song) : this.deleteSong(song);
  };

  render() {
    const { albumName, musicList, id, loading, musicCompare } = this.state;
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
              save={ (e) => this.saveAndRemoveSong(e, music) }
              isFavorite={ musicCompare.some((favorite) => (
                favorite.trackName === music.trackName)) }
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
