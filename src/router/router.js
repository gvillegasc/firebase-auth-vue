import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

var firebase = require('firebase/app'); //Firebase

const routes = [
	{
		path: '/',
		name: 'inicio',
		component: () =>
			import(/* webpackChunkName: "inicio" */ '../pages/Inicio.page.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/registro',
		name: 'registro',
		component: () =>
			import(/* webpackChunkName: "registro" */ '../pages/Registro.page.vue')
		// Validar autenticacion
	},
	{
		path: '/ingreso',
		name: 'ingreso',
		component: () =>
			import(/* webpackChunkName: "ingreso" */ '../pages/Ingreso.page.vue')
	},
	{
		path: '/agregar',
		name: 'agregar',
		component: () =>
			import(/* webpackChunkName: "agregar" */ '../pages/Agregar.page.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/editar/:id',
		name: 'editar',
		component: () =>
			import(/* webpackChunkName: "editar" */ '../pages/Editar.page.vue'),
		meta: { requiresAuth: true }
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

router.beforeEach((to, from, next) => {
	const rutaProtegida = to.matched.some(record => record.meta.requiresAuth);
	const user = firebase.auth().currentUser;
	if (rutaProtegida === true && user === null) {
		next({ name: 'ingreso' });
	} else {
		next();
	}
});

export default router;
