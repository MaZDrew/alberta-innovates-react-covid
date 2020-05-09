import firebase from './firebase';
import Config from '../config/config.json';

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

    async getValues(){
      const values = await database.state.ref.child('/statistics/global/deaths/values')
        .once('value')
        .then(snapshot => snapshot.val());

      console.log(values);
      const data = [];
      for (var i in values){
        const obj = values[i]
        obj.x = new Date(obj.x)
        data.push(obj)
      }
      return data
    },

    async getPredictions(){
      const values = await database.state.ref.child('/statistics/global/deaths/predictions')
        .once('value')
        .then(snapshot => snapshot.val());

      console.log(values);
      const data = [];
      for (var i in values){
        const obj = values[i]
        obj.x = new Date(obj.x)
        data.push(obj)
      }
      return data
    }
};

export default store;
