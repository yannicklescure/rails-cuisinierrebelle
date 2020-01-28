import React, { Component } from 'react';

class Menu extends Component {
  state = {
    isOpen: false
  };

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  render () {
    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""} dropdown-menu-md-right`;
    return (
      <React.Fragment>
        <a className="nav-link" href="#" role="button" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.toggleOpen}>
          <i className="fas fa-ellipsis-v"></i>
        </a>
        <div className={menuClass} aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="/recipes/new">New recipe</a>
          <a className="dropdown-item" href="/recipes">Recipes</a>
          <a className="dropdown-item" href="/following">Following</a>
          <a className="dropdown-item" href="/users/yannick-lescure">Settings</a>
          <a data-confirm="Are you sure?" className="dropdown-item" rel="nofollow" data-method="delete" href="/users/sign_out">Log out</a>
        </div>
      </React.Fragment>
    );
  }
}

export default Menu;
