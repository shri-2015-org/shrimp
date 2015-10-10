import React, {PropTypes} from 'react';
import Search from 'components/Search';
import './styles.scss';
import Dropdown from 'components/Dropdown';
import DropdownItem from 'components/DropdownItem';
import {Link} from 'react-router';


export default class Header extends React.Component {
  static propTypes = {
    setOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    docked: PropTypes.bool.isRequired,
    logOut: PropTypes.func.isRequired,
    changeFilter: PropTypes.func.isRequired,
  }


  setOpen = () => {
    this.props.setOpen(true);
  }

  logOut = () => {
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
        <Search className='header__search' onChange={this.props.changeFilter}/>
        <Dropdown>
           <DropdownItem link='/settings'>
            <Link to='/settings'>Settings</Link>
          </DropdownItem>
          <DropdownItem onClick={this.logOut} danger>
            Log Out
          </DropdownItem>
        </Dropdown>
      </header>
    );
  }
}
