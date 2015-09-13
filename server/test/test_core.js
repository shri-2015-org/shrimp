import {List, Map} from 'immutable';
import {expect} from 'chai';
import {setChannels, addChannel, removeChannel, addUserToChannel, removeUserFromChannel} from '../lib/core.js';

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

  describe('addChannel', () => {
    it('add new channel', () => {
      const state = Map({
        channels: List.of(Map({id: 0, name: '0', userIds: List.of(1, 2)}))
      });
      const channel = Map({id: 1, name: '1', userIds: List.of(1, 2, 3) });
      const nextState = addChannel(state, channel);
      expect(nextState).to.equal(Map({
        channels: List.of(
          Map({id: 0, name: '0', userIds: List.of(1, 2) }),
          Map({id: 1, name: '1', userIds: List.of(1, 2, 3) }),
        )
      }));
    });
  });

  describe('removeChannel', () => {
    it('remove channel by id', () => {
      const state = Map({
        channels: List.of(
          Map({id: 0, name: '0', userIds: List.of(1, 2) }),
          Map({id: 1, name: '1', userIds: List.of(1, 2, 3) }),
        )
      });
      const channelId = 1;
      const nextState = removeChannel(state, channelId);
      expect(nextState).to.equal(Map({
        channels: List.of(Map({id: 0, name: '0', userIds: List.of(1, 2) }))
      }));
    });
  });

  describe('addUserToChannel', () => {
    it('adds user\'s id to state\'s userIds', () => {
      const state = Map({
        channels: List.of(Map({id: 0, name: '0', userIds: List.of(1, 2)}))
      });
      const channelId = 0;
      const userId = 3;
      const nextState = addUserToChannel(state, channelId, userId);
      expect(nextState).to.equal(Map({
        channels: List.of(Map({id: 0, name: '0', userIds: List.of(1, 2, 3) }))
      }));
    });
  });

  describe('removeUserFromChannel', () => {
    it('remove user\'s id from state\'s userIds', () => {
      const state = Map({
        channels: List.of(Map({id: 0, name: '0', userIds: List.of(1, 2, 3) }))
      });
      const channelId = 0
      const userId = 2;
      const nextState = removeUserFromChannel(state, channelId, userId);
      console.log(nextState);
      expect(nextState).to.equal(Map({
        channels: List.of(Map({id: 0, name: '0', userIds: List.of(1, 3) }))
      }))
    });
  });


});
