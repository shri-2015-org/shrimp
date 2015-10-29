export function setUnreadMessagesCount(channels, messages) {
  return channels
    .map(c => {
      const lastSeen = c ? c.get('lastSeen') : null;
      const unreadCount = !lastSeen
        ? 0
        : messages.filter(m => m.get('channelId') === c.get('id') && Date.parse(m.get('timestamp')) >= Date.parse(lastSeen)).size;
      return c.set('unreadCount', unreadCount);
    });
}
