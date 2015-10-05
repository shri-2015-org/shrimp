import React from 'react';
import './styles.scss';

export default class Dropdown extends React.Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired,
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
    if (!this.refs.dropdown.getDOMNode().contains(e.target)) {
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
        <ul className='dropdown__menu' hidden={!this.state.open}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}
