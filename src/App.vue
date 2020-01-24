<template>
  <div id="app" class="container mt-5">
    <div id="nav" class="mb-5">
      <router-link
        :to="{name:'registro'}"
        v-if="!existeUsuario"
        class="btn btn-primary mx-2"
      >Registro</router-link>
      <router-link :to="{name:'ingreso'}" v-if="!existeUsuario" class="btn btn-primary mx-2">Ingreso</router-link>
      <router-link :to="{name:'inicio'}" v-if="existeUsuario" class="btn btn-primary mx-2">Inicio</router-link>
      <a class="btn btn-danger mx-2" @click="cerrarSesion" v-if="existeUsuario">Cerrar sesion</a>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  methods: {
    ...mapActions(["cerrarSesion"])
  },
  computed: {
    ...mapGetters(["existeUsuario"])
  }
};
</script>

<style>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
