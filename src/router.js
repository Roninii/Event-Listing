import Vue from 'vue';
import Router from 'vue-router';
import EventCreate from './views/EventCreate.vue';
import EventList from './views/EventList.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList
    },
    {
      path: '/event/:id',
      name: 'event-show',
      props: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/EventShow.vue')
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate
    }
  ]
});
