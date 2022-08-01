<template>
  <div>
    <v-card color="primary lighten-2">
      <v-card-title>{{ year }} ランキング</v-card-title>
      <v-data-table
        :headers="rankingHeaders"
        :items="ownerList"
        show-expand
        :expanded.sync="expanded"
        hide-default-footer
        disable-sort
        :loading="rankingLoading"
      >
        <!--ツールチップ表示は一旦保留のためコメント化-->
        <!--        <template v-slot:[`item.data-table-expand`]="{ item, isExpanded }">-->
        <!--          <v-tooltip :right="!isXs" :left="isXs">-->
        <!--            <template v-slot:activator="{ on, attrs }">-->
        <!--              <v-icon-->
        <!--                @click="handleExpansion(item, isExpanded)"-->
        <!--                v-bind="attrs"-->
        <!--                v-on="on"-->
        <!--              >-->
        <!--                {{ isExpanded ? "mdi-chevron-up" : "mdi-chevron-down" }}-->
        <!--              </v-icon>-->
        <!--            </template>-->
        <!--            <span>{{-->
        <!--                isExpanded ? "指名馬一覧を閉じる" : "指名馬一覧表示"-->
        <!--              }}</span>-->
        <!--          </v-tooltip>-->
        <!--        </template>-->
        <!-- 指名馬展開 -->
        <template v-slot:expanded-item="{ headers, item }">
          <td class="data_tables_xs" :colspan="headers.length">
            <v-data-table
              :headers="nominationHeaders"
              :items="item.nominationList"
              hide-default-footer
              :items-per-page=-1
              disable-sort
              :loading="nominationLoading"
            >
              <!-- 馬名 -->
              <template v-slot:[`item.horseName`]="{ item }">
                <v-menu :offset-x="true" transition="scale-transition">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      block
                      :color="getColorByHorseGrades(item.numberOfRaces, item.point)"
                      v-bind="attrs"
                      v-on="on"
                    >
                      {{ item.horseName }}
                    </v-btn>
                  </template>
                  <v-list dense>
                    <v-subheader>netkeibaリンク</v-subheader>
                    <v-divider></v-divider>
                    <v-list-item
                      :href="'https://db.netkeiba.com/horse/' +
                      item.pedigreeRegistrationNumber " target="_blank">
                      <v-list-item-title>TOP</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      :href="'https://db.netkeiba.com/horse/ped/' +
                      item.pedigreeRegistrationNumber " target="_blank">
                      <v-list-item-title>血統</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      :href="'https://db.netkeiba.com/?pid=horse_board&id=' +
                      item.pedigreeRegistrationNumber " target="_blank">
                      <v-list-item-title>掲示板</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table>
          </td>
        </template>
        <!-- 順位 -->
        <!--        <template v-slot:[`item.rank`]="{ index }">{{ index + 1 }}</template>-->
        <!-- 馬主名にリンク付与 -->
        <!--        <template v-slot:[`item.displayName`]="{ item }">-->
        <!--          <a href="#">{{ item.displayName }}</a>-->
        <!--        </template>-->
        <!--ポイント-->
        <template v-slot:[`item.point`]="{ item }">
          <v-dialog
            width="400px"
            :fullscreen="isXs"
            scrollable
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary lighten-2 grey--text text--darken-4"
                rounded
                width="150px"
                v-bind="attrs"
                v-on="on"
                :disabled="nominationLoading"
              >
                {{ item.point }}
              </v-btn>
            </template>
            <template #default="dialog">
              <v-card>
                <v-toolbar color="primary lighten-2" flat dense>
                  <v-toolbar-title class="text-body-1"></v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="dialog.value = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text
                  class="px-0"
                >
                  <v-card
                    v-for="nomination in
                    getDisplayNomination(item.nominationList)"
                    :key="nomination.id"
                    color="primary lighten-4"
                    outlined
                    tile
                  >
                    <v-toolbar color="primary lighten-4" flat dense>
                      <v-toolbar-title
                        class="text-body-2">{{ nomination.horseName }}
                      </v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-toolbar-title
                        class="text-body-2">{{ nomination.point }}
                      </v-toolbar-title>
                    </v-toolbar>
                    <!--レース名、ポイント-->
                    <v-list dense flat>
                      <v-list-item-group>
                        <v-list-item
                          v-for="(raceResult, i) in
                            getDisplayRaceResult(nomination.raceResultList)"
                          :key="i"
                        >
                          <v-row>
                            <!--レース名-->
                            <v-col cols="7">
                              <v-list-item-content>
                                <v-list-item-title
                                  class="text-body-2 text-wrap"
                                  v-text="raceResult.raceName"></v-list-item-title>
                              </v-list-item-content>
                            </v-col>
                            <!--ランキング-->
                            <v-col cols="2">
                              <v-list-item-content>
                                <v-list-item-title
                                  class="text-body-2"
                                  v-text="raceResult.ranking + '着'">
                                </v-list-item-title>
                              </v-list-item-content>
                            </v-col>
                            <!--ポイント-->
                            <v-col cols="3">
                              <v-list-item-content>
                                <v-list-item-title
                                  class="text-body-2 text-right"
                                  v-text="raceResult.point"></v-list-item-title>
                              </v-list-item-content>
                            </v-col>
                          </v-row>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-card>
                </v-card-text>
              </v-card>
            </template>
          </v-dialog>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Ranking',

  data() {
    return {
      expanded: [],
      rankingLoading: true,
      rankingHeaders: [
        {text: '', value: 'data-table-expand', class: "primary lighten-4"},
        {
          text: '順位', value: 'ranking', align: 'center', class:
            "primary lighten-4"
        },
        {text: '馬主名', value: 'displayName', class: "primary lighten-4"},
        {
          text: 'ポイント', value: 'point', align: 'center', class:
            "primary lighten-4"
        }
      ],
      nominationLoading: true,
      nominationHeaders: [
        {text: '指名順位', value: 'nominationRank', align: 'center'},
        {text: '馬名', value: 'horseName'},
        {text: 'ポイント', value: 'point', align: 'right'},
        {text: '性別', value: 'sex', align: 'center'},
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
      year: this.getDefaultYear(),
      dialog: false,
    }
  },

  computed: {
    /**
     * 画面横幅がxs（599px以下）かどうか判定
     * @returns {boolean} 画面横幅がxs（599px以下）の場合：true
     */
    isXs() {
      return this.$vuetify.breakpoint.name === 'xs'
    },

  },

  watch: {
    year: {
      handler() {
        this.getRanking()
      },
      immediate: true,
    }
  },

  created() {
    this.$nuxt.$on('year', value => {
      this.year = value
    })
  },

  async mounted() {
  },

  // async updated() {
  //   this.members = await this.$axios.$get('/get_ranking')
  // },

  methods: {
    getDefaultYear() {
      const now = new Date()
      const nowYear = now.getFullYear()
      return now.getMonth() >= 5 ? nowYear : nowYear - 1
    },

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
     * ランキング更新
     * @returns {Promise<void>}
     */
    async getRanking() {
      // オーナー別指名馬一覧の展開を初期化
      this.expanded = []

      const params = {
        groupId: 1,
        year: this.year
      }

      // グループ内ランキング取得
      this.rankingLoading = true
      this.ownerList = []
      this.ownerList = await this.$axios.$post('/get_owner_list_with_point', params)
      this.rankingLoading = false

      // 指名馬リストを取得し、オーナーリストに設定
      this.nominationLoading = true;
      const ownerListWithNomination =
        await this.$axios.$post('/get_nomination_list_by_group', params)
      ownerListWithNomination.forEach(value => {
        const targetOwner = this.ownerList.find(owner => owner.id === value.id)
        targetOwner.nominationList = value.nominationList
      })
      this.nominationLoading = false;

    },

    /**
     * 出走回数、ポイントにより馬名の色を変更する
     * ■内容
     * ・未出走：グレー
     * ・出走済、未勝利：パープル
     * ・1勝：赤
     * ・オープン：黄色
     *
     * @param numberObRaces 出走回数
     * @param point ポイント
     * @returns {string} 馬名の色
     */
    getColorByHorseGrades(numberObRaces, point) {
      if (numberObRaces === 0) {
        return "grey lighten-3"
      } else if (point === 0) {
        return "purple lighten-3"
      } else if (point <= 600) {
        return "deep-orange lighten-3"
      } else {
        return "yellow accent-2"
      }
    },

    /**
     * データテーブルの展開列のカスタマイズ（ツールチップ表示用）
     * ■内容
     * ・展開済みの場合：展開済リストから展開切り替え対象を削除
     * ・未展開の場合：展開済リストに展開切り替え対象を登録
     *
     * @param item 展開切り替え対象
     * @param state 展開状態（未展開 or 展開済）
     */
    handleExpansion(item, state) {
      const itemIndex = this.expanded.indexOf(item)
      state ? this.expanded.splice(itemIndex, 1) :
        this.expanded.push(item)
    },

    getDisplayNomination(nominationList) {
      return nominationList.filter(nomination => nomination.point !== 0);
    },

    getDisplayRaceResult(raceResultList) {
      return raceResultList.filter(raceResult => raceResult.point !== 0);
    },

  },

}
</script>

<style scoped lang='scss'>
//a {
//  display: block;
//}

@media screen and (max-width: 600px) {
  .v-data-table td.data_tables_xs {
    display: block;
    height: auto;
  }
}
</style>
