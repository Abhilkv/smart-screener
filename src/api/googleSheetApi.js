import store from '../store/index';
import Tabletop from "tabletop";

export default async function googleSheetApiCall(payload) {
  const {
    TYPES,
    key
  } = payload;

  await Tabletop.init({
    key: key,
    simpleSheet: true
  }
  ).then(async (data) => {
    await store.dispatch({
      type: TYPES.successType,
      res: data,
    });
  }).catch((err) => {
    console.warn(err);
  });
  return null;
}