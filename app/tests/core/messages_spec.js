import {List, Map} from 'immutable';
import {expect} from 'chai';
import {messages} from '../../reducers/messages';

describe('messages reducer', () => {
  it('handles ADD_MESSAGE', () => {
    const initialState = List.of(
      Map({id: 123, channelId: 0, text: 'first message'}),
    );
    const action = {
      type: 'ADD_MESSAGE',
      message: Map({id: 124, channelId: 0, text: 'second message'}),
    };
    const nextState = messages(initialState, action);

    expect(nextState).to.equal(
      List.of(
        Map({id: 123, channelId: 0, text: 'first message'}),
        Map({id: 124, channelId: 0, text: 'second message'}),
      ),
    );
  });
});
