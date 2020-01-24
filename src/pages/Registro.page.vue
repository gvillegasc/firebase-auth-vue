<template>
  <div>
    <h1>Registro de usuarios</h1>
    <form @submit.prevent="crearUsuario({email:email, password:password1})">
      <div class="form-group">
        <input class="form-control" type="email" v-model="email" />
      </div>
      <div class="form-group">
        <input class="form-control" type="password" v-model="password1" />
      </div>
      <div class="form-group">
        <input class="form-control" type="password" v-model="password2" />
      </div>
      <button class="btn btn-success" type="submit" :disabled="!desactivar">Crear Usuario</button>
    </form>
    <p>{{error}}</p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Registro",
  data() {
    return {
      email: "",
      password1: "",
      password2: ""
    };
  },
  methods: {
    ...mapActions(["crearUsuario"])
  },
  computed: {
    ...mapState(["error"]),
    desactivar() {
      return this.password1 === this.password2 && this.password1 != "";
    }
  }
};
</script>