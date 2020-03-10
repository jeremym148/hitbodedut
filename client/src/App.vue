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
.v-application {
    font-family: "Roboto", sans-serif;
    line-height: 1.5;
    margin: auto 25%;
    box-shadow:
  0 2.8px 2.2px rgba(0, 0, 0, 0.034),
  0 6.7px 5.3px rgba(0, 0, 0, 0.048),
  0 12.5px 10px rgba(0, 0, 0, 0.06),
  0 22.3px 17.9px rgba(0, 0, 0, 0.072),
  0 41.8px 33.4px rgba(0, 0, 0, 0.086),
  0 100px 80px rgba(0, 0, 0, 0.12);
}

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

 @media screen and (max-width: 1024px) {

  .v-application {
      margin: auto;
      box-shadow: none;
  }
}


</style>


