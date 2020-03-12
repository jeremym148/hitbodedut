<script>
import store from "../store";
import axios from 'axios'

export default {
    log(s){
        console.log(s)
    },
    getHebrewCal(){
        axios
        .get("https://www.hebcal.com/hebcal/?v=1&cfg=json&year=now&month=x&geo=geoname&geonameid=281184&m=50&d=on")
        .then(response => {
          console.log(response)

          // let response = {data:{"slots":[{"start":"2020-03-10 09:10","end":"2020-03-10 09:20","activityDate":"2020-04-03","name":"test"},{"start":"2020-04-03 09:10","end":"2020-04-03 09:20","activityDate":"Invalid date","name":"test2"}]}};
          // // let events = response.data.slots;
        //   console.log(response)
        //   console.log(response.data.slots)
        //   this.$store.dispatch("addEvents",response.data.slots)
          // response.data.slots.map((event) => {
          //    console.log(event)
          //   this.$store.dispatch("addEvent",{
          //     name: event.name,
          //     start: event.start,
          //     end: event.end,
          //     // activityDate: event.activityDate
          //   })
          // })
          // for(event in response.data.slots){
          //   console.log(event)
          //   this.$store.dispatch("addEvent",{
          //     name: event.name,
          //     start: event.start,
          //     end: event.end,
          //     // activityDate: event.activityDate
          //   })
          // }
          // this.$store.dispatch("addEvent", response.data.slots);
        });
        

              
    },
}
</script>