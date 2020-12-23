<template>
  <div id="UserCreate">
    <div class="continer_user_create">
      <h2>Creación de usuario</h2>
      <form v-on:submit.prevent="processCreate">
        <input type="text" v-model="user_in.username" placeholder="Nombre de usuario" />
        <br />
        <input type="password" v-model="user_in.password" placeholder="Contraseña" />
        <br />
        <input type="password" v-model="user_in.repeat_password" placeholder="Repetir contraseña" />
        <br />
        <input type="number" min="0" v-model="user_in.balance" placeholder="Saldo inicial" />
        <br />
        <span>{{mensajeError}}</span>        
        <button type="submit">Crear usuario</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserCreate",
  data: function () {
    return {
      user_in: {
        username: "",
        password: "",
        repeat_password: "",
        balance: ""
      },
      mensajeError: "",
      username: ""
    };
  },
  methods: {
    processCreate: function () {
      var self = this;     

      axios
        .post("http://localhost:8000/user/create/", self.user_in, {
          headers: {Authorization: self.username},
        })
        .then((result) => {
          alert("Usuario creado exitosamente");
          self.mensajeError = "";
          self.user_in.username = "";
          self.user_in.password = "";
          self.user_in.repeat_password = "";
          self.user_in.balance = "";
        })
        .catch((error) => {
          self.mensajeError = error.response.data.detail
        });      
    },
  },
  created: function () {
    this.username = this.$route.params.username;
  },
};
</script>

<style>
#UserCreate {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.continer_user_create {
  border: 3px solid #283747;
  border-radius: 10px;
  width: 25%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#UserCreate h2 {
  color: #283747;
}
#UserCreate form {
  width: 50%;
}

#UserCreate form span {
  color: #6e0505;
}

#UserCreate input {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
  border: 1px solid #283747;
}
#UserCreate button {
  width: 100%;
  height: 40px;
  color: #e5e7e9;
  background: #283747;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0;
}
#UserCreate button:hover {
  color: #e5e7e9;
  background: crimson;
  border: 1px solid #283747;
}
</style>