import {List, Map} from 'immutable';
import {expect} from 'chai';
import {users} from '../../reducers/users';
import {setUserInfo} from '../../actions/users';

describe('users reducer', () => {
  it('handles SET_USER_INFO', () => {
    const initialState = List.of(
      Map({
        id: 0,
        sessionId: 123,
        name: 'first user',
        email: 'first@first.com',
      }),
      Map({id: 1,
        sessionId: 456,
        name: 'second user',
        email: 'second@second.com',
      }),
    );
    const nextState = users(initialState, setUserInfo({
      user: {
        id: 0,
        sessionId: 123,
        name: 'first user modified',
        email: 'modified@first.com',
      },
    }));
    expect(nextState).to.equal(
      List.of(
        Map({id: 0,
          sessionId: 123,
          name: 'first user modified',
          email: 'modified@first.com',
        }),
        Map({id: 1,
          sessionId: 456,
          name: 'second user',
          email: 'second@second.com',
        }),
      ),
    );
  });
});
