import {List, Map} from 'immutable';
import {expect} from 'chai';
import {users} from '../../reducers/users';
import {setUserInfo, joinUser, setUserOnline, setUserOffline} from '../../actions/users';

describe('users reducer', () => {
  const initialState = List.of(
    Map({
      id: 0,
      sessionId: 123,
      name: 'first user',
      email: 'first@first.com',
    }),
    Map({
      id: 1,
      sessionId: 456,
      name: 'second user',
      email: 'second@second.com',
    }),
  );

  it('handles SET_USER_INFO', () => {
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

  it('handles JOIN_USER new', () => {
    const nextState = users(initialState, joinUser({
      user: {
        id: 2,
        sessionId: 789,
        name: 'third user',
        email: 'third@third.com',
      },
    }));
    expect(nextState).to.equal(
      List.of(
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
        Map({id: 2,
          sessionId: 789,
          name: 'third user',
          email: 'third@third.com',
        })
      ),
    );
  });

  it('handles JOIN_USER old', () => {
    const nextState = users(initialState, joinUser({
      user: {
        id: 1,
        sessionId: 456,
        name: 'second user',
        email: 'second@second.com',
      },
    }));
    expect(nextState).to.equal(
      List.of(
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
      ),
    );
  });

  it('handles USER_ONLINE', () => {
    const nextState = users(initialState, setUserOnline({ userId: 1 }));
    expect(nextState).to.equal(
      List.of(
        Map({
          id: 0,
          sessionId: 123,
          name: 'first user',
          email: 'first@first.com',
        }),
        Map({
          id: 1,
          sessionId: 456,
          name: 'second user',
          email: 'second@second.com',
          isOnline: true,
        }),
      ),
    );
  });

  it('handles USER_OFFLINE', () => {
    const state = List.of(
      Map({
        id: 0,
        sessionId: 123,
        name: 'first user',
        email: 'first@first.com',
      }),
      Map({
        id: 1,
        sessionId: 456,
        name: 'second user',
        email: 'second@second.com',
        isOnline: true,
      }),
    );
    const nextState = users(state, setUserOffline({ userId: 1 }));
    expect(nextState).to.equal(
      List.of(
        Map({
          id: 0,
          sessionId: 123,
          name: 'first user',
          email: 'first@first.com',
        }),
        Map({
          id: 1,
          sessionId: 456,
          name: 'second user',
          email: 'second@second.com',
          isOnline: false,
        }),
      ),
    );
  });
});
