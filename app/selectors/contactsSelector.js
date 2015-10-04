import {createSelector} from 'reselect';

export const contactsSelector = createSelector(
  [state => state.users, state => state.local],
  (users, local) => users.filter(item => item.get('id') !== local.get('userId'))
);
