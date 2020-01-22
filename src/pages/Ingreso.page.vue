<template>
  <div>
    <h1>Ingreso de usuarios</h1>
    <form @submit.prevent="ingresoUsuario({email, password})">
      <input type="text" v-model="email" />
      <input type="password" v-model="password" />
      <button type="submit">Acceder</button>
    </form>
    {{error}}
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Ingreso",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["ingresoUsuario"])
  },
  computed: { ...mapState(["error"]) }
};
</script>