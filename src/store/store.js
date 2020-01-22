import Vue from 'vue';
import Vuex from 'vuex';

import router from '../router/router';

var firebase = require('firebase/app'); //Firebase

Vue.use(Vuex);

export default new Vuex.Store({
	// Variables
	state: {
		usuario: '',
		error: ''
	},
	// Funciones que se ejecturan
	mutations: {
		setUsuario(state, payload) {
			state.usuario = payload;
		},
		setError(state, payload) {
			state.error = payload;
		}
	},
	actions: {
		crearUsuario({ commit }, payload) {
			firebase
				.auth()
				.createUserWithEmailAndPassword(payload.email, payload.password)
				.then(resp => {
					commit('setUsuario', { email: resp.user.email, uid: resp.user.uid });
					router.push({ name: 'inicio' });
				})
				.catch(err => {
					commit('setError', err.message);
				});
		},
		ingresoUsuario({ commit }, payload) {
			firebase
				.auth()
				.signInWithEmailAndPassword(payload.email, payload.password)
				.then(resp => {
					commit('setUsuario', { email: resp.user.email, uid: resp.user.uid });
					router.push({ name: 'inicio' });
				})
				.catch(err => {
					commit('setError', err.message);
				});
		},
		detectarUsuario({ commit }, payload) {
			if (payload != null) {
				commit('setUsuario', { email: payload.email, uid: payload.uid });
			} else {
				commit('setUsuario', null);
			}
		},
		cerrarSesion({ commit }, payload) {
			firebase.auth().signOut();
			commit('setUsuario', null);
			router.push({ name: 'ingreso' });
		}
	},
	getters: {
		existeUsuario(state) {
			if (
				state.usuario === null ||
				state.usuario === '' ||
				state.usuario === undefined
			) {
				return false;
			} else {
				return true;
			}
		}
	},

	modules: {}
});
