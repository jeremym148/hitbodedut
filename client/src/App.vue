<template>
  <v-app>
    <v-app-bar
      app
      class="header-bar"
    >
      <div class="header-bar-content">
        <img src="./assets/haesh.png" class="header-img">
        <div class="header-bar-title">HITBODEDUT</div>
        <img src="./assets/haesh.png" class="header-img">
      </div>
    </v-app-bar>

    <v-content>
      <Home />
      <Calendar />
    </v-content>
  </v-app>
</template>

<script>
import Home from './views/Home';
import Calendar from './components/Calendar';

export default {
  name: 'App',
  components: {
    Home,
    Calendar,
  },
  methods:{
    showCreateModal(){

    }
  },
  data: () => ({
    dialog: false
  }),
  mounted(){
    
  },
};
</script>

<style>
.header-bar{
  background-color: #ebedf5;
}

.header-bar-content{
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.header-img{
  width: 75px;
}
.v-content{
  height: 100vh;
}
</style>


