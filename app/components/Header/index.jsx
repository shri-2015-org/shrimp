import React, {PropTypes} from 'react';
import Search from 'components/Search';
import './styles.scss';
import Dropdown from 'components/Dropdown';
import DropdownItem from 'components/DropdownItem';
import store from 'store.js';
import {erase} from 'browser-cookies';


export default class Header extends React.Component {
  static propTypes = {
    setOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    docked: PropTypes.bool.isRequired,
    logOut: PropTypes.func.isRequired,
  }


  setOpen = () => {
    this.props.setOpen(true);
  }

  logOut = () => {
    erase('sessionId');
    store.history.pushState(null, '/login');
    this.props.logOut();
  }

  render() {
    return (
      <header className='header'>
        <button
          onClick={this.setOpen}
          hidden={this.props.open || this.props.docked}
          className='header__humburger'
        >{'☰'}</button>
        <Search className='header__search' />
        <Dropdown>
          <DropdownItem text={'Settings'} />
          <DropdownItem onClick={this.logOut} text={'Log Out'} danger />
        </Dropdown>
      </header>
    );
  }
}
