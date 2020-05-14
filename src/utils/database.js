import firebase from './firebase';

const database = {};

const store = {

    initialize(){
      if (database.state) return;
      database.state = new firebase({
        apiKey: '',
        authDomain: '',
        databaseURL: '',
      });
    },

    async getHistoricalData(statistic, scope, date) {

      const historyData = await database.state.ref.child(`/statistics/${scope}/${statistic}/history/${date}`)
        .once('value')
        .then(snapshot => snapshot.val());

      const history = [];
      for (var i in historyData){
        const obj = historyData[i]
        obj.x = new Date(obj.x)
        history.push(obj)
      }

      return {history}
    },

    async getGlobalData(statistic, scope) {

      const data = await database.state.ref.child(`/statistics/${scope}/${statistic}`)
        .once('value')
        .then(snapshot => snapshot.val());

      const valData = data.values;
      const predData = data.predictions;

      const historyData = data.history || {};
      const lastUpdatedTrueValue = data.lastUpdated;

      const maxRange = data.range.maxRange;
      const minRange = data.range.minRange;
      const maxDomain = new Date(data.domain.maxDomain);
      const minDomain = new Date(data.domain.minDomain);

      const values = [];
      for (var i in valData){
        const obj = valData[i]
        obj.x = new Date(obj.x)
        values.push(obj)
      }

      const predictions = [];
      for (var j in predData){
        const obj = predData[j]
        obj.x = new Date(obj.x)
        predictions.push(obj)
      }

      const historyList = Object.keys(historyData);
      historyList.unshift(lastUpdatedTrueValue);

      return {
         values, predictions, historyList, lastUpdatedTrueValue,
         minRange, maxRange, maxDomain, minDomain
      }
    }
};

export default store;
