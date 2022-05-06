<template>
  <div>
    <v-card class="mb-6" v-for="(user, i) in userList" :key="i">
      <v-card-title>{{ user.userName }}</v-card-title>
      <v-simple-table>
        <thead>
        <tr>
          <th class='text-left'>
            指名順位
          </th>
          <th class='text-left'>
          </th>
          <th class='text-left'>
          </th>
          <th class='text-left'>
          </th>
          <th class='text-left'>
          </th>
          <th class='text-left'>
          </th>
          <th class='text-left'>
            獲得ポイント
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='(nomination, j) in user.nominationList' :key='j'>
          <td>{{ nomination.rank }}</td>
          <td>{{ nomination.horseName }}</td>
          <td>{{ nomination.sex }}</td>
          <td>{{ nomination.trainer }}</td>
          <td>{{ nomination.stallion }}</td>
          <td>{{ nomination.mare }}</td>
          <td>{{ nomination.point }}</td>
        </tr>
        </tbody>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'NominatedHorseList',
  props: {},

  data() {
    return {
      // 指名者リスト
      userList: [],
    }
  },

  async created() {
    const params = {
      groupId: "グループID"
    }
    this.userList = await
      this.$axios.$post('/get_nomination_list_by_id_and_year', params)
  },

  computed: {},

  methods: {}

}
</script>

<style scoped lang='scss'>

</style>
