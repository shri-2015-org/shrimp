## App
Так выглядит все приложение
(но есть расисты, которые хотят чтобы оно было белым)
![App](http://net2ftp.ru/node0/samoilowmaxim@gmail.com/App.png)

---


## Header <- App

Родимый header, как же без него.  
Сейчас на нем почти ничего нет, обрастет с появлением функционала
```javascript
initialState = {
  talk: PropTypes.string.isRequired,
};
```
![Header](http://net2ftp.ru/node0/samoilowmaxim@gmail.com/Header.png)

---


## Search <- Header
Может расширяться при клике
```javascript
initialState = {
  value: '',
  filter: '', // search message
};
propTypes = {
  width: PropTypes.number.isRequired,
  maxWidth: PropTypes.number,
};
```
![Search](http://net2ftp.ru/node0/samoilowmaxim@gmail.com/Search.png)

---


## ThreadsSection <- App
```javascript
initialState = {
  tabs: PropTypes.array,
  activeTab: data.tabs[0].key,
  filter: '', // search user or channel
};
```
![Talks](http://net2ftp.ru/node0/samoilowmaxim@gmail.com/Talks.png)

---


## ThreadsHeader <- ThreadsSection
```javascript
propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeTab: PropTypes.string,
  onTabClick: PropTypes.func,
};
```
![TalksHeader](http://net2ftp.ru/node0/samoilowmaxim@gmail.com/TalksHeader.png)

---


## ThreadsList <- ThreadsSection
```javascript
propTypes = {
  talks: PropTypes.arrayOf(PropTypes.string),
};
```
![TalksBody](http://net2ftp.ru/node0/samoilowmaxim@gmail.com/TalksBody.png)

---


## Thread <- ThreadsList
```javascript
initialState = {
  unreadMessagesCounter: 0,
  lastMessage: '',
  favourite: props.isStarred,
};
propTypes = {
  type: PropTypes.string.isRequired, // user or channel
  channel: PropTypes.object, // required for channel
  user: PropTypes.object, // required for user
  isStarred: PropTypes.bool // default is false
};
```
![Talk](http://net2ftp.ru/node0/samoilowmaxim@gmail.com/Talk.png)

---


## ThreadsFooter <- ThreadsSection
Пока внутри плюсик, чтобы создать канал или _пригласить человека (?)_ и поле поиска по имени канала/человека.
**Ищет независимо от выбранной вкладки.**
```javascript
propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
```
![TalksFooter](http://net2ftp.ru/node0/samoilowmaxim@gmail.com/TalksFooter.png)

---


## MessagesSection <- App
```javascript
propTypes = {
  messages: PropTypes.array,
  users: PropTypes.array,
};
```
![MessagesBox](http://net2ftp.ru/node0/samoilowmaxim@gmail.com/MessagesBox.png)

---


## MessagesList <- MessagesSection
```javascript
propTypes = {
  messages: PropTypes.array,
};
```
Внешнее API:
Это для того, чтобы понять, нужно сдвигать ли переписку вверх, когда вылезает облако, что другой человек пишет
```javascript
isLastMessageFromMe() // return true if current user sent the last message in chat
```
![Messages](http://net2ftp.ru/node0/samoilowmaxim@gmail.com/Messages.png)

---


## Message <- MessagesList
```javascript
propTypes = {
  text: PropTypes.string,
  isRead: PropTypes.bool,
};
```

#### Чужие сообщения
||
|:--|
|![Message](http://net2ftp.ru/node0/samoilowmaxim@gmail.com/Message_foreign.png)
|![Message](http://net2ftp.ru/node0/samoilowmaxim@gmail.com/Message_foreign_short.png)|

#### Свои сообщения
||
|--:|
|![Message](http://net2ftp.ru/node0/samoilowmaxim@gmail.com/Message.png)|
|![Message](http://net2ftp.ru/node0/samoilowmaxim@gmail.com/Message_short.png)|


---


## MessageComposer <- MessagesSection
Увеличивается в размерах по контенту
```javascript
initialState = {
  size: 'small',
}
```
![MessageInputBox](http://net2ftp.ru/node0/samoilowmaxim@gmail.com/MessageInputBox.png)

![MessageInputBox_big](http://net2ftp.ru/node0/samoilowmaxim@gmail.com/MessageInputBox_big.png)

---


## InputCloud <- MessagesSection
Отображается, когда собеседник пишет

![InputCloud](http://net2ftp.ru/node0/samoilowmaxim@gmail.com/InputCloud.png)


---
