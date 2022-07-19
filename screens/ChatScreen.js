import { StatusBar } from 'expo-status-bar';
import React, {useState, useCallback, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import db from "../firebase";
import firebase from "firebase/app";
import { collection, getDocs, doc, updateDoc, setDoc, arrayUnion, onSnapshot} from 'firebase/firestore';

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let unsubscribeFromNewSnapshots = onSnapshot(doc(db, "Chats", "myfirstchat"), (snapshot) => {
      console.log("New Snapshot! ------------------------------------------------", snapshot.data().messages);
      setMessages(snapshot.data().messages);
    });
  
    return function cleanupBeforeUnmounting() {
      unsubscribeFromNewSnapshots();
    };
  }, []);

  const onSend = useCallback(async (messages = []) => {
    console.log("messgaes print---------------------------------------------------------", messages)
    console.log("messgaes print---------------------------------------------------------", messages)
    await updateDoc(doc(db, "Chats", "myfirstchat"), {
      messages: arrayUnion(messages[0])
    });
    console.log("messages ______________>", messages)
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    console.log("previous messages2", messages)
}, [])
  

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
        name: "ashley",
        avatar: 'https://media.istockphoto.com/photos/red-apple-picture-id184276818?k=20&m=184276818&s=612x612&w=0&h=QxOcueqAUVTdiJ7DVoCu-BkNCIuwliPEgtAQhgvBA_g=',
      }}
      placeholder="sup bitch... "
      alwaysShowSend
      renderUsernameOnMessage = {true}
      showUserAvatar = {true}
      inverted={true}
    />
    
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
