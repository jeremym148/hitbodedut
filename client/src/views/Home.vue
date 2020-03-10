<template>
  <div class="home">
    <div class="citation">
      <span class="citation-head">התבודדות הינה מעלה עליונה ביותר</span>
      <span class="citation-sub">רבי נחמן ליקוטי מוהר"ן תנינא כ"ה</span>
    </div>
    <span class="total-appointment">
      <span>There are currently:</span>
      <!-- <div class="heart"></div> -->
      <div class="heart-hit">
        <img src="../assets/heart.png" >
        <div class="number-of-hit">{{hitNow}}</div>
      </div>
    </span>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data () {
    return {
      hitNow: "9"
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
</script>

<style scoped>
.citation{
  display: flex;
  flex-direction: column;
}

.citation-head{
  font-size: 22px;
  text-align: center;
  padding-top: 10px;
}

.citation-sub{
  font-size: 12px;
  font-style: italic; 
  padding: 0 5px 8px;
}

.total-appointment{
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
}

.heart-hit{
    position: absolute;
    right: 70px;
    top: 38px;
}

.heart-hit img{
  animation: animate 1s linear infinite;
  width: 81px;
}

.number-of-hit{
  position: absolute;
    top: 26px;
    left: 45px;
    font-weight: 600;
    font-size: 22px;
    color: #ffffff;
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

/* .heart{
  width: 33px;
  position: relative;
  top: -25px;
  height: 33px;
  margin-right: 71px;
  background:#ff0036;
  transform: rotate(45deg) translate(10px,10px);
  animation: ani 1s linear infinite;
}

.heart:before{
  content: '';
  width: 100%;
  height: 100%;
  background: #ff0036;
  position: absolute;
  top:-50%;
  left:0;
  border-radius: 50%;
}

.heart:after{
  content:'';
  width: 100%;
  height: 100%;
  background: #ff0036;
  position: absolute;
  bottom:0;
  right:50%;
  border-radius: 50%;
} */


/* @keyframes ani{
  0%{
    transform: rotate(45deg) translate(10px,10px) scale(1);
  }
  25%{
    transform: rotate(45deg) translate(10px,10px) scale(1);
  }
  30%{
    transform: rotate(45deg) translate(10px,10px) scale(1.4);
  }
  50%{
    transform: rotate(45deg) translate(10px,10px) scale(1.2);
  }
  70%{
    transform: rotate(45deg) translate(10px,10px) scale(1.4);
  }
  90%{
    transform: rotate(45deg) translate(10px,10px) scale(1);
  }
  100%{
    transform: rotate(45deg) translate(10px,10px) scale(1);
  }
} */
</style>