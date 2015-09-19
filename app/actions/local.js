export function setLocalState(state) {
  return {
    type: 'SET_LOCAL_STATE',
    payload: state,
  };
}


export function setCurrentChannel(channelId) {
  return {
    type: 'SET_CURRENT_CHANNEL',
    payload: channelId,
  };
}
