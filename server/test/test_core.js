import {List, Map} from 'immutable';
import {expect} from 'chai';
import {setChannels, addUserToChannel} from '../src/core.js';

describe('application logic', () => {
  describe('setChannels', () => {
    it('adds the channels to the state', () => {
      const state = Map();
      const channels = List.of(Map({id: 1, name: '1', userIds: List.of(1, 2)}));
      const nextState = setChannels(state, channels);
      expect(nextState).to.equal(Map({
        channels: List.of(Map({id: 1, name: '1', userIds: List.of(1, 2)})),
      }));
    });
  });

  describe('addUserToChannel', () => {
    it('adds user\'s id to state\'s userIds', () => {
      const state = Map({
        channels: List.of(Map({id: 0, name: '1', userIds: List.of(1, 2)})),
      });
      const channelId = 0;
      const userId = 3;
      const nextState = addUserToChannel(state, channelId, userId);
      expect(nextState).to.equal(Map({
        channels: List.of(Map({id: 0, name: '1', userIds: List.of(1, 2, 3) })),
      }));
    });
  });
});

