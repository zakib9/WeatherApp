import { reactive } from "vue";
import axios from "axios";

const state = reactive({
    location: null,
    finalLocation: null,
    currentLocation: [],
    currentWeather: null,
    forcast: [],
    actions: { 
                setLocation(lo){
                state.location = lo
                search(lo)
                },
                 setWeather(lo){
                    state.finalLocation = lo
                    
                     weather()
                }

            },
})

async function search(lo){
    try {
        const data = await axios.get(`https://api.weatherapi.com/v1/search.json?key=224f96a6b0f74d7e9d6181034243009&q=${lo}`)
        state.currentLocation = data
    } catch (error) {
        state.currentLocation = "Failed to fetch movie data."
    }

}
async function weather() {
    if (state.finalLocation) {
        
        try {
            const data = await axios.get(`https://api.weatherapi.com/v1/current.json?key=224f96a6b0f74d7e9d6181034243009&q=${state.finalLocation}&aqi=no`)
            state.currentWeather = data
            console.log(data.data.current.temp_c)
        } catch (error) {
            state.currentWeather = "Failed to fetch movie data."
        }
    }
    
}





export default {
    state
  };