<template>
  <v-row justify="center" v-if="date">
    <v-dialog v-model="dialog" persistent max-width="580px">

      <!-- <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template> -->

      <v-card class="modal__container">
        <h3 class="modal__title">Declare hitbodedut</h3>

            <v-container grid-list-md text-xs-center>
                <v-layout row wrap> <!-- row 1 -->
                    <v-flex xs3>
                        <div>
                            <span class="modal__label">Date</span>
                        </div> 
                    </v-flex>
                    <v-flex xs9>
                       <v-menu
                            v-model="dateMenu"
                            :close-on-content-click="false"
                            :nudge-right="-10"
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                
                            <v-text-field
                                v-model="date"
                                readonly
                                v-on="on"
                                append-icon="mdi-menu-down"
                                
                            ></v-text-field>
                            </template>
                            <v-date-picker v-model="date" @input="dateMenu = false" color="#f78b1f" prev-icon="mdi-chevron-left" next-icon="mdi-chevron-right"></v-date-picker>
                            
                        </v-menu>

                        <!-- <span>{{date}}</span> -->
                    </v-flex>
                </v-layout>

                <v-layout row wrap class="modal__row">  <!-- row 2 -->
                    <v-flex xs3>
                        <div>
                            <span class="modal__label">Hours</span>
                        </div> 
                    </v-flex>
                    <v-flex xs9 class="modal__row-content">


                            <v-flex class="modal__row-content">
                                <v-flex xs5>
                                    <v-autocomplete
                                    :items="optionsHours"
                                    :menu-props="{ bottom: true, offsetY: true }"
                                    v-model="timeFrom"
                                    append-icon="mdi-menu-down"
                                    ></v-autocomplete>
                                </v-flex>
                                <v-spacer></v-spacer>
                                <span class="modal__to-label">to</span>
                                <v-spacer></v-spacer>
                                <v-flex xs5>
                                    <v-autocomplete
                                    :items="optionsHours"
                                    v-model="timeTo"
                                    :menu-props="{ bottom: true, offsetY: true }"
                                    append-icon="mdi-menu-down"
                                    ></v-autocomplete>
                                </v-flex> 
                            </v-flex>



                        <!-- <v-flex xs5>
                            <v-menu
                              ref="menu"
                              v-model="menu2"
                              :close-on-content-click="false"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-model="timeFromSelected"
                                  v-on="on"
                                  style="padding-top: 0px; margin-top: 0px;"
                                ></v-text-field>
                              </template>
                              <v-time-picker
                                v-if="menu2"
                                v-model="timeFrom"
                                full-width
                                @click:minute="$refs.menu.save(time)"
                                color="#f78b1f"
                              ></v-time-picker>
                            </v-menu>

                            
                            <span>{{timeFrom}}</span>
                        </v-flex>
                        <v-spacer></v-spacer>
                        <span class="toLabel">to</span>
                        <v-spacer></v-spacer>
                        <v-flex xs5>
                            <v-menu
                              ref="menu3"
                              v-model="menu3"
                              :close-on-content-click="false"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-model="timeToSelected"
                                  v-on="on"
                                  style="padding-top: 0px; margin-top: 0px;"
                                ></v-text-field>
                              </template>
                              <v-time-picker
                                v-if="menu3"
                                v-model="timeTo"
                                full-width
                                @click:minute="$refs.menu3.save(time)"
                                color="#f78b1f"
                              ></v-time-picker>
                            </v-menu>
                            <span>{{timeTo}}</span>
                    </v-flex> -->
                    </v-flex> 
                </v-layout>

                <v-layout row wrap class="modal__row"> <!-- row 1 -->
                    <v-flex xs3>
                        <div>
                            <span class="modal__label">Name</span>
                        </div> 
                    </v-flex>
                    <v-flex xs9 class="modal__user-name">
                         <v-text-field  :disabled="anonymousCheckbox" v-model="inputName"></v-text-field>
                         <v-checkbox v-model="anonymousCheckbox" label="Anonymous" color="#f78b1f" class="modal__checkbox"></v-checkbox>

                    </v-flex>
                </v-layout>
              </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#f78b1f" class="modal__btn" text @click="hideCreateModal">Cancel</v-btn>
          <v-btn color="#f78b1f" class="modal__btn" text @click="saveHitbodedut">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
