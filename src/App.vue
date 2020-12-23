<template>
  <div id="app">
    <div class="header">
      <h1>Banco UN</h1>
      <nav>
        <button v-on:click="init" v-if="is_auth">Inicio</button>

        <button v-on:click="getBalance" v-if="is_usuario">Saldo</button>
        <button v-on:click="doTransaction" v-if="is_usuario">Transacción</button>

        <button v-on:click="getUserCreate" v-if="is_banco">Registro cuenta</button>
        <button v-on:click="getUserModifyBalance" v-if="is_banco">Modificación Balance</button>

        <button v-on:click="getUserRole" v-if="is_auth">Cambiar rol</button>
        <button v-on:click="logOut" v-if="is_auth">Cerrar Sesión</button>
      </nav>
    </div>
    <div class="main-component">
      <router-view v-on:log-in="logIn"></router-view>
    </div>
    <div class="footer">
      <h2>Misión TIC 2022</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: function () {
    return {
      is_auth: localStorage.getItem("isAuth") || false,
      is_banco: localStorage.getItem("current_user_role") === "BANCO",
      is_usuario: localStorage.getItem("current_user_role") === "USUARIO"      
    };
  },
  methods: {
    updateAuth: function () {
      var self = this;
      self.is_auth = localStorage.getItem("isAuth") || false;
      self.is_banco = localStorage.getItem("current_user_role") === "BANCO";
      self.is_usuario = localStorage.getItem("current_user_role") === "USUARIO";

      if (self.is_auth == false)
       self.$router.push({ name: "user_auth" });
      else {
        let username = localStorage.getItem("current_username");
        self.$router.push({ name: "user", params: { usuario: username } });
      }
    },
    logIn: function (username, user_role) {
      localStorage.setItem('current_user_role', user_role)
      localStorage.setItem('current_username', username)
      localStorage.setItem('isAuth', true)
      this.updateAuth()
    },
    logOut: function () {
      localStorage.removeItem('current_user_role')
      localStorage.removeItem('isAuth')
      localStorage.removeItem('current_username')
      this.updateAuth()
    },
    init: function () {
      if (this.$route.name != "user") {
        let username = localStorage.getItem("current_username");
        this.$router.push({ name: "user", params: { usuario: username } });
      }
    },
    getUserRole: function() {
      let username = localStorage.getItem("current_username")
      this.$router.push({name: "user_role", params:{ username: username }})
    },
    getUserCreate: function () {
      let username = localStorage.getItem("current_username")
      this.$router.push({name: "user_create", params:{ username: username }})
    },
    getUserModifyBalance: function () {
      let username = localStorage.getItem("current_username")
      this.$router.push({name: "user_modify_balance", params:{ username: username }})
    },
    getBalance: function () {
      if (this.$route.name != "user_balance") {
        let username = localStorage.getItem("current_username");
        this.$router.push({
          name: "user_balance",
          params: { username: username },
        });
      }
    },
    doTransaction: function(){
      let username = localStorage.getItem("current_username")
      this.$router.push({name: "user_transaction", params:{ username: username }})
    },
  },  
  created: function(){
    this.$router.push({name: "principal"})
    this.updateAuth()
  }
};
</script>

<style>
body {
  margin: 0 0 0 0;
}
.header {
  margin: 0%;
  padding: 0;
  width: 100%;
  height: 10vh;
  min-height: 100px;
  background-color: #283747;
  color: #e5e7e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header h1 {
  width: 20%;
  text-align: center;
}
.header nav {
  height: 100%;
  width: 55%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
}

.header nav button {
  color: #e5e7e9;
  background: #283747;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  padding: 10px 20px;
}
.header nav button:hover {
  color: #283747;
  background: #e5e7e9;
  border: 1px solid #e5e7e9;
}
.main-component {
  height: 75vh;
  margin: 0%;
  padding: 0%;
  background: #fdfefe;
}
.footer {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 10vh;
  min-height: 100px;
  background-color: #283747;
  color: #e5e7e9;
}
.footer h2 {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
