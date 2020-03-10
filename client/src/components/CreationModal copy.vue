<template>
    <modal name="CreationModal"        
        class="CreationModal"
        width="30%"
        height="auto"
    >
        <div class="CreationModalContent">
        <div class="modal-close" @click="closeModal()"></div>
            
            <h3 class="modal-title">Declare hitbodedut</h3>

            <v-container grid-list-md text-xs-center class="inputs-container">
                <v-layout row wrap> <!-- row 1 -->
                    <v-flex xs3>
                        <div class="inputsLabel">
                            <span>Date</span>
                        </div> 
                    </v-flex>
                    <v-flex xs9>
                        <v-menu
                            v-model="date"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                  v-model="start"
                                  readonly
                                  v-on="on"
                                  append-icon="mdi-menu-down"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="start" @input="date = false" color="black" prev-icon="mdi-chevron-left" next-icon="mdi-chevron-right"></v-date-picker>
                        </v-menu>
                        
                    </v-flex>
                </v-layout>

                <v-layout row wrap>  <!-- row 2 -->
                    <v-flex xs3>
                        <div class="inputsLabel">
                            <span>Hours</span>
                        </div> 
                    </v-flex>
                    <v-flex xs9 style="display: flex; padding: 4px 0;">
                        <v-flex xs5>
                            <v-select
                            :items="optionsHours"
                            v-model="timeFrom"
                            append-icon="mdi-menu-down"
                            ></v-select>
                        </v-flex>
                        <v-spacer></v-spacer>
                        <span class="toLabel">to</span>
                        <v-spacer></v-spacer>
                        <v-flex xs5>
                            <v-select
                            :items="optionsHours"
                            v-model="timeTo"
                            append-icon="mdi-menu-down"
                            ></v-select>
                    </v-flex>
                    </v-flex>
                </v-layout>



            </v-container>
            <div class="footer-btn">
                <button @click="closeModal()" class="eventTypeBtn delete-btn">
                    Cancel
                </button>
                <button @click="saveHitbodedut()" class="eventTypeBtn">
                    <div> Save </div>
                </button>
            </div>
        </div>        
    </modal>
</template>

<script>

export default {
  name: 'CreationModal',
  data () {
    return {
      showLoader: null,
      date: "",
      start: "",
      end: "",
      timeFrom: "",
      timeTo: "",
    }
  },
  methods:{
      
    closeModal(){
        this.showLoader = null;
        this.$modal.hide('CreationModal');
    },
    saveHitbodedut(){

    }
 
  },
 computed:{
      optionsHours(){
        let n = 24;
        let options = [];
        for (var i=0; i<n; i++) {
          if(i.toString().length == 1){
                i = '0' + i; 
          }
          options.push(i + ':00')
        } 
      return options;
      },
  } 
}
</script>

<style>
    .CreationModal .v--modal-box.v--modal{
        min-width: 586px;
        margin: auto;
        left: unset !important;
        border-radius: 11px;
    }
    
    .CreationModalContent{
        padding: 42px 31px 51px 48px;
        text-align: right;
        padding-top: 30px;
    }

    .modal-close{
        position: absolute;
        right: 2em;
        top: 2em;
        width: 1.1em;
        height: 1.1em;
        cursor: pointer;
    }

    .modal-close:after, .modal-close:before {
        content: '';
        position: absolute;
        width: 2px;
        height: 1.5em;
        background: #ccc;
        display: block;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        left: 50%;
        margin: -3px 0 0 -1px;
        top: 0;
    }

    .modal-close:hover:after,
    .modal-close:hover:before {
        background: #aaa;
    }

    .modal-close:before{
        transform: rotate(-45deg);
    }

    .inputs-container{
        padding: 0;
        padding-right: 40px
    }

    .modal-title{
        font-size: 27px;
        text-align: left
    }
    .eventTypeSelect{
        width: 100px;
        border: 1px solid black;
        padding-left: 10px;
    }
    .eventTypeBtn{
        margin-top: 10px;
        padding: 12px 65px;
        background-color: #000000;
        color: #ffffff;
        font-size: 15px;
        min-width: 158px;
        min-height: 46px;
        outline: none;
    }
    .delete-btn{
        background-color: #eae8e4;
        color: #000000;
        margin-right: 12px;
         padding: 12px 45px;
    }
    .inputsLabel{
        text-align: left;
        padding-top: 17px;
        opacity: 0.5;
        font-size: 18px;
        line-height: 1.22;
        color: #000000;
    }

    .layout.row {
        align-items: baseline;
        max-height: 70px;
    }

    .v-input__slot {
        min-height: 48px;
        background-color: #f6f5f3;
        padding-left: 19px;
    }

    .v-input__slot:before, .v-input__slot:after{
        display: none;
    }

    .v-text-field .v-input__append-inner{
        align-self: auto;
    }

    .capacityText{
        text-align: left;
        padding-left: 15px !important;
        padding-top: 25px !important;
    }

    .week-day-wrapper{
        display: flex;
        flex-wrap: nowrap
    }

    .week-day-wrapper::before{
        content: "Repeat on";
        position: absolute;
        top: 43%;
        color: #8c9199;
    }

    .radio-ends::before{
        content: "Ends";
        position: absolute;
        top: 62%;
        font-size: 14px;
        color: #8c9199;
        margin-bottom: 20px;
    }

    .Reccurence-select {
        margin-right: 10px;
        text-align: left;
    }

    /* .Reccurence-select::before{
        content: "Repeat every";
        position: absolute;
        top: 43%;
        color: #8c9199;
    } */

    .week-day button {
        padding: 2px 6px;
        height: 26px;
        width: 35px;
        min-width: unset;
        margin: auto 5px auto 0;
        box-shadow: none;
        border-radius: 5px;
        background-color: #f9f8f6;
        color: #949494;
        outline: none;
        cursor: pointer;
    }

    .selectedDay{
        background-color: #d9d7d2 !important;
        color: #000000 !important;
    }

    .v-radio {
        min-width: 57px;
    }

    .radio-ends .v-input__slot{
        padding-left: 0;
        background: none
    }

    .radio-ends-row{
        display: flex;
        height: 34px;
    }

    .radio-ends-row .v-input__slot{
        background-color: #f6f5f3;
        padding-left: 19px;
        min-height: 40px
    }

    .radio-ends-row .v-text-field{
        margin-top: -20px;
    }


    .radio-input .v-input__slot{
        width: 43px;
        padding-left: 12px;
    }

    label.v-label {
        color: #000000 !important;
        font-size: 17px;
    }

    .toLabel{
        margin: auto;
        opacity: 0.5;
        font-size: 18px;
    }

    .footer-btn{
        display: flex;
        justify-content: flex-end;
    }

    @media screen and (max-width: 1024px) {
      .CreationModal .v--modal-box.v--modal{
        min-width: 510px;
        top: 60px !important;
        margin: auto !important;
        height: auto !important;
        left: 0 !important;
      }
      
      .CreationModalContent {
        padding: 27px 16px 27px 33px;
      }

      .radio-ends::before{
        top: 64%;
      }
    }
</style>