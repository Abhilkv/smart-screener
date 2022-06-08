import React from 'react';
import {View} from 'react-native';
import { Spinner } from 'native-base';
import styles from './styles';

const CustomLoader = () => {
  return (
    <View style={styles.overlay}>
      <Spinner color='#356589' />
    </View>
  );
};

export default CustomLoader;
