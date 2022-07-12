import { StatusBar } from 'expo-status-bar';
import React, {useState, useCallback, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

export default function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(dummyMessages.reverse())
  }, [])

  let dummyMessages = [
    {
      _id: 1,
      text: ' ew',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "igor",
        avatar: 'https://i0.wp.com/post.greatist.com/wp-content/uploads/sites/2/2021/07/369366-grt-Pineapple-Benefits-grt-1296x728-header_body.jpg?w=1155&h=1530',
      },
    },
    {
      _id: 2,
      text: 'Sup bro',
      createdAt: new Date(),
      user: {
        _id: 1,
        name: "ashley",
        avatar: 'https://d279m997dpfwgl.cloudfront.net/wp/2019/07/0710_peaches-1000x667.jpg',
      },
    },
  ]

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 2,
        name: "ashley",
        avatar: 'https://media.istockphoto.com/photos/red-apple-picture-id184276818?k=20&m=184276818&s=612x612&w=0&h=QxOcueqAUVTdiJ7DVoCu-BkNCIuwliPEgtAQhgvBA_g=',
      }}
      placeholder="sup bitch... "
      alwaysShowSend
      renderUsernameOnMessage = {true}
      showUserAvatar = {true}
      loadEarlier
      infiniteScroll
    />
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
