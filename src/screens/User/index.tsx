import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Image, StyleSheet, View } from 'react-native';
import { auth } from '../../../data/firebase';
import Button from '../../components/Button';
import SignOutButton from '../../components/SignOutButton';
import Text from '../../components/Text';

const User = ({navigation}) => {
  const [user] = useAuthState(auth);

  console.log('user', user);

  const onSeeGroupsButtonPress = () => {
    navigation.navigate('Groups');
  };

  return (
    <View style={styles.user}>
      <View style={styles.userInfos}>
        <Image
          source={{
            uri: user?.photoURL || undefined,
          }}
          style={styles.image}
        />
        <View>
          <Text weight="700" fontSize={13}>Olá, {user?.displayName}!</Text>
          <Text weight="500" fontSize={11}>{user?.email}</Text>
        </View>
      </View>
      <View style={styles.optionsInfos}>
        <Button type="secondary" onPress={onSeeGroupsButtonPress}>Ver Grupos</Button>
        <SignOutButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  user: {
    padding: 20,
    flex:1,
  },
  userInfos: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius:8,
  },
  optionsInfos: {
    marginTop: 10,
  },
  image: {
    width:60,
    height:60,
    borderRadius:30,
    backgroundColor: '#f2f2f2',
    marginBottom: 18,
  },
});

export default User;
