<template>
  <v-row justify="center" v-if="date">
    <v-dialog v-model="dialog" persistent max-width="290">

      <!-- <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template> -->

      <v-card class="modal-wrapper">
        <h3 class="modal-title">Declare hitbodedut</h3>

            <v-container grid-list-md text-xs-center class="inputs-container">
                <v-layout row wrap> <!-- row 1 -->
                    <v-flex xs3>
                        <div class="inputsLabel">
                            <span>Date</span>
                        </div> 
                    </v-flex>
                    <v-flex xs9>
                       <!-- <v-menu
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
                            <v-date-picker v-model="date" @input="dateMenu = false" color="black" prev-icon="mdi-chevron-left" next-icon="mdi-chevron-right"></v-date-picker>
                            
                        </v-menu> -->

                        <span>{{date}}</span>
                    </v-flex>
                </v-layout>

                <v-layout row wrap class="modal-row">  <!-- row 2 -->
                    <v-flex xs3>
                        <div class="inputsLabel">
                            <span>Hours</span>
                        </div> 
                    </v-flex>
                    <v-flex xs9 style="display: flex; padding: 4px 0; align-items: baseline">
                        <v-flex xs5>
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
                            <!-- <span>{{timeFrom}}</span> -->
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
                            <!-- <span>{{timeTo}}</span> -->
                    </v-flex>
                    </v-flex>
                </v-layout>

                <v-layout row wrap class="modal-row"> <!-- row 1 -->
                    <v-flex xs3>
                        <div class="inputsLabel">
                            <span>Name</span>
                        </div> 
                    </v-flex>
                    <v-flex xs9 class="modal-user-name">
                         <v-text-field style="padding-top: 0px; margin-top: 0px;" :disabled="anonymousCheckbox" v-model="inputName"></v-text-field>
                         <v-checkbox v-model="anonymousCheckbox" label="Anonymous" color="#f78b1f" style="margin: 0"></v-checkbox>

                    </v-flex>
                </v-layout>
              </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#f78b1f" text @click="hideCreateModal">Cancel</v-btn>
          <v-btn color="#f78b1f" text @click="saveHitbodedut">Save</v-btn>
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
        timeFromSelected: "", 
        timeToSelected: "", 
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
          if(this.selectedSlot)
         { return ("0" + this.selectedSlot.hour).slice(-2) + ':00';}
        },
        set: function (newValue) {
          this.timeFromSelected = newValue;    
        }
      },
      timeTo:{
        get: function () {
           if(this.selectedSlot)
         { return ("0" + (this.selectedSlot.hour + 1)).slice(-2) + ':00';}
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
    },
    mounted(){
      this.start = this.date;

      if(this.selectedSlot){
        this.timeFromSelected = ("0" + (this.selectedSlot.hour)).slice(-2) + ':00';
        this.timeToSelected = ("0" + (this.selectedSlot.hour + 1)).slice(-2) + ':00';
      }
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

        var hObject = {
          username: this.inputName,
          startDatetime: this.date + ' ' + this.timeFromSelected,
          endDatetime: this.date + ' ' + this.timeToSelected,
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
            this.$store.dispatch("addEvent", tempObject);
          });

        this.hideCreateModal();
      }
    }
  }
</script>

<style>
.modal-wrapper{
  padding: 12px;
}

.modal-row{
  align-items: baseline;
}

.v-text-field__details {
    display: none;
}

/* .v-menu__content--fixed {
  left: 25% !important;
} */

</style>

