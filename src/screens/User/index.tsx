import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Image, StyleSheet, View } from 'react-native';
import { auth } from '../../../data/firebase';
import SignOutButton from '../../components/SignOutButton';
import Text from '../../components/Text';

const User = () => {
  const [user] = useAuthState(auth)
  
  console.log("user", user)
 
  return (
    <View style={styles.user}>
      <View style={styles.userInfos}>
        <Image
            source={{
              uri: user?.photoURL || undefined
            }}
            style={styles.image}
          />
          <View>
            <Text weight='700' fontSize={13}>Olá, {user?.displayName}!</Text>
            <Text weight='500' fontSize={11}>{user?.email}</Text>       
          </View>
      </View>
      <SignOutButton />
    </View>
  )
}

const styles = StyleSheet.create({
  user: {
    padding: 20,
    flex:1
  },
  userInfos: {
    padding: 20,
    backgroundColor: "white",
    borderRadius:8,
    flexDirection: "column"

  },
  image: {
    width:60,
    height:60,
    borderRadius:30,
    backgroundColor: "#f2f2f2",
    marginBottom: 18
  }
})

export default User;