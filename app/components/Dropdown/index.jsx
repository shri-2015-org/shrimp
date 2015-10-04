import React from 'react';
import DropdownItem from 'components/DropdownItem';
import './styles.scss';


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
    if (!this.refs.dropdown.getDOMNode().contains(e.target)) {
      this.setState({
        open: false,
      });
    }
  }


  handle = () => {
    console.log('click');
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
           <DropdownItem onClick={this.handle} text={'Log Out'} danger />
        </ul>
      </div>
    );
  }
}
