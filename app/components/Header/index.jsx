import React, {PropTypes} from 'react';
import Search from 'components/Search';
import './styles.scss';
import Dropdown from 'components/Dropdown';

export default class Header extends React.Component {
  static propTypes = {
    setOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    docked: PropTypes.bool.isRequired,
  }


  setOpen = () => {
    this.props.setOpen(true);
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
        <Dropdown />
      </header>
    );
  }
}
