import {List, Map} from 'immutable';
import {expect} from 'chai';
import {addUserToChannel, removeUserFromChannel} from '../../src/core.js';

describe('application logic', () => {
  describe('addUserToChannel', () => {
    it('adds user\'s id to state\'s userIds', () => {
      const state = Map({
        channels: List.of(Map({id: 0, name: '0', userIds: List.of(1, 2)})),
      });
      const channelId = 0;
      const userId = 3;
      const nextState = addUserToChannel(state, channelId, userId);
      expect(nextState).to.equal(Map({
        channels: List.of(Map({id: 0, name: '0', userIds: List.of(1, 2, 3) })),
      }));
    });
  });

  describe('removeUserFromChannel', () => {
    it('remove user\'s id from state\'s userIds', () => {
      const state = Map({
        channels: List.of(Map({id: 0, name: '0', userIds: List.of(1, 2, 3) })),
      });
      const channelId = 0;
      const userId = 2;
      const nextState = removeUserFromChannel(state, channelId, userId);
      expect(nextState).to.equal(Map({
        channels: List.of(Map({id: 0, name: '0', userIds: List.of(1, 3) })),
      }));
    });
  });
});
