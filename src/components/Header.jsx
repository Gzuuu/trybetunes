import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      username: '',
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState(() => ({
      loading: false,
      username: user.name,
    }));
  }

  render() {
    const { loading, username } = this.state;
    const name = (
      <h4
        data-testid="header-user-name"
      >
        { username }
      </h4>);
    return (
      <header data-testid="header-component">
        {loading ? <Loading />
          : name }
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
