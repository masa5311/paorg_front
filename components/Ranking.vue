<template>
  <div>
<!--    <v-btn @click='get()'>テスト</v-btn>-->
<!--    {{ res }}-->
    <v-card>
      <v-card-title>2022 若鷹軍団 ランキング</v-card-title>
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
          <th class='text-left'>
            代表馬
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='(item, i) in members' :key='i'>
          <td>{{ item.rank }}</td>
          <td>{{ item.userName }}</td>
          <td>{{ item.point }}</td>
          <td>{{ item.representativeHorse }}</td>
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
      // res: ''
    }
  },

  computed: {},

  async mounted() {
    // this.members = await this.$axios.$get('/get_pog_ranking')
    const params = {
      groupId: "ユーザーID"
    }
    this.members = await this.$axios.$post('/get_owner_list_with_ranking', params)
  },

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
      const params = {
        userId: "ユーザーID"
      }
      // const params = new URLSearchParams()
      // params.append('userId', 'ユーザーID')
      try {
        // this.members = await this.$axios.$get('/get_owner_list_with_ranking')
        // this.members = await this.$axios.$post('/get_owner_list_with_ranking')
        this.members = await this.$axios.$post('/get_owner_list_with_ranking', params)
        // const res = await
        //   this.$axios.$post('/get_owner_list_with_ranking', params)
        // this.members = await this.$axios.$get('/get_nomination_list_by_id_and_year')
        console.log(this.members)
        console.log(this.members[0])
        console.log(this.members[0].userName)
        // console.log(this.members[0].displayName)
        // console.log(this.members[0].nominationList)
        // console.log(res)
        // console.log(res[0])
        // console.log(res[0].userId)
        // this.members = res

      } catch (e) {
        console.log('失敗')
      }
    }
  }

}
</script>

<style scoped lang='scss'>

</style>
