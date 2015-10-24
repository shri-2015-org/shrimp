import {createSelector} from 'reselect';

export const localSelector = createSelector(
  [state => state.users, state => state.local],
  (users, local) => {
    if (local.size) {
      const userObj = users.find( user => user.get('id') === local.get('userId'));
      return local
        .set('avatar', userObj.get('avatar'))
        .set('name', userObj.get('name'))
        .set('email', userObj.get('email'));
    }
    return local;
  }
);
