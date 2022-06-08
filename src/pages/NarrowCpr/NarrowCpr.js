import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import PropTypes from 'prop-types';

import styles from './styles';


const NarrowCpr = (props) => {
  const { stocks, feedToken } = props;
  const [stockWithCprWidth, setStocks] = useState([...stocks]);

  const listStocks = useCallback(() => {
    const stockList = Array.isArray(stockWithCprWidth) && stockWithCprWidth.map((item) =>
      <View style={{ flexDirection: 'row' }}><Text>{item.STOCK}</Text><Text>{`  -  ${item.CPRWIDTH}`}</Text></View>
    );
    return (
      <View>{stockList}</View>
    );
  },[stockWithCprWidth])

  useEffect(() => {
    calculateCpr()
  }, [])

  useEffect(() => {
    console.log(stockWithCprWidth);
  }, [stockWithCprWidth])


  const calculateCpr = async () => {
    var newStockListWithCpr = stocks;
    stocks.sort((a, b) => (Number(a.CPRWIDTH)) - (Number(b.CPRWIDTH)));
    setStocks(newStockListWithCpr);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.absolutePositioner]}>
        <View style={[feedToken ? styles.feedAvailible : styles.feedNotAvailible]} />
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainerStyle}>
        {listStocks()}
      </ScrollView>
    </View>
  );
};

NarrowCpr.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

function mapStateToProps({ auth, check }) {
  return {
    stocks: auth.stocks,
  };
}

export default connect(mapStateToProps, null)(NarrowCpr);
