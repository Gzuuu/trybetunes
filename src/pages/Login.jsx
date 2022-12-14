import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    const { length, handleChange, loadingChange } = this.props;
    const number = 3;
    const disabledValue = (length < number);
    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            placeholder="Nome"
            onChange={ handleChange }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ disabledValue }
            onClick={ loadingChange }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  length: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  loadingChange: PropTypes.func.isRequired,
};

export default Login;
