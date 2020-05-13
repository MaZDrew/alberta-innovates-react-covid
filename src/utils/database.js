import firebase from './firebase';

const database = {};

const store = {

    initialize(){
      if (database.state) return;
      database.state = new firebase({
        apiKey: 'AIzaSyDoc83XG5wL6ObcXFKjhmzlbgqmKhdzZEY',
        authDomain: 'ml-covid.firebaseapp.com',
        databaseURL: 'https://ml-covid.firebaseio.com',
      });
    },

    async getGlobalData(statistic, scope) {

      const data = await database.state.ref.child(`/statistics/${scope}/${statistic}`)
        .once('value')
        .then(snapshot => snapshot.val());

      const valData = data.values;
      const predData = data.predictions;

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

      return {values, predictions, minRange, maxRange, maxDomain, minDomain}
    }
};

export default store;
