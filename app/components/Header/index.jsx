import React, {PropTypes} from 'react';
import Search from 'components/Search';
import './styles.scss';
import Dropdown from 'components/Dropdown';
import DropdownItem from 'components/DropdownItem';
import {Link} from 'react-router';
import {Map} from 'immutable';
import {Fade} from 'react-motion-pack';

export default class Header extends React.Component {
  static propTypes = {
    local: PropTypes.instanceOf(Map).isRequired,
    setOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    docked: PropTypes.bool.isRequired,
    logOut: PropTypes.func.isRequired,
    changeMessageFilterValue: PropTypes.func.isRequired,
  }

  static contextTypes = {
    __: PropTypes.func.isRequired,
  };

  setOpen = () => {
    this.props.setOpen(true);
  }

  logOut = () => {
    this.props.logOut();
  }

  changeFilter = (e) => {
    this.props.changeMessageFilterValue(e.target.value.trim().toLowerCase());
  }

  render() {
    const user = (<div className='header__user'>
                    <img
                      className='header__user-avatar'
                      src={this.props.local.get('avatar')}
                    />
                    <div className='header__user-name'>
                      {this.props.local.get('name')}
                    </div>
                  </div>);
    return (
      <Fade side='down' offset={500}>
        <header className='header'>
          {this.props.local.size ? user : null}
          <button
            onClick={this.setOpen}
            hidden={this.props.open || this.props.docked}
            className='header__humburger'
          >{'☰'}</button>
          <Search className='header__search' onChange={this.changeFilter} />
          <Dropdown>
             <DropdownItem>
              <Link className='dropdown-item__link' to='/settings'>{this.context.__('Settings')}</Link>
            </DropdownItem>
            <DropdownItem onClick={this.logOut} danger>
              {this.context.__('Log Out')}
            </DropdownItem>
          </Dropdown>
        </header>
      </Fade>
    );
  }
}
