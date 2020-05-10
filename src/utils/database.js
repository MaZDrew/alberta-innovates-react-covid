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

    async getGlobalData(statistic) {

      const data = await database.state.ref.child(`/statistics/global/${statistic}`)
        .once('value')
        .then(snapshot => snapshot.val());

      const valData = data.values;
      const predData = data.predictions;

      const maxRange = data.maxRange;
      const maxDomain = new Date(data.maxDomain);
      const minDomain = new Date(data.minDomain);

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

      return {values, predictions, maxRange, maxDomain, minDomain}
    }
};

export default store;
