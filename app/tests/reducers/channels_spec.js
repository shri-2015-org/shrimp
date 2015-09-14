import {List, Map} from 'immutable';
import {expect} from 'chai';
import {channels} from '../../reducers/channels';
import {addChannel} from '../../actions/channels';

describe('channels reducer', () => {
  it('handles ADD_CHANNEL', () => {
    const initialState = List.of(
      Map({id: 0, name: '0', userIds: List.of(1, 2)}),
    );
    const nextState = channels(initialState, addChannel(Map({id: 1, name: '1', userIds: List.of(1, 2, 3)})));
    expect(nextState).to.equal(
      List.of(
        Map({id: 0, name: '0', userIds: List.of(1, 2) }),
        Map({id: 1, name: '1', userIds: List.of(1, 2, 3)}),
      ),
    );
  });

  it('handles REMOVE_CHANNEL', () => {
    const initialState = List.of(
      Map({id: 0, name: '0', userIds: List.of(1, 2) }),
      Map({id: 1, name: '1', userIds: List.of(1, 2, 3)}),
    );
    const action = {
      type: 'REMOVE_CHANNEL',
      channelId: 1,
    };
    const nextState = channels(initialState, action);
    expect(nextState).to.equal(
      List.of(Map({id: 0, name: '0', userIds: List.of(1, 2)})),
    );
  });
});
