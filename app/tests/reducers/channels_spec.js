import {List, Map} from 'immutable';
import {expect} from 'chai';
import {channels} from '../../reducers/channels';
import {addChannel, markChannelAsRead} from '../../actions/channels';

describe('channels reducer', () => {
  it('handles ADD_CHANNEL', () => {
    const initialState = List.of(
      Map({id: 0, name: '0', users: List.of(1, 2)}),
    );
    const nextState = channels(initialState, addChannel(Map({id: 1, name: '1', users: List.of(1, 2, 3)})));
    expect(nextState).to.equal(
      List.of(
        Map({id: 0, name: '0', users: List.of(1, 2) }),
        Map({id: 1, name: '1', users: List.of(1, 2, 3)}),
      ),
    );
  });

  it('handles MARK_CHANNEL_AS_READ', () => {
    const initialState = List.of(
      Map({id: '123', name: '0'}),
      Map({id: '124', name: '0'}),
    );
    const nextState = channels(initialState, markChannelAsRead({channelId: '124', lastSeen: '1111'}));
    expect(nextState).to.equal(
      List.of(
        Map({id: '123', name: '0'}),
        Map({id: '124', name: '0', lastSeen: '1111'}),
      ),
    );
  });

  it('handles REMOVE_CHANNEL', () => {
    const initialState = List.of(
      Map({id: 0, name: '0', users: List.of(1, 2) }),
      Map({id: 1, name: '1', users: List.of(1, 2, 3)}),
    );
    const action = {
      type: 'REMOVE_CHANNEL',
      channelId: 1,
    };
    const nextState = channels(initialState, action);
    expect(nextState).to.equal(
      List.of(Map({id: 0, name: '0', users: List.of(1, 2)})),
    );
  });

  it('handles JOIN_TO_CHANNEL not join', () => {
    const initialState = List.of(
      Map({id: 0, name: '0', users: List.of(Map({_id: 11}))})
    );
    const action = {
      type: 'JOIN_TO_CHANNEL',
      payload: {userId: 12, channelId: 0, time: 123},
    };
    const nextState = channels(initialState, action);
    expect(nextState).to.equal(
      List.of(Map({id: 0, name: '0', users: List.of(Map({_id: 11}), Map({_id: 12, lastSeen: 123}))})),
    );
  });

  it('handles JOIN_TO_CHANNEL already joined', () => {
    const initialState = List.of(
      Map({id: 0, name: '0', users: List.of(Map({_id: 11}), Map({_id: 12}))})
    );
    const action = {
      type: 'JOIN_TO_CHANNEL',
      payload: {userId: 12, channelId: 0, time: 123},
    };
    const nextState = channels(initialState, action);
    expect(nextState).to.equal(
      List.of(Map({id: 0, name: '0', users: List.of(Map({_id: 11}), Map({_id: 12}))})),
    );
  });
});
