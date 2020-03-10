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
            <v-sheet height="68vh">
              <v-calendar
                ref="calendar"
                v-model="start"
                :start="nowDate"
                type="day"
                color="#f78b1f"
                event-color="#f78b1f"
                :events="events"
                event-more=true
                event-more-text="$vuetify.calendar.moreEvents"
                @click:time="openCreateModal"
              ></v-calendar>
            </v-sheet>
          </v-flex>
                      <v-btn
            absolute
            dark
            bottom
            right
            color="#f78b1f"
            fab
            style="bottom: 16px"
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
import CreationModal from './CreationModal';
import axios from "axios";
  export default {
    data: () => ({
      type: 'month',
      start: '',
      // end: '2019-01-06',
      showCreateModal: false,
      clickedSlot: null,
    }),
    components:{
      CreationModal
    },
    computed:{
      nowDate(){
        var d = new Date();
        return d.getFullYear() + '-' + ("0" + (d.getMonth() + 1)).slice(-2) + '-' + ("0" + d.getDate()).slice(-2);
      },
      events(){
        // return this.$store.state.events;
        var events = [{
            name: "Anonymous",
            start: "2020-03-10 10:00",
            end: "2020-03-10 11:00",
            },
            {
            name: "Anonymous",
            start: "2020-03-10 07:00",
            end: "2020-03-10 08:00",
            },
            {
            name: "Anonymous",
            start: "2020-03-10 07:00",
            end: "2020-03-10 08:00",
            },
            {
            name: "Michael",
            start: "2020-03-10 07:00",
            end: "2020-03-10 08:00",
            },
            {
            name: "Michael",
            start: "2020-03-10 07:00",
            end: "2020-03-10 08:00",
            },
            {
            name: "Michael",
            start: "2020-03-10 07:00",
            end: "2020-03-10 08:00",
            },
            {
            name: "Michael",
            start: "2020-03-10 07:00",
            end: "2020-03-10 08:00",
            },
            {
            name: "Michael",
            start: "2020-03-10 07:00",
            end: "2020-03-10 08:00",
            },
            {
            name: "Michael",
            start: "2020-03-10 07:00",
            end: "2020-03-10 08:00",
            },
            {
            name: "Michael",
            start: "2020-03-10 07:00",
            end: "2020-03-10 08:00",
            },
            {
            name: "Michael",
            start: "2020-03-10 07:00",
            end: "2020-03-10 08:00",
            },
            {
            name: "Michael",
            start: "2020-03-10 07:00",
            end: "2020-03-10 08:00",
            },
          ];
          return events;
      }
    },
    methods:{
      log(e){
        console.log(e)
      },
      openCreateModal(e){
        this.clickedSlot = e;
        this.showCreateModal = true;
      },
      hideCreateModal(){
        this.showCreateModal = false;
      }
    },
    mounted(){
      axios
        .get("/api/slots")
        .then(response => {
          console.log(response)
        });
    },
  }
</script>

<style>
.row-btn{
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
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
</style>