<template>
  <div>
    <h1>Ingreso de usuarios</h1>
    <form @submit.prevent="ingresoUsuario({email, password})">
      <div class="form-group">
        <input type="text" class="form-control" v-model="email" />
      </div>
      <div class="form-group">
        <input type="password" class="form-control" v-model="password" />
      </div>
      <button type="submit" class="btn btn-success">Acceder</button>
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