import React, {PropTypes} from 'react';

export default class ThreadsHeaderTab extends React.Component {
  static propTypes = {
    isCurrent: PropTypes.bool,
    name: PropTypes.string,
    handleClick: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.handleClick();
  }

  render() {
    return (
      <div className={this.props.isCurrent ? 'threads-header__item_active' : 'threads-header__item'}
        onClick={this.handleClick}>
        {this.props.name}
      </div>
    );
  }
}
