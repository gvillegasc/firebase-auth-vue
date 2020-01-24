import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';

// Importacion de firebase **********************//
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');

var firebaseConfig = {
	apiKey: 'AIzaSyBrrY2vjKJpPgx_p00NZYz8D92N6YrpBVE',
	authDomain: 'vue-crud-d2cff.firebaseapp.com',
	databaseURL: 'https://vue-crud-d2cff.firebaseio.com',
	projectId: 'vue-crud-d2cff',
	storageBucket: 'vue-crud-d2cff.appspot.com',
	messagingSenderId: '546102954133',
	appId: '1:546102954133:web:6f2dfa9982ab48c464b39c'
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();

//***********************************************//

Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged(user => {
	console.log(user);
	if (user) {
		store.dispatch('detectarUsuario', { email: user.email, uid: user.uid });
	} else {
		store.dispatch('detectarUsuario', null);
	}
	new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount('#app');
});
