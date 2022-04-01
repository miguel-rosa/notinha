import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { auth } from '../../../data/firebase';


const UserButton = ({navigation}) => {
  const [user] = useAuthState(auth);
  return (
    <TouchableOpacity accessibilityRole="button" onPress={() => navigation.navigate('User') }>
      <Image style={{width: 24, height:24, borderRadius:12, backgroundColor:'red'}}
        source={{uri: user?.photoURL || undefined}} />
    </TouchableOpacity>
  );
};

export default UserButton;
