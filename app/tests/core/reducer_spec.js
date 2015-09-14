import {List, Map} from 'immutable';
import {expect} from 'chai';
import reducer from '../../src/reducer';

describe('reducer', () => {
  it('handles INITIATE_STATE', () => {
    const action = {
      type: 'INITIATE_STATE',
    };
    const nextState = reducer(null, action);

    expect(nextState).to.equal(
      Map({
        channels: List(),
        messages: List(),
        users: List(),
        user: Map(),
      })
    );
  });

  it('handles ADD_CHANNEL', () => {
    const initialState = Map({
      channels: List.of(Map({id: 0, name: '0', userIds: List.of(1, 2)})),
    });
    const action = {
      type: 'ADD_CHANNEL',
      channel: Map({id: 1, name: '1', userIds: List.of(1, 2, 3) }),
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(Map({
      channels: List.of(
        Map({id: 0, name: '0', userIds: List.of(1, 2) }),
        Map({id: 1, name: '1', userIds: List.of(1, 2, 3) }),
      ),
    }));
  });

  it('handles REMOVE_CHANNEL', () => {
    const initialState = Map({
      channels: List.of(
        Map({id: 0, name: '0', userIds: List.of(1, 2) }),
        Map({id: 1, name: '1', userIds: List.of(1, 2, 3) }),
      ),
    });
    const action = {
      type: 'REMOVE_CHANNEL',
      channelId: 1,
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(Map({
      channels: List.of(Map({id: 0, name: '0', userIds: List.of(1, 2) })),
    }));
  });

  it('handles ADD_MESSAGE', () => {
    const initialState = Map({
      channels: List.of(Map({id: 0, name: '0', userIds: List.of(1, 2, 3), messageIds: List.of(123) })),
      messages: List.of(Map({id: 123, channelId: 0, text: 'first message'})),
    });
    const action = {
      type: 'ADD_MESSAGE',
      message: Map({id: 124, channelId: 0, text: 'second message'}),
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(Map({
      channels: List.of(Map({id: 0, name: '0', userIds: List.of(1, 2, 3), messageIds: List.of(123, 124) })),
      messages: List.of(Map({id: 123, channelId: 0, text: 'first message'}), Map({id: 124, channelId: 0, text: 'second message'})),
    }));
  });
});
