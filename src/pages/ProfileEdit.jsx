import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends Component {
  state = {
    loading: false,
    name: '',
    email: '',
    image: '',
    description: '',
    disabled: true,
  };

  componentDidMount() {
    this.userRecover();
  }

  userRecover = async () => {
    const user = await getUser();
    const { name, email, image, description } = user;
    this.setState(() => ({
      loading: true,
      name,
      email,
      image,
      description,
    }));
    this.setState(() => ({
      loading: false,
    }));
  };

  saveChanges = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    }, this.validateDisabled);
  };

  validateDisabled = () => {
    const { name, email, image, description } = this.state;
    const re = /\S+@\S+\.\S+/;
    const nameCheck = name.length > 0;
    const emailCheck = email.length > 0 && re.test(email);
    const imageCheck = image.length > 0;
    const descriptionCheck = description.length > 0;

    this.setState(() => ({
      disabled: !(nameCheck
        && emailCheck && imageCheck && descriptionCheck),
    }));
  };

  userSave = async () => {
    this.setState(() => ({
      loading: true,
    }));
    const { name, email, image, description } = this.state;
    const settings = {
      name,
      email,
      image,
      description,
    };
    await updateUser(settings);
    this.setState(() => ({
      loading: false,
    }));
  };

  teste = async () => {
    const { history } = this.props;
    await this.userSave();
    history.push('/profile');
  };

  render() {
    const { loading, name, email, image, description, disabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading && <Loading />}
        <form action="" onSubmit={ (e) => e.preventDefault() }>
          {' '}
          Alterar Nome :
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              data-testid="edit-input-name"
              onChange={ (e) => this.saveChanges(e) }
              value={ name }
            />
          </label>
          <label htmlFor="email">
            {' '}
            Alterar Email :
            <input
              type="email"
              id="email"
              data-testid="edit-input-email"
              onChange={ (e) => this.saveChanges(e) }
              value={ email }
            />
          </label>
          <label htmlFor="description">
            {' '}
            Alterar Descrição :
            <input
              type="text"
              id="description"
              data-testid="edit-input-description"
              onChange={ (e) => this.saveChanges(e) }
              value={ description }
            />
          </label>
          <label htmlFor="image">
            {' '}
            Alterar Imagem :
            <input
              type="text"
              id="image"
              data-testid="edit-input-image"
              onChange={ (e) => this.saveChanges(e) }
              value={ image }
            />
          </label>
          <input
            type="submit"
            data-testid="edit-button-save"
            disabled={ disabled }
            onClick={ this.teste }
            value="Editar perfil"
          />
        </form>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
};

export default ProfileEdit;
