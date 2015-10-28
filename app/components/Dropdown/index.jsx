import React from 'react';
import {Plate} from 'react-motion-pack';
import './styles.scss';

export default class Dropdown extends React.Component {

  static propTypes = {
    children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
  }


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


  render() {
    return (
      <div className='dropdown' ref='dropdown'>
        <button
          className='dropdown__button'
          onClick={this.toggleMenu}
        >{'●●●'}</button>
        <Plate type={this.state.open ? 'in' : 'out'}>
        <ul className='dropdown__menu'>
          {this.props.children}
        </ul>
        </Plate>
      </div>
    );
  }
}
