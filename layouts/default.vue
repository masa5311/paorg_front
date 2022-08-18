<template>
  <v-app>
    <v-navigation-drawer
      :right="right"
      v-model='drawer'
      :mini-variant='miniVariant'
      expand-on-hover
      clipped
      fixed
      app
    >
      <v-list>
        <v-list-group
          no-action
          prepend-icon="mdi-crown"
        >
          <template v-slot:activator>
            <v-list-item-title>ランキング</v-list-item-title>
          </template>
          <v-list-item
            v-for="([year], i) in years"
            :key="i"
            :to="{name: 'index', params: {year: year}}"
            @click="setYear(year)"
          >
            <v-list-item-title v-text="year"></v-list-item-title>
          </v-list-item>
        </v-list-group>
        <!--        <v-list-item-->
        <!--          v-for='(item, i) in items'-->
        <!--          :key='i'-->
        <!--          :to='item.to'-->
        <!--          router-->
        <!--          exact-->
        <!--        >-->
        <!--          <v-list-item-action>-->
        <!--            <v-icon>{{ item.icon }}</v-icon>-->
        <!--          </v-list-item-action>-->
        <!--          <v-list-item-content>-->
        <!--            <v-list-item-title v-text='item.title'/>-->
        <!--          </v-list-item-content>-->
        <!--        </v-list-item>-->
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left clipped-right fixed app>
      <!--      <v-btn icon @click.stop='miniVariant = !miniVariant'>-->
      <!--        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>-->
      <!--      </v-btn>-->
      <!--      <v-btn icon @click.stop='clipped = !clipped'>-->
      <!--        <v-icon>mdi-application</v-icon>-->
      <!--      </v-btn>-->
      <!--      <v-btn icon @click.stop='fixed = !fixed'>-->
      <!--        <v-icon>mdi-minus</v-icon>-->
      <!--      </v-btn>-->
      <v-icon @click="toIndex()">mdi-horse-variant-fast</v-icon>
      <v-toolbar-title class="o_title ml-2" v-text='title' @click="toIndex()"/>
      <v-spacer/>
      <v-app-bar-nav-icon @click.stop='drawer = !drawer'/>

      <!--            <v-btn icon @click.stop='rightDrawer = !rightDrawer'>-->
      <!--              <v-icon>mdi-menu</v-icon>-->
      <!--            </v-btn>-->
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt/>
      </v-container>
    </v-main>
    <!--    <v-navigation-drawer v-model='rightDrawer' :right='right' temporary fixed>-->
    <!--      <v-list>-->
    <!--        <v-list-item @click.native='right = !right'>-->
    <!--          <v-list-item-action>-->
    <!--            <v-icon light> mdi-repeat</v-icon>-->
    <!--          </v-list-item-action>-->
    <!--          <v-list-item-title>Switch drawer (click me)</v-list-item-title>-->
    <!--        </v-list-item>-->
    <!--      </v-list>-->
    <!--    </v-navigation-drawer>-->
    <v-footer :absolute=true app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
// import {Component, Vue} from "nuxt-property-decorator";
//
// interface item {
//   icon: string;
//   title: string;
//   to: string;
// }
//
// @Component({
//   components: {}
// })
// export default class extends Vue {
//   clipped = false;
//   drawer = false;
//   fixed = false;
//   items: item[] = [
//     // {
//     //   icon: 'mdi-apps',
//     //   title: 'Welcome',
//     //   to: '/'
//     // },
//     // {
//     //   icon: 'mdi-chart-bubble',
//     //   title: 'Inspire',
//     //   to: '/inspire'
//     // },
//     {
//       icon: 'mdi-chart-bubble',
//       title: '指名馬一覧',
//       to: '/NominatedHorseList'
//     }
//   ];
//
//   miniVariant = false;
//   right = true;
//   rightDrawer = false;
//   title = 'PAORG';
//   years: [number][] = [
//     [2022],
//     [2021],
//   ];
//
//   /**
//    * 選択された年度を各コンポーネント用に展開する
//    * @param value 年度
//    */
//   setYear(value: number) {
//     this.$nuxt.$emit('year', value)
//     this.drawer = !this.drawer
//   }
//
//   /**
//    * 初期表示ページに遷移する
//    */
//   toIndex() {
//     this.$nuxt.$emit('year', 2022)
//     this.$router.push('/')
//   }
// }

import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        // {
        //   icon: 'mdi-apps',
        //   title: 'Welcome',
        //   to: '/'
        // },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'Inspire',
        //   to: '/inspire'
        // },
        {
          icon: 'mdi-chart-bubble',
          title: '指名馬一覧',
          to: '/NominatedHorseList'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'PAORG',
      years: [
        [2022],
        [2021],
      ]
    }
  },

  methods: {
    /**
     * 選択された年度を各コンポーネント用に展開する
     * @param value 年度
     */
    setYear(value: number) {
      this.$nuxt.$emit('year', value)
      this.drawer = !this.drawer
    },

    /**
     * 初期表示ページに遷移する
     */
    toIndex() {
      this.$nuxt.$emit('year', 2022)
      this.$router.push('/')
    }
  },
})

</script>
<style scoped lang='scss'>
.o_title {
  cursor: pointer;
}

</style>
