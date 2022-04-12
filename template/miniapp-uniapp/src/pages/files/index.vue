<template>
  <div>
    <file-list ref="fileList" is-home />

    <tabbar ref="tabbar" />
  </div>
</template>

<script>
import FileList from '@/components/FileList'
import Tabbar from '@/components/Tabbar'
export default {
  components: {Tabbar, FileList},
  onReady() {

  },

  methods: {
    getMediaRes() {
      return this.$refs['fileList'].mediaRes
    }
  },

  onShareAppMessage() {

  }
}
</script>
