<template>
  <div>
    <file-list />
  </div>
</template>

<script>
import FileList from '@/components/FileList'
export default {
  components: {FileList},

  onLoad(options) {
    const params = JSON.parse(decodeURIComponent(options.params))
    uni.setNavigationBarTitle({title: params.name})
  }
}
</script>
