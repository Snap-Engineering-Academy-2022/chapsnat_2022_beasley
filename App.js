import { StatusBar } from 'expo-status-bar';
import React, {useState, useCallback, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import db from "./firebase";
import { collection, getDocs, doc, updateDoc, setDoc} from 'firebase/firestore';

export default function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function getChat() {
      console.log("starting get!")
      const chatsCol = collection(db, 'Chats');
      const chatsDoc = await getDocs(chatsCol);
      const chatData = chatsDoc.docs.map(doc => doc.data());
      console.log("here chatData", chatData);
      setMessages(chatData[0].messages);
    }
    getChat();
  }, []);

  const onSend = useCallback(async (messages = []) => {
    await setDoc(doc(db, "Chats", "myfirstchat"), {
      messages: messages
    });
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