import store from '../store';
  export default {
    data () {
      return {
        // dialog: false,
        dateMenu: false, //show date picker or not
        start: "",
        menu2: false,
        menu3: false,
        timeFromSelected: null, 
        timeToSelected: null, 
        anonymousCheckbox: false,
        inputName: '',

      }
    },
    props:['dialog', 'selectedSlot'],
    computed:{
      nowDate(){
        var d = new Date();
        return d.getFullYear() + '-' + ("0" + (d.getMonth() + 1)).slice(-2) + '-' + ("0" + d.getDate()).slice(-2);
      },
      timeFrom:{
        get: function () {
          if (this.timeFromSelected){
            return this.timeFromSelected;
          }
          if(this.selectedSlot){ 
            this.timeFromSelected = ("0" + (this.selectedSlot.hour)).slice(-2) + ':00';
            return ("0" + this.selectedSlot.hour).slice(-2) + ':00';
            }
        },
        set: function (newValue) {
          this.timeFromSelected = newValue;    
        }
      },
      timeTo:{
        get: function () {
          if (this.timeToSelected){
            return this.timeToSelected;
          }
           if(this.selectedSlot)
         { 
           this.timeToSelected = ("0" + (this.selectedSlot.hour + 1)).slice(-2) + ':00';
           return ("0" + (this.selectedSlot.hour + 1)).slice(-2) + ':00';}
        },
        set: function (newValue) {
          this.timeToSelected = newValue;    
        }
      },
      date(){
        if(this.selectedSlot){
          return this.selectedSlot.date
        } else {
          return null
        }
      },
      optionsHours(){
        // var x = 10; //minutes interval
        // var times = []; // time array
        // var tt = 0; // start time
        // var ap = ['AM', 'PM']; // AM-PM

        // //loop to increment the time and push results in array
        // for (var i=0;tt<24*60; i++) {
        //   var hh = Math.floor(tt/60); // getting hours of day in 0-24 format
        //   var mm = (tt%60); // getting minutes of the hour in 0-55 format
        //   times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
        //   tt = tt + x;
        // }
        // return times
        var arr = [], i, j;
        for(i=0; i<24; i++) {
          for(j=0; j<6; j++) {
            arr.push((i < 10 ? "0"+i : i) + ":" + (j===0 ? "00" : 10*j) );
          }
        }
        return arr;
      },
    },
    mounted(){
      this.start = this.date;
    },
     updated(){
      console.log(this.dialog)
    },
    methods:{
      hideCreateModal(){
        this.$emit('hideCreateModal')
      },
      inputChange(e){
        console.log(e)
        this.inputName = e
      },
      saveHitbodedut(e){
        if(this.inputName == '' || this.anonymousCheckbox){
          this.inputName = 'Anonymous'
        }
        var d = new Date()
        var tz = d.getTimezoneOffset()/60;
        var tzString;
        if(Math.abs(tz)<10){
          tzString = tz <= 0 ? `+0${Math.abs(tz)}:00` : `-0${Math.abs(tz)}:00`;
        } else {
          tzString = tz <= 0 ? `${Math.abs(tz)}:00` : `-${Math.abs(tz)}:00`;
        }
        var hObject = {
          username: this.inputName,
          startDatetime: new Date(this.date + 'T' + this.timeFromSelected + ':00'+ tzString),
          endDatetime: new Date(this.date + 'T' + this.timeToSelected + ':00' + tzString),
          activityDate: this.date,
        }
        var tempObject = {
          name: this.inputName,
          start: this.date + ' ' + this.timeFromSelected,
          end: this.date + ' ' + this.timeToSelected,
        }
        axios
          .post("/api/slots", hObject)
          .then(response => {
            console.log(response);
            console.log(tempObject)
            this.$store.dispatch("addEvent", tempObject);
             axios
              .get("/api/slots/current")
              .then(response => {
                console.log(response.data.count)
                this.$store.dispatch("setHitNow", response.data.count)
        })
          });

        this.hideCreateModal();
      }
    }
  }
</script>

<style lang="scss">

.modal{
  max-width: 470px;

  &__container{
    padding: 25px;
  }

  &__title{
    font-size: 30px;
    margin-bottom: 22px;
  }

  &__row{
    align-items: baseline;
  }

  &__row-content{
    display: flex;
    padding: 4px 0;
    align-items: baseline;
  }

  &__label{
    font-size: 24px;
  }

  &__checkbox label, &__btn span, &__to-label{
    font-size: 22px;
  }

}

.theme--light.v-input {
    padding-top: 0px;
    margin-top: 0px;
    font-size: 22px;
}

.v-text-field__details {
    display: none;
}

/* .v-menu__content--fixed {
  left: 25% !important;
} */

 @media screen and (max-width: 1024px) {
  .modal{

    &__container{
      padding: 10px;
    }

    &__title{
      font-size: 20px;
      margin-bottom: 12px;
    }

    &__label{
      font-size: 18px;
    }

    &__checkbox label, &__btn span, &__to-label{
      font-size: 17px;
    }

  }

  .theme--light.v-input{
    font-size: 17px;
  }

}

</style>

