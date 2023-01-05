import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends Component {
  state = {
    loading: false,
    favoriteSong: [],
  };

  componentDidMount() {
    this.getSavedMusic();
  }

  getSavedMusic = async () => {
    const musics = await getFavoriteSongs();
    this.setState(() => ({
      loading: true,
      favoriteSong: musics,
    }));
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
      favoriteSong: musics,
    }));
  };

  render() {
    const { favoriteSong, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading && <Loading />}
        {favoriteSong.map((music, index) => (
          <MusicCard
            property={ music }
            key={ index }
            isFavorite={ favoriteSong.some((favorite) => (
              favorite.trackName === music.trackName
            )) }
            save={ () => this.deleteSong(music) }
          />
        ))}
      </div>
    );
  }
}

export default Favorites;
