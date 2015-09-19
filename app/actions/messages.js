export function newMessage(data) {
  return {
    type: 'NEW_MESSAGE',
    payload: data,
    send: true,
  };
}

export function addMessage(message) {
  return {
    type: 'ADD_MESSAGE',
    message,
  };
}
