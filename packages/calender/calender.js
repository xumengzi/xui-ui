import Calender from './src/calender.vue';

Calender.install = function (Vue) {
  Vue.component(Calender.name, Calender);
};
export default Calender;