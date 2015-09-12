import {List, Map} from 'immutable';
import {expect} from 'chai';
import {setChannels} from '../src/core.js';

describe('application logic', () => {
    describe('setChannels', () => {
        it('adds the channels to the state', () => {
            const state = Map();
            const channels = List.of(Map({id: 1, name: '1', userIds: List.of(1,2)}));
            console.log(channels);
            const nextState = setChannels(state, channels);
            expect(nextState).to.equal(Map({
                channels: List.of(Map({id: 1, name: '1', userIds: List.of(1,2)}))
            }));
        });
    });
});