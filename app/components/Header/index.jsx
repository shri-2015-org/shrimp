import React, {PropTypes} from 'react';
import Search from 'components/Search';
import './styles.scss';
import Dropdown from 'components/Dropdown';
import DropdownItem from 'components/DropdownItem';
import store from 'store.js';

export default class Header extends React.Component {
  static propTypes = {
    setOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    docked: PropTypes.bool.isRequired,
  }


  setOpen = () => {
    this.props.setOpen(true);
  }


  logOut = () => {
    document.cookie = 'sessionId=';
    store.history.pushState(null, '/login');
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
