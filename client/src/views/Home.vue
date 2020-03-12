<template>
  <div class="home">
    <div class="home__citation">
      <span class="home__citation-head">התבודדות הינה מעלה עליונה ביותר</span>
      <span class="home__citation-source">רבי נחמן ליקוטי מוהר"ן תנינא כ"ה</span>
    </div>
    <span class="home__total">
      <span>There are currently:</span>
      <!-- <div class="heart"></div> -->
      <div class="home__heart-hit">
        <img src="../assets/heart.png" >
        <div class="home__number-of-hit">{{hitNow}}</div>
      </div>
    </span>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: 'Home',
  data () {
    return {
      hitNow: "0"
    }
  },
  components: {
    
  }, 
  mounted(){
      axios
        .get("/api/slots/current")
        .then(response => {
          console.log(response.data.count)
          this.hitNow = response.data.count;
        })
  }
}
</script>

<style lang="scss">

.home{

  &__citation{
    display: flex;
    flex-direction: column;
    padding: 0 10px;
  }

  &__citation-head{
    font-size: 22px;
    text-align: center;
    padding-top: 10px;
  }

  &__citation-source{
    font-size: 12px;
    font-style: italic; 
    padding: 0 5px 8px;
    text-align: center;
  }

  &__total{
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
  }

  &__heart-hit{
      position: absolute;
      right: 70px;
      top: 38px;
      z-index: 5;
  }

  &__heart-hit img{
    animation: animate 1s linear infinite;
    width: 75px;
  }

  &__number-of-hit{
    position: absolute;
      top: 26px;
      left: 42px;
      font-weight: 600;
      font-size: 22px;
      color: #ffffff;
  }
}

@keyframes animate{
  0%{
    transform: rotate(0deg) translate(10px,10px) scale(1);
  }
  25%{
    transform: rotate(0deg) translate(10px,10px) scale(1);
  }
  30%{
    transform: rotate(0deg) translate(10px,10px) scale(1.4);
  }
  50%{
    transform: rotate(0deg) translate(10px,10px) scale(1.2);
  }
  70%{
    transform: rotate(0deg) translate(10px,10px) scale(1.4);
  }
  90%{
    transform: rotate(0deg) translate(10px,10px) scale(1);
  }
  100%{
    transform: rotate(0deg) translate(10px,10px) scale(1);
  }
}

 @media screen and (max-width: 1024px) {
  
  .home{

    &__heart-hit{
        position: absolute;
        right: 50px;
        top: 50px;
    }

    &__heart-hit img{
      animation: animate 1s linear infinite;
      width: 60px;
    }

    &__number-of-hit{
      position: absolute;
        top: 20px;
        left: 35px;
        font-weight: 600;
        font-size: 22px;
        color: #ffffff;
    }

    &__citation-source{
      text-align: left;
    }
  
  }

}
</style>