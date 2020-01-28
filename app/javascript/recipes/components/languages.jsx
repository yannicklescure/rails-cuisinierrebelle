import React, { Component } from 'react';

class Languages extends Component {
  state = {
    isOpen: false
  };

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  render () {
    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""} dropdown-menu-md-right`;
    return (
      <React.Fragment>
        <a className="nav-link" href="#" role="button" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.toggleOpen}>
          <i className="fas fa-language"></i>
        </a>
        <div className={menuClass} aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="/en">English</a>
          <a className="dropdown-item" href="/fr">Fran&ccedil;ais</a>
          <a className="dropdown-item" href="/es">Espa&ntilde;ol</a>
        </div>
      </React.Fragment>
    );
  }
}

export default Languages;

