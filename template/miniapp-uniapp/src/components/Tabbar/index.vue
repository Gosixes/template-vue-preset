<template>
  <u-tabbar v-model="currentInside"
            :list="tabList"
            active-color="#1E2F68"
            inactive-color="#5E5E5E"></u-tabbar>
</template>

<script>
  export default {
    name: 'Tabbar',
    props: {
      current: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        currentInside: 1,
        tabList: [
          {
            iconPath: "/static/tabbar/file.png",
            selectedIconPath: "/static/tabbar/file_selected.png",
            text: '文件管理',
            customIcon: false,
            pagePath: '/pages/files/index'
          },
          {
            iconPath: "/static/tabbar/me.png",
            selectedIconPath: "/static/tabbar/me_selected.png",
            text: '账户',
            customIcon: false,
            pagePath: '/pages/me/index'
          },
        ]
      }
    },

    methods: {
      handleTabChange() {

      }
    }
  }
</script>
