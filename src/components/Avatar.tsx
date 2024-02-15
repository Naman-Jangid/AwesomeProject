import React, {ReactElement} from 'react';
import {StyleSheet, Image} from 'react-native';
import PressableWrapper from './PressableWrapper';
import {useNavigation} from '@react-navigation/native';
import {SCREEN} from '../utils/constants';

interface AvatarInterface {
  src?: string;
  avatarBoxStyle?: any;
}

const Avatar = ({src, avatarBoxStyle}: AvatarInterface): ReactElement => {
  const navigation = useNavigation();
  const avatarBoxStyles = [styles.avatar, avatarBoxStyle];
  return (
    <PressableWrapper
      onPress={() => navigation.navigate(SCREEN.SETTINGS_NAVIGATOR)}
      wrapperStyle={[avatarBoxStyles]}>
      <Image source={{uri: src}} style={styles.avatarImg} />
    </PressableWrapper>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImg: {
    height: 40,
    width: 40,
    borderRadius: 50,
    resizeMode: 'cover',
  },
});

export default Avatar;
