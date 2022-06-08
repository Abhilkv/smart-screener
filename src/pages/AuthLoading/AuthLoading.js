import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, BackHandler, ScrollView, TouchableOpacity } from 'react-native';
import { Neomorph } from 'react-native-neomorph-shadows';
import { connect } from 'react-redux';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import PropTypes from 'prop-types';

import { getStockList, getAppVersion, signInUser, getScrips, arrangeStockList } from './apis';
import OneRedButtonPopUp from '../../components/OneRedButtonPopUp/OneRedButtonPopUp';
import styles from './styles';

const categories = [
  {
    id: 1,
    name: 'narrow cpr',
    screenName: 'NarrowCpr'
  },
  {
    id: 2,
    name: 'yes hig Cov',
    screenName: 'YesterdayLowCover'
  },
  {
    id: 3,
    name: 'yes low Cov',
    screenName: 'NarrowCpr'
  },
];

const AuthLoading = (props) => {
  const { versionAllowed, feedToken, navigation } = props;
  const [loading, setLoading] = useState(false);
  const [buttonDimension, setDimension] = useState(0);
  const [hr, setHr] = useState(0);
  const [min, setMin] = useState(0);

  useEffect(() => {
    checkVersion();
    getTime();
  }, []);

  useEffect(() => {
    if (versionAllowed) {
      checkStocks();
      signInUser();
    }
  }, [versionAllowed]);

  const checkVersion = async () => {
    setLoading(true)
    await getAppVersion();
    setLoading(false)
  }

  const checkStocks = async () => {
    setLoading(true)
    await getStockList();
    await arrangeStockList();
    setLoading(false)
  }

  const getTime = () => {
    const currentTime = new Date();
    const currentOffset = currentTime.getTimezoneOffset();
    const ISTOffset = 330;   // IST offset UTC +5:30 
    const ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);
    // ISTTime now represents the time in IST coordinates
    const hoursIST = ISTTime.getHours();
    const minutesIST = ISTTime.getMinutes();
    setHr(Number(hoursIST));
    setMin(Number(minutesIST));
  }

  const renderModelAndButton = () => {
    let modelComp = null;
    modelComp = (
      <>
        <StatusBar translucent backgroundColor="#000000B2" />
        <OneRedButtonPopUp
          hasTitle
          title="Intruder Alert"
          description={`You are not authorised`}
          button1Text="Try Again"
          button1Color="#356589"
          button1Handler={() => BackHandler.exitApp()}
        />
      </>
    );
    return modelComp;
  };

  const setButtonView = (event) => {
    setDimension(event.nativeEvent.layout.width)
  }

  const arrangeGrid = categories.map((item, index) => {
    return (
      <TouchableOpacity
        style={styles.column}
        onLayout={setButtonView}
        onPress={() => {
          navigation.navigate(item.screenName)
        }}>
        <Neomorph
          inner // <- enable shadow inside of neomorph
          swapShadows // <- change zIndex of each shadow color
          style={{
            shadowRadius: 5,
            borderRadius: 25,
            backgroundColor: '#DDDDDD',
            width: buttonDimension,
            height: buttonDimension,
          }}
        />
        <View style={styles.absoluteButtonText}>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>)
  });


  return (
    <View style={styles.container}>
      <View style={[styles.absolutePositioner]}>
        <Text>Api checked on {hr + ' : ' + min + '  '}</Text><View style={[feedToken ? styles.feedAvailible : styles.feedNotAvailible]} />
      </View>
      {loading && <CustomLoader />}
      {!versionAllowed && renderModelAndButton()}
      <Text style={styles.salutation}>Hi,</Text>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.buttonGrp}>
          {arrangeGrid}
        </View>
      </ScrollView>
    </View>
  );
};

AuthLoading.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

function mapStateToProps({ auth, check }) {
  return {
    versionAllowed: check.versionAllowed,
    feedToken: auth.feedToken,
    allStocks: auth.allStocks
  };
}

export default connect(mapStateToProps, null)(AuthLoading);
