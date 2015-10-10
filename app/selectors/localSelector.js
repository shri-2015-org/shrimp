import {createSelector} from 'reselect';

export const localSelector = createSelector(
  [state => state.users, state => state.local],
  (users, local) => {
    if (local.size) {
      const userObj = users.find( user => user.id === local.userId);
      console.log(local.set('avatar', userObj.get('avatar')).toJS());
      return local.set('avatar', userObj.get('avatar'));
    }
  });
