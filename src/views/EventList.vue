<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard v-for="event of events" :key="event.id" :event="event"/>
    <template v-if="page !== 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">Prev page</router-link>
    </template>
    <router-link
      v-if="hasNextPage"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="next"
    >Next page</router-link>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import { mapState } from 'vuex';

export default {
  components: {
    EventCard
  },
  created() {
    (this.perPage = 3),
      this.$store.dispatch('fetchEvents', {
        perPage: this.perPage,
        page: this.page
      });
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    hasNextPage() {
      return this.numberOfEvents > this.page * 3;
    },
    ...mapState(['events', 'numberOfEvents'])
  }
};
</script>

<style scoped></style>
