import React, {PropTypes} from 'react';

export default class MessageItem extends React.Component {

  static propTypes = {
    user: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }


  render() {
    const {user, text} = this.props;
    return (
      <li>{text} {user}</li>
    );
  }
}
