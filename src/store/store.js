import Vue from 'vue';
import Vuex from 'vuex';

import router from '../router/router';

var firebase = require('firebase/app'); //Firebase

import db from '../main';

Vue.use(Vuex);

export default new Vuex.Store({
	// Variables
	state: {
		usuario: '',
		error: '',
		tareas: [],
		tarea: { nombre: '', id: '' }
	},
	// Funciones que se ejecturan
	mutations: {
		setUsuario(state, payload) {
			state.usuario = payload;
		},
		setError(state, payload) {
			state.error = payload;
		},
		setTareas(state, tareas) {
			state.tareas = tareas;
		},
		setTarea(state, tarea) {
			state.tarea = tarea;
		},
		eliminarTareaLista(state, id) {
			state.tareas = state.tareas.filter(doc => {
				return doc.id != id;
			});
		}
	},
	actions: {
		crearUsuario({ commit }, payload) {
			firebase
				.auth()
				.createUserWithEmailAndPassword(payload.email, payload.password)
				.then(resp => {
					commit('setUsuario', { email: resp.user.email, uid: resp.user.uid });

					// Crear una coleccion con el id del usuario
					db.collection(resp.user.email)
						.add({
							nombre: 'Tarea de ejemplo'
						})
						.then(() => {
							router.push({ name: 'inicio' });
						});
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
		},
		// Obtener todas las tareas
		getTareas({ commit }) {
			const usuario = firebase.auth().currentUser;
			const tareas = [];
			db.collection(usuario.email)
				.get()
				.then(snapshot => {
					snapshot.forEach(doc => {
						let tarea = doc.data();
						tarea.id = doc.id;
						tareas.push(tarea);
					});
				});
			commit('setTareas', tareas);
		},
		// Obtener 1 tarea mediante el id
		getTarea({ commit }, id) {
			const usuario = firebase.auth().currentUser;
			db.collection(usuario.email)
				.doc(id)
				.get()
				.then(doc => {
					let tarea = doc.data();
					tarea.id = doc.id;
					commit('setTarea', tarea);
				});
		},
		// Editar tarea
		editarTarea({ commit }, tarea) {
			const usuario = firebase.auth().currentUser;
			db.collection(usuario.email)
				.doc(tarea.id)
				.update({
					nombre: tarea.nombre
				})
				.then(() => {
					router.push({ name: 'inicio' });
				});
		},
		// Crear tarea
		crearTarea({ commit }, nombre) {
			const usuario = firebase.auth().currentUser;
			db.collection(usuario.email)
				.add({
					nombre: nombre
				})
				.then(doc => {
					console.log(doc.id);
					router.push({ name: 'inicio' });
				});
		},
		// Eliminar tarea
		eliminarTarea({ commit, dispatch }, id) {
			db.collection('tareas')
				.doc(id)
				.delete()
				.then(() => {
					console.log('Tarea eliminada');
					commit('eliminarTareaLista', id); // para eliminar de la lista
				});
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
