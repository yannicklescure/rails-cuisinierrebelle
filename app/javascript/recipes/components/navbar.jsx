import React, { Component } from 'react';

import Languages from './languages';
import Menu from './menu';

class Navbar extends Component {
  state = {
    isOpen: false
  };

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  render() {

    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""} dropdown-menu-md-right`;

    return (
      <div className="d-none d-md-block">
        <div id="navbar-main" className="navbar navbar-expand-sm navbar-light navbar-cuisinierrebelle fixed-top">
        <a className="navbar-brand" href="/">
          <i className="fas fa-utensils"></i>&nbsp;Cuisinier rebelle
      </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="d-flex w-100 justify-content-md-between flex-column flex-md-row">
            <div className="order-1 order-sm-0 d-flex align-items-center">
              <ul className="navbar-nav">
                <li className="nav-item"><a href="/tools" className="nav-link">Kitchen tools</a></li>
                <li className="nav-item"><a href="/conversion" className="nav-link">Conversion table</a></li>
              </ul>
            </div>
            <div className="col col-md-6">
              <form action="/index" acceptCharset="UTF-8" method="get"><input name="utf8" type="hidden" value="&#x2713;" />
      <div id="search" className="input-group">
        <input type="text" name="query" id="query" className="form-control" placeholder="Search recipes..." aria-label="Search recipes..." aria-describedby="search-btn" />
      </div>
      </form>
            </div>
            <div className="order-0 order-sm-1">
              <ul className="navbar-nav mr-auto">
                  <li className="nav-item"><a className="nav-link bookmarks" href="/bookmarks">Bookmarks</a></li>
                  <li className="nav-item dropdown">
                    <Languages />
                  </li>
                  <li className="nav-item dropdown">
                    <Menu />
                  </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      </div>
    );
  }
}

export default Navbar;
