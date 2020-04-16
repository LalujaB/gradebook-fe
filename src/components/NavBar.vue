<template>
    <nav class="navbar navbar-expand-sm bg-primary navbar-dark top">
    <ul class="navbar-nav">
    <li class="nav-item">
      <router-link  v-if="user" class="nav-link" to="/gradebooks">Gradebooks</router-link>
    </li>
        <li class="nav-item dropdown">
            <router-link  v-if="user" class="nav-link dropdown-toggle" to="#" id="navbardrop" data-toggle="dropdown">My Gradebook</router-link>
            <div class="dropdown-menu">
                <router-link class="dropdown-item" v-if="user" :to="{ name: 'my-gradebook', params: { id: user.id }}">My Gradebook</router-link>
                <router-link class="dropdown-item" v-if="user" to="/create-gradebook">Add Gradebook</router-link>
            </div>
        </li>

    <li class="nav-item dropdown">
      <router-link  v-if="user" class="nav-link dropdown-toggle" to="#" id="navbardrop" data-toggle="dropdown">
        Professors
      </router-link>
      <div class="dropdown-menu">
        <router-link  v-if="user" class="dropdown-item" to="/all-professors">All Professors</router-link>
        <router-link class="dropdown-item" v-if="user" to="/create-professor">Add Professor</router-link>
      </div>
    </li>
    </ul>
  <ul class="navbar-nav">
      <router-link class="nav-item nav-link" to="/login" v-if="!user">Sign in</router-link>
      <a href="#" class="nav-item nav-link" v-if="user" @click="logoutUser()">Sign out</a>
      <li class="nav-item" v-if="!user">
        <router-link class="nav-link" to="/register">Register</router-link>
    </li>
  </ul>
</nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
      return {
        professor:{},
        loggedUser:'',
      }
    },
    methods: {
       ...mapActions({
        logout: 'logout'
      }),
      logoutUser() {
        localStorage.clear();
        this.logout().then(() => {
          this.$router.push('/login');
        })
      }
    },
    computed: {
      ...mapGetters({
        user: "getUser"
      })
  }
}

</script>
<style>
.top {
    justify-content: space-between;
}
</style>
