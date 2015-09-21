import {currentChannelMessagesSelector} from '../../selectors/messagesSelector';
import {List, Map} from 'immutable';
import chai from 'chai';

describe('messages selector', () => {
  it('selects messages by channel id', () => {
    const currentChannelId = 1;

    const messages = List.of(
      Map({id: 0, channelId: 0, senderId: 0, text: 'first message'}),
      Map({id: 1, channelId: 1, senderId: 1, text: 'second message'}),
    );

    const users = List.of(
      Map({id: 0, name: 'Vasya'}),
      Map({id: 1, name: 'Petja'}),
    );

    const state = {
      messages,
      users,
      currentChannelId,
    };

    const filteredState = currentChannelMessagesSelector(state);

    chai.expect(Map(filteredState)).to.equal(Map({
      messages: List.of(Map({id: 1, channelId: 1, text: 'second message', senderId: 1, sender: Map({id: 1, name: 'Petja'})})),
      currentChannelId,
    }));
  });
});
