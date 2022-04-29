<template>
  <div>

  </div>
</template>

<script>
export default {
  name: 'NominatedHorseList',
  props: {},

  data() {
    return {}
  },

  async created() {
    this.members = await this.$axios.$get('/get_nomination_list_by_id_and_year')
    console.log(this.members)
  },

  computed: {},

  methods: {}

}
</script>

<style scoped lang='scss'>

</style>
