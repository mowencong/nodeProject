import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        arr:null,
        scrollTop:'',
	},
    mutations: {
        changeArr(state,value){
            state.arr = value
        },
        changescrollTop(state,value){
            state.scrollTop = value
        }
	},
    actions: {}
})
export default store