import React, {PropTypes} from 'react';
import {Map} from 'immutable';
import cx from 'classnames';
import './styles.scss';
import moment from 'moment';
import Linkify from 'react-linkify';


export default class Message extends React.Component {

  static propTypes = {
    currentUserId: PropTypes.string.isRequired,
    senderRepeated: PropTypes.bool.isRequired,
    nextMessageIsMain: PropTypes.bool.isRequired,
    pinMessage: PropTypes.func.isRequired,
    unpinMessage: PropTypes.func.isRequired,
    message: PropTypes.instanceOf(Map).isRequired,
    setCurrentDirectChannel: PropTypes.func.isRequired,
    currentChannel: PropTypes.instanceOf(Map).isRequired,
  }


  constructor(props) {
    super(props);
    this.state = {
      date: null,
    };
  }


  componentDidMount = () => {
    this.updateTime(this.props.message.get('timestamp'));
    this.timer = setInterval(()=>{
      this.updateTime(this.props.message.get('timestamp'));
    }, 5000);
  }


  componentWillUnmount = () => {
    clearInterval(this.timer);
  }


  setChannel = () => {
    this.props.setCurrentDirectChannel(this.props.message.get('sender').get('id'));
  }


  updateTime = (timestamp) => {
    const date = moment.duration(moment().diff(moment(timestamp))).humanize();
    this.setState({
      date: date,
    });
  }


  togglePin = () => {
    if (this.props.message.get('pinned')) {
      this.props.unpinMessage(this.props.message.get('id'));
    } else {
      this.props.pinMessage(this.props.message.get('id'));
    }
  }

  renderAvatar = (sender) => {
    return (
      <img
        className='message__avatar'
        src={sender.get('avatar')}
        width='34'
        height='34'
      />
    );
  }


  render() {
    const {message, currentUserId, senderRepeated, nextMessageIsMain, currentChannel} = this.props;
    const isSelfMessage = message.get('sender').get('id') === currentUserId;
    const userName = (() => {
      if (isSelfMessage || senderRepeated) return null;
      const name = message.get('sender').get('name');
      return <div className='message__username' onClick={this.setChannel}>{name}</div>;
    }());

    return (
      <li className={cx('message', {
        'message_repeated': senderRepeated,
        'message_last': !nextMessageIsMain,
        'message_foreign': !isSelfMessage,
      })}>
        {isSelfMessage ? null : this.renderAvatar(message.get('sender'))}
        {!currentChannel.get('isDirect') ? userName : null}
        <div className='message__cloud'>
          <div onClick={this.togglePin} style={{fontSize: '9px'}}>{message.get('pinned') ? 'Отпинь' : 'Запинь'} мессагу без напряга!</div>
          <div className='message__text'>
            <Linkify properties={{className: 'message__url', target: '_blank'}}>{message.get('text')}</Linkify>
            <div>
                {/* JSON.stringify(message.get('linksInfo').toJS()) */}
                {message.get('linksInfo').map((linkInfo, i) => {
                  switch (linkInfo.get('type')) {
                  case 'link':
                    return (<div key={i} className='message__link-info'>
                      <img className='message__link-info__thumbnail'
                        src={linkInfo.get('thumbnail_url')}
                        with={linkInfo.get('thumbnail_width')}
                        height={linkInfo.get('thumbnail_height')} />
                      <div className='message__link-info__title'>
                        <a href={linkInfo.get('url')} className='message__url' target='_blank'>{linkInfo.get('title')}</a>
                      </div>
                      <div className='message__link-info__description'>{linkInfo.get('description')}</div>
                    </div>);
                  case 'video':
                    return (<div key={i} className='message__video-container' dangerouslySetInnerHTML={{__html: linkInfo.get('html')}}></div>);
                  case 'photo':
                    return (<div key={i} className='message__image-container'>
                      <img
                        className={cx('message__image-container__img', {
                          'message__image-container__img_horizontal': linkInfo.get('width') >= linkInfo.get('height'),
                          'message__image-container__img_vertical': linkInfo.get('width') < linkInfo.get('height'),
                        })}
                        src={linkInfo.get('url')} />
                    </div>);
                  default:
                    return null;
                  }
                })}
            </div>
          </div>
          <div className='message__date'>{this.state.date + ' ago'}</div>
        </div>
      </li>
    );
  }
}
