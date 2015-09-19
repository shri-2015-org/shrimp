import {Map} from 'immutable';
import {expect} from 'chai';
import {local} from '../../reducers/local';
import {setLocalState, setCurrentChannel} from '../../actions/local';

describe('local reducer', () => {
  it('handles SET_LOCAL_STATE', () => {
    const initialState = Map();
    const state = Map({
      'userId': 321,
      'currentChannelId': 123,
    });
    const nextState = local(initialState, setLocalState(state));
    expect(nextState).to.equal(
      Map({
        'userId': 321,
        'currentChannelId': 123,
      })
    );
  });

  it('handles SET_CURRENT_CHANNEL', () => {
    const initialState = Map({
      'userId': 321,
      'currentChannelId': 123,
    });
    const nextState = local(initialState, setCurrentChannel(111));
    expect(nextState).to.equal(
      Map({
        'userId': 321,
        'currentChannelId': 111,
      })
    );
  });
});
