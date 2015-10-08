import React from 'react';
import DropdownItem from 'components/DropdownItem';
import './styles.scss';
import store from 'store.js';

export default class Dropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }


  componentDidMount = () => {
    window.addEventListener('click', this.closeMenu);
  }

  componentWillUnmount = () => {
    window.removeEventListener('click', this.closeMenu);
  }

  toggleMenu = () => {
    this.setState({
      open: !this.state.open,
    });
  }


  closeMenu = (e) => {
    if (!this.refs.dropdown.contains(e.target)) {
      this.setState({
        open: false,
      });
    }
  }


  logOut = () => {
    document.cookie = 'sessionId=';
    store.history.pushState(null, '/login');
  }

  render() {
    return (
      <div className='dropdown' ref='dropdown'>
        <button
          className='dropdown__button'
          onClick={this.toggleMenu}
        >{'●●●'}</button>
        <ul className='dropdown__menu' hidden={!this.state.open}>
           <DropdownItem text={'Settings'} />
           <DropdownItem onClick={this.logOut} text={'Log Out'} danger />
        </ul>
      </div>
    );
  }
}
