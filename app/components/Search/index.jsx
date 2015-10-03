import React, {PropTypes} from 'react';
import './styles.scss';
import cx from 'classnames';

export default class Search extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  }


  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }


  textChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  }


  render() {
    const classes = cx(this.props.className, {
      'search': true,
    });
    return (
      <div className={classes}>
        <div
          className='search__icon'
        >{'⚲'}</div>
        <input
          placeholder='Search...'
          onChange={this.textChange}
          value={this.state.change}
          {...this.props}
          className='search__input'
          type='text'
        />
      </div>
    );
  }
}
