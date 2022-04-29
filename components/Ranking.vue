<template>
  <div>
    <v-btn @click='get()'>テスト</v-btn>
    {{ res }}
    <v-card>
      <v-simple-table>
        <thead>
        <tr>
          <th class='text-left'>
            順位
          </th>
          <th class='text-left'>
            馬主名
          </th>
          <th class='text-left'>
            ポイント
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='(item, i) in members' :key='i'>
          <td>{{ item.rank }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.point }}</td>
        </tr>
        </tbody>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Ranking',
  props: {},

  data() {
    return {
      members: [],
      res: ''
    }
  },

  computed: {},

  // async mounted() {
  //   this.members = await this.$axios.$get('/get_pog_ranking')
  // },

  // async updated() {
  //   this.members = await this.$axios.$get('/get_ranking')
  // },

  methods: {
    /**
     * GET通信
     */
    async get() {
      // this.res = await this.$axios.$get('/')
      // this.members = await this.$axios.$get('/get_pog_ranking')
      try {
        this.members = await this.$axios.$get('/get_owner_list_with_ranking')
        // this.members = await this.$axios.$get('/get_nomination_list_by_id_and_year')
        // console.log(this.members)
        // console.log(this.members[0])
        // console.log(this.members[0].id)
        // console.log(this.members[0].displayName)
        // console.log(this.members[0].nominationList)
      } catch (e) {
        console.log('失敗')
      }
    }
  }

}
</script>

<style scoped lang='scss'>

</style>
