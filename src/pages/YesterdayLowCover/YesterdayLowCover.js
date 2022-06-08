import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import {
  atos,
} from '../../utilities/operationsUtils';
import PropTypes from 'prop-types';
import { decode as atob } from 'base-64';
const pako = require('pako');

import styles from './styles';
let socket;
var strwatchlistscrips = "bse_cm|532921&bse_cm|500008&bse_cm|500425&bse_cm|508869&bse_cm|500877&bse_cm|500477&bse_cm|500820&bse_cm|524804&bse_cm|532215&bse_cm|500034&bse_cm|532134&bse_cm|500043&bse_cm|500049&bse_cm|500493&bse_cm|532454&bse_cm|500103&bse_cm|532523&bse_cm|500547&bse_cm|532321&bse_cm|532483&bse_cm|500087&bse_cm|533278&bse_cm|500830&bse_cm|532488&bse_cm|532868&bse_cm|500124&bse_cm|532155&bse_cm|532296&bse_cm|517354&bse_cm|532281&bse_cm|500010&bse_cm|500440&bse_cm|500104&bse_cm|500696&bse_cm|535789&bse_cm|532174&bse_cm|532514&bse_cm|532187&bse_cm|534816&bse_cm|500209&bse_cm|530965&bse_cm|500875&bse_cm|500228&bse_cm|533155&bse_cm|500247&bse_cm|533519&bse_cm|500253&bse_cm|500510&bse_cm|500257&bse_cm|500520&bse_cm|532720&bse_cm|532819&bse_cm|517334&bse_cm|532555&bse_cm|532522&bse_cm|532810&bse_cm|532461&bse_cm|532898&bse_cm|532955&bse_cm|500325&bse_cm|511218&bse_cm|524715&bse_cm|532733&bse_cm|500770&bse_cm|500570&bse_cm|500470&bse_cm|532540&bse_cm|532755&bse_cm|500114&bse_cm|532343&bse_cm|532478&bse_cm|512070&bse_cm|500295&bse_cm|500575&bse_cm|507685&bse_cm|505537";

const YesterdayLowCover = (props) => {
  const { feedToken, clientCode, stocks, allStocks } = props;
  const [loading, setLoading] = useState(false);
  const [newStockListWithResult, setResult] = useState([]);

  useEffect(() => {
    let strwatchlistscrips = stocks.map((a, i) => `bse_cm|${a.BSE_TOKEN}${i === stocks.length - 1 ? '' : '&'}`).join('');
    getLiveData();
    return () => {
      removeLiveData();
    };
  }, []);

  const getLiveData = () => {
    var req1 = '{"task":"cn","channel":"","token":"' + feedToken + '","user": "' + clientCode + '","acctid":"' + clientCode + '"}';
    var req2 = '{"task":"mw","channel":"' + strwatchlistscrips + '","token":"' + feedToken + '","user": "' + clientCode + '","acctid":"' + clientCode + '"}';
    var req3 = '{"task":"hb","channel":"","token":"' + feedToken + '","user": "' + clientCode + '","acctid":"' + clientCode + '"}';
    socket = new WebSocket('wss://omnefeeds.angelbroking.com/NestHtml5Mobile/socket/stream', {
      rejectUnauthorized: false
    });
    setLoading(true);
    socket.onopen = () => {
      socket.send(req1);
      socket.send(req2);
      socket.send(req3);
    }
    socket.onmessage = (data) => {
      let strData = atob(data.data);
      var charData = strData.split('').map(function (x) { return x.charCodeAt(0); });
      var binData = new Uint8Array(charData);
      var result = atos(pako.inflate(binData));
      setSignal(result)
      setLoading(false);
    }
  }

  const removeLiveData = () => {
    socket.close && socket.close()
  }

  const setSignal = (currentPriceArray) => {
    const currentPrice = JSON.parse(currentPriceArray);
    const newStockListWithCprResult = stocks.map(obj => {
      let rObj = obj;
      rObj['ltp'] = '...';
      allStocks.forEach(elemento => {
        if (obj.STOCK === elemento.STOCK) {
          currentPrice.forEach(element => {
            if (
              obj.BSE_TOKEN === element.tk
            ) {
              const result = isBetween(Number((elemento.TP || '').replace(',', '')), Number((elemento.BP || '').replace(',', '')), Number((element.ltp || '').replace(',', '')));
              rObj['isBetween'] = result;
              rObj['ltp'] = (element||{}).ltp || '...';
            }
          });
          rObj['width'] = Math.abs(Number((elemento.TP || '').replace(',', '')) - Number((elemento.BP || '').replace(',', '')));
        }
      });
      return rObj
    });
    newStockListWithCprResult.sort((a, b) => (Number(a.width)) - (Number(b.width)));
    setResult(newStockListWithCprResult)
  }

  const isBetween = (a, b, value) => {
    maxValue = Math.max(a, b);
    minValue = Math.min(a, b);
    if ((value > minValue || value === minValue) && (value < maxValue || value === maxValue)) {
      return true;
    }
    else {
      return false;
    }
  }

  const listStocks = useCallback(() => {
    const stockList = Array.isArray(newStockListWithResult) && newStockListWithResult.map((item) =>
      <View style={{ alignItems: 'center', flexDirection: 'row', borderBottomWidth: 0.5, width: '100%' }}>
        <View style={{ flex: 1, alignItems: 'center', borderRightWidth: 0.4 }}>
          <Text style={{ color: '#263b80' }}>{item.STOCK}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRightWidth: 0.4, height: '100%' }}>
          {
            item.isBetween ?
              <Text style={{fontSize: 12, color: 'green', fontWeight: 'bold'}}>IN</Text> :
              <Text style={{fontSize: 10, color: '#e61f10', fontWeight: 'bold'}}>OUT</Text>
          }
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{fontSize: 12, color: 'green', fontWeight: 'bold'}}>{item.ltp||'...'}</Text> 
        </View>
      </View>
    );
    return (
      <View style={{ width: '100%', marginBottom: 15 }}>{stockList}</View>
    );
  }, [newStockListWithResult])

  return (
    <View style={styles.container}>
      {loading && <CustomLoader />}
      <View style={[styles.absolutePositioner]}>
        <View style={[feedToken ? styles.feedAvailible : styles.feedNotAvailible]} />
      </View>
      <View style={{
        alignItems: 'center', flexDirection: 'row', width: '100%', borderWidth: 0.5, borderColor: '#DDDDDD', marginTop: 20, backgroundColor: 'white'

      }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>Stock</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ color: 'black', fontWeight: 'bold' , fontSize: 18 }}>Cpr</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ color: 'black', fontWeight: 'bold' , fontSize: 18 }}>Ltp</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainerStyle}>
        {listStocks()}
      </ScrollView>
    </View>
  );
};

YesterdayLowCover.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

function mapStateToProps({ auth }) {
  return {
    stocks: auth.stocks,
    feedToken: auth.feedToken,
    clientCode: auth.clientCode,
    stocks: auth.stocks,
    allStocks: auth.allStocks
  };
}

export default connect(mapStateToProps, null)(YesterdayLowCover);
