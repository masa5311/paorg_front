<template>
  <div>
    <v-card>
      <v-card-title>{{ year }} ランキング</v-card-title>
      <v-data-table
        :headers="rankingHeaders"
        :items="ownerList"
        show-expand
        hide-default-footer
        disable-sort
        :loading="loading"
      >
        <!-- 指名馬展開 -->
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-data-table
              :headers="nominationHeaders"
              :items="item.nominationBeanList"
              hide-default-footer
              items-per-page="30"
              disable-sort
            >
            </v-data-table>
          </td>
        </template>
        <!-- 順位列 -->
        <template v-slot:[`item.rank`]="{ index }">{{ index + 1 }}</template>
        <!-- 馬主名にリンク付与 -->
<!--        <template v-slot:[`item.displayName`]="{ item }">-->
<!--          <a href="#">{{ item.displayName }}</a>-->
<!--        </template>-->
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Ranking',

  data() {
    return {
      loading: true,
      rankingHeaders: [
        {text: '順位', value: 'rank'},
        {text: '馬主名', value: 'displayName'},
        {text: 'ポイント', value: 'point'}
      ],
      nominationHeaders: [
        {text: '指名順位', value: 'nominateRank'},
        {text: '馬名', value: 'horseName'},
        {text: '性別', value: 'sex'},
        {text: '所属', value: 'trainerShozokuPlace'},
        {text: '厩舎', value: 'trainerName'},
        {text: '父名', value: 'sireName'},
        {text: '母名', value: 'damName'},
      ],
      ownerList: [],
      // horseList: {
      //   headers: [
      //     {text: '指名順位', value: 'nominationRank'},
      //     {text: '馬名', value: 'horseName'},
      //   ],
      //   items: {
      //     // 3: [{nominationRank: '1', horseName: 'コマンドライン'}]
      //   }
      //
      // }
      year: 2021,
    }
  },

  computed: {},

  created() {
    this.$nuxt.$on('year', value => {
      console.log('Ranking.vue:created:year:', value)
      this.year = value
    })
  },

  async mounted() {
  },

  watch: {
    year: {
      handler() {
        console.log('変更されました:年度:', this.year)
        this.getRanking()

      },
      immediate: true,
    }
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
    },

    /**
     * ランキング取得
     * @returns {Promise<void>}
     */
    async getRanking() {
      const params = {
        groupId: 1,
        year: this.year
      }
      console.log('年度', this.year)
      this.ownerList = await this.$axios.$post('/get_owner_list_with_point', params)
      console.log('this.ownerList', this.ownerList)
      this.loading = false

      // 指名馬リストを取得し、オーナーリストに設定
      const retOwnerList = await
        this.$axios.$post('/get_nomination_list_by_group',
          params)
      retOwnerList.forEach(value => {
        const targetOwner = this.ownerList.find(owner => owner.id === value.id)
        targetOwner.nominationBeanList = value.nominationBeanList
      })
      console.log('this.ownerList', this.ownerList)

    },
  }

}
</script>

<style scoped lang='scss'>
a {
  display: block;
}
</style>
