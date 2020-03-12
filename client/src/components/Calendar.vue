<template>
  <v-row>
    <v-col>
      <v-sheet height="72vh">

        <v-layout wrap>

          <div class="row-btn">
            <v-btn @click="$refs.calendar.prev()">
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>

            <v-btn @click="$refs.calendar.next()">
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>

          <v-flex
            xs12
          >
            <v-sheet class="calendar-height">
              <v-calendar
                ref="calendar"
                v-model="start"
                :start="nowDate"
                type="day"
                color="#f78b1f"
                event-color="#f78b1f"
                :events="events"
                @click:time="openCreateModal"
              >

              <!-- Hebrew date -->
              <template v-slot:day-header="{ date }">
                <template
                  
                  class="text-center"
                >
                  {{getHebrewDate(date)}}
                </template>
              </template>




                <template  v-slot:interval="{ minutesToPixels, hour }">
                  <div v-if="hour == nowHour" class="nowIndicator"
                    :style="{
                      top: minutesToPixels(nowMinute) + 'px',           
                      position: 'relative'
                    }">
                  </div>
                  <div v-if="hour == nowHour" class="nowIndicatorLeft"
                    :style="{
                      top: 'calc(' + minutesToPixels(nowMinute) + 'px - 6px)', 
                      borderRadius: '50px',
                      width: '10px',
                      height: '10px',  
                      position: 'relative',
                    }">
                  </div>
                </template>
              </v-calendar>
            </v-sheet>
          </v-flex>
          <v-btn
            absolute
            dark
            bottom
            right
            color="#f78b1f"
            fab
            style="bottom: 40px"
            @click="openCreateModal"
          >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
          <CreationModal :dialog="showCreateModal" :selectedSlot="clickedSlot" @hideCreateModal="hideCreateModal"/>
        </v-layout>
      </v-sheet>
    </v-col>
  </v-row>
  
</template>

<script>
import axios from "axios";
import moment from "moment";
import store from '../store';
import CreationModal from './CreationModal';
import utils from './utils'
  export default {
    data: () => ({
      type: 'month',
      start: '',
      // end: '2019-01-06',
      showCreateModal: false,
      clickedSlot: null,
      hebrewCal: [],
    }),
    components:{
      CreationModal
    },
    computed:{
      nowDate(){
        var d = new Date();
        return d.getFullYear() + '-' + ("0" + (d.getMonth() + 1)).slice(-2) + '-' + ("0" + d.getDate()).slice(-2);
      },
      nowHour(){
        let d = new Date();
        return d.getHours();
      },
      nowMinute(){
        let d = new Date();
        return d.getMinutes();
      },
      events(){
        let events = this.$store.state.events;
        // events.push({
        //   name: '',
        //   start: this.nowDate + ' ' + this.nowHourMinute
        // })
        return events;
      },
    },
    methods:{
      log(e){
        console.log(e)
      },
      openCreateModal(e){
        console.log(e)
        if(e.date){
          this.clickedSlot = e;
        } else{
          var d = new Date();
          this.clickedSlot = {date:d.getFullYear() + '-' + ("0" + (d.getMonth() + 1)).slice(-2) + '-' + ("0" + d.getDate()).slice(-2), hour:d.getHours(), minutes: d.getMinutes()}
        }
        this.showCreateModal = true;
        // console.log('tamerenestring2dddguerre', this.showCreateModal)
      },
      // openCreateModalPlus(){
      //   this.clickedSlot = {};
      //   this.showCreateModal = true;
      //   console.log('tamerenestring2guerre', this.showCreateModal)
      // },
      hideCreateModal(){
        this.showCreateModal = false;
      },
      getHebrewDate(date){
        let hebrewDate = "";
        if(this.hebrewCal && this.hebrewCal.length > 0){
          hebrewDate = this.hebrewCal.find(item => item.date == date).hebrew
        }
        return hebrewDate
      },
      mappToSite(slot){
        let newitem = {}
        newitem.start = moment(slot.startDatetime).format('YYYY-MM-DD HH:mm');
        newitem.end = moment(slot.endDatetime).format('YYYY-MM-DD HH:mm');
        newitem.activityDate = slot.activityDate ? moment(slot.activityDate).format('YYYY-MM-DD') : undefined;
        newitem.name = slot.username;
        return newitem
      }
    },
    mounted(){

      this.hebrewCal = utils.getHebrewCal();

      axios
        .get("/api/slots")
        .then(response => {
          console.log(response)

          // let response = {data:{"slots":[{"start":"2020-03-10 09:10","end":"2020-03-10 09:20","activityDate":"2020-04-03","name":"test"},{"start":"2020-04-03 09:10","end":"2020-04-03 09:20","activityDate":"Invalid date","name":"test2"}]}};
          // // let events = response.data.slots;
          console.log(response)
          console.log(response.data.slots)
          this.$store.dispatch("addEvents",response.data.slots.map( (item) => {
              return mappToSite(item)
          }))
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

<style>
.calendar-height{
  height: 77vh;
}

.row-btn{
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0px 40px;
  position: absolute;
  margin-top: 22px;
  z-index: 2;
}

.v-calendar-daily__intervals-head{
  width: unset !important;
  border-right-width: 0px !important;
}

.v-calendar-daily__intervals-body{
  width: 50px !important;
}

.nowIndicator{
  background-color: red;
  height: 2px;
}
.nowIndicatorLeft{
  background-color: red;
  height: 2px;
}

 @media screen and (max-width: 1024px) {
  .calendar-height{
    height: 68vh;
  }

  .row-btn{
    padding: 0px 10px;
  }
}
</style>