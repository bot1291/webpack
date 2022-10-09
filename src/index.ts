import './js/common.ts';
import './assets/css/main.css';
import './assets/scss/main.scss';

// Import Bootstrap from "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap/dist/css/bootstrap.min.css"

// import "vue"
import Vue from 'vue';
import store from './store';

Vue.component('example-component', require('./components/Example.vue').default);

new Vue({
	data() {
		return {
			component: false,
		};
	},
	store,
	el: '#app',
});