<template>
  <div id="Transaction">
    <br /><br />    
    Cantidad: <input type="text" placeholder="Cantidad" v-model="cantidad" /> <br /><br />
    <button v-on:click="makeTransaction">Hacer transacción</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Transaction",
  methods: {
    makeTransaction: function() {

      var data = {
        username: localStorage.getItem("current_username"),
        value: this.cantidad        
      }

      axios.put("http://localhost:8000/user/transaction/", data)
      .then(response => {
          alert("La transacción se realizo con exito");
          this.$router.push({name: "user_balance", params: { username: data.username } });
      })
      .catch((error) => {
        alert("ERROR Servidor");
      });
    }
  }    
}
</script>