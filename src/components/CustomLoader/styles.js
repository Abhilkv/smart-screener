import {ScaledSheet} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  overlay: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
  },
});

export default styles;
