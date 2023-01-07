import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends Component {
  state = {
    user: '',
    loading: false,
  };

  componentDidMount() {
    this.userRecover();
  }

  userRecover = async () => {
    const user = await getUser();
    this.setState(() => ({
      loading: true,
      user,
    }));
    this.setState(() => ({
      loading: false,
    }));
  };

  render() {
    const { loading, user } = this.state;
    const { email, description, image, name } = user;
    return (
      <div data-testid="page-profile">
        {loading && Loading}
        <Header />
        <div>
          <img src={ image } alt="user" data-testid="profile-image" />
        </div>
        <div>
          <h2>Nome</h2>
          <p>{name}</p>
        </div>
        <div>
          <h2>Email</h2>
          <p>{email}</p>
        </div>
        <div>
          <h2>Descrição</h2>
          <p>{description}</p>
        </div>
        <Link to="/profile/edit"> Editar perfil </Link>
      </div>
    );
  }
}

export default Profile;
