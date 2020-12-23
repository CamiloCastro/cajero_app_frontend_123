<template>
  <div id="UserRole">
    <div class="continer_user_role">
      <h2>Cambio de rol {{ username }}</h2>
      <form v-on:submit.prevent="processRole">

        <select v-model="selected_role">
          <option v-for = "role in user_roles" v-bind:key="role.role_name">

            {{ role.role_name }}

          </option>
          
        </select>

        <br />                
        <button type="submit">Cambiar rol</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserRole",
  data: function () {
    return {
      username: "none",
      selected_role: localStorage.getItem("current_user_role"),
      user_roles: []
    };
  },
  methods: {
    processRole: function () {
      var self = this;
      localStorage.setItem("current_user_role", this.selected_role);
      this.$router.go()
    },
  },
  created: function () {
    var self = this;
    this.username = this.$route.params.username;
    axios.get("http://localhost:8000/user/roles/" + this.username)
    .then((response) => {
      self.user_roles = response.data;
    })
    .catch((error) => {
      alert("No se pudo consultar los roles")
    });
  },
};
</script>

<style>
#UserRole {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.continer_user_role {
  border: 3px solid #283747;
  border-radius: 10px;
  width: 25%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#UserRole h2 {
  color: #283747;
}
#UserRole form {
  width: 50%;
}

#UserRole form span {
  color: #6e0505;
}

#UserRole select {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
  border: 1px solid #283747;
}
#UserRole button {
  width: 100%;
  height: 40px;
  color: #e5e7e9;
  background: #283747;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0;
}
#UserRole button:hover {
  color: #e5e7e9;
  background: crimson;
  border: 1px solid #283747;
}
</style>