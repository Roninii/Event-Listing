import Vue from 'vue';
import Vuex from 'vuex';
import EventService from '@/services/EventService.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Adam Jahr' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: [],
    numberOfEvents: 0,
    event: {}
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENT(state, event) {
      state.event = event;
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_NUMBER_OF_EVENTS(state, number) {
      state.numberOfEvents = number;
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() =>
        commit('ADD_EVENT', event)
      );
    },
    fetchEvent({ commit, getters }, id) {
      let event = getters.getEventById(id);

      if (event) {
        commit('SET_EVENT', event);
      } else {
        EventService.getEvent(id)
          .then(res => {
            commit('SET_EVENT', res.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(res => {
          commit(
            'SET_NUMBER_OF_EVENTS',
            parseInt(res.headers['x-total-count'])
          );
          commit('SET_EVENTS', res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  getters: {
    getEventById: state => id => state.events.find(event => event.id === id),
    catLength: state => state.categories.length
  }
});
