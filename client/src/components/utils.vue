<script>
import store from "../store";
import axios from 'axios'

export default {
    log(s){
        console.log(s)
    },
    getHebrewCal(){
        let d = new Date();
        let currentMonth = d.getMonth() +1;

        axios
        .get("https://www.hebcal.com/hebcal/?v=1&cfg=json&year=now&month=" + currentMonth + "&geo=geoname&geonameid=281184&m=50&d=on")
        .then(response => {
            console.log('hebrew cal', response);
            let hebrewCalTemp = response.data.items;
            let hebrewCal = [];
            hebrewCalTemp.map( (item) => {
                 hebrewCal.push({date: item.date, hebrew: item.hebrew});
            })
            // hebrewDate = this.hebrewCal.find(item => item.date == date).hebrew
            console.log(hebrewCalTemp)
            if(hebrewCalTemp){
                this.$store.dispatch('addHebCal', hebrewCalTemp);
            }
            return hebrewCal;
        });
    },
}
</script>