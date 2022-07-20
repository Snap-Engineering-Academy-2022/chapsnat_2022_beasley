import React, {useEffect, useState} from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import db from "../../firebase";


const auth = getAuth();

export function useAuthentication() {
	const [user, setUser] = useState();
	const [userData, setUserData] = useState();

	useEffect(() => {
	 console.log("user data is: ", userData)
	}, [userData])
	
//any time when user changes, get user data with getDoc


	useEffect(() => {
		const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
		if (user) {
			console.log("user!!! ----------", user.uid)
			getDoc(doc(db, "Users", user.uid)).then((snapshot) => {
				setUserData(snapshot.data())
				console.log(snapshot.data(), "------>>>>>>>>>>>>>>>----------")
			})

			setUser(user);
		} else {
			// User is signed out
			setUser(undefined);
		}
		});

		return unsubscribeFromAuthStatusChanged;
	}, []);

	return { user };
}