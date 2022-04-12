<template>
  <div class="app-container">
    <div class="file-item"
         v-for="item in datas" :key="item.id"
         @click="toInner(item)">
      <div>
        <img class="icon-img" :src="calItemIcon(item.type)" />
      </div>
      <div class="file-name u-line-1">{{item.name}}</div>
      <div class="more-dot" @click.stop="onMoreClick"></div>
    </div>

    <div class="add-new" :style="{bottom: isHome ? '180rpx' : '80rpx'}"
         @click="onAddNewClick">
      <u-icon name="plus" size="32"></u-icon>
      <span class="add-text">上传</span>
    </div>

    <u-popup v-model="addPopupShow" mode="bottom"
             safe-area-inset-bottom
             border-radius="40"
             closeable>
      <view class="popup-main">
        <div class="option-box" @click="handlePhoto">
          <img class="option-img" src="@/static/files/filesimg.png" />
          <div>上传图片</div>
        </div>
        <div class="option-box" @click="handleVideo">
          <img class="option-img" src="@/static/files/video.png" />
          <div>上传视频</div>
        </div>
        <div class="option-box" @click="handleWxFile">
          <img class="option-img" src="@/static/files/file.png" />
          <div>微信文件</div>
        </div>
        <div class="option-box">
          <img class="option-img" src="@/static/files/file.png" />
          <div>创建文件夹</div>
        </div>
      </view>
    </u-popup>

    <u-popup v-model="morePopupShow" mode="bottom"
             safe-area-inset-bottom
             border-radius="40"
             closeable>
      <div class="more-popup-main">
        <div class="item-name">
          <img class="icon-img" :src="calItemIcon(selectedItem.type)" />
          <div class="file-name u-line-1">{{selectedItem.name}}</div>
        </div>
        <u-cell-group :border="false">
          <u-cell-item icon="setting-fill" title="详细信息"
                       :border-top="true"
                       :border-bottom="false"></u-cell-item>
          <u-cell-item icon="integral-fill" title="删除"></u-cell-item>
        </u-cell-group>
      </div>
    </u-popup>
  </div>
</template>

<script>
export default {
  name: 'FileList',
  props: {
    isHome: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      datas: [
        {id: '12', name: '一个文件夹', type: 1},
        {id: '13', name: '文件夹2', type: 1},
        {id: '14', name: '这是一个视频文件这是一个视频文件这是一个视频文件', type: 2},
        {id: '15', name: '名字很长的名字23232很长的的文件夹2', type: 1},
      ],
      addPopupShow: false,
      morePopupShow: false,
      mediaRes: undefined,

      selectedItem: {
        type: 1,
        name: '名字名字'
      }
    }
  },

  computed: {
    addBtnBottom() {

    }
  },

  methods: {
    calItemIcon(type) {
      switch (type) {
        case 1:
          return require('@/static/files/file.png')
        case 2:
          return require('@/static/files/video.png')
      }
    },
    toInner(item) {
      if (item.type !== 1) return
      const params = JSON.stringify({
        id: item.id,
        name: item.name
      })
      uni.$y.safeNavigate('/pages/files/inner?params=' + encodeURIComponent(params))
    },

    onAddNewClick() {
      this.addPopupShow = true
    },

    onMoreClick() {
      this.morePopupShow = true
    },

    handlePhoto() {
      const that = this
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        success(res) {
          that.mediaRes = res
          that.addPopupShow = false
          uni.$y.navigate('/pages/files/file-operate')
        }
      })
    },

    handleVideo() {
      const that = this
      wx.chooseMedia({
        count: 1,
        mediaType: ['video'],
        success(res) {
          that.mediaRes = res
          that.addPopupShow = false
          uni.$y.navigate('/pages/files/file-operate')
        }
      })
    },

    handleWxFile() {
      const that = this
      wx.chooseMessageFile({
        count: 1,
        type: 'all',
        success(res) {
          that.mediaRes = res
          that.addPopupShow = false
          uni.$y.navigate('/pages/files/file-operate')
        }
      })
    }
  }
}
</script>

<style lang="scss">
.file-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0 20rpx 18rpx;
  height: 100rpx;
  .icon-img {
    width: 50rpx;
    height: 50rpx;
    vertical-align: middle;
  }
  .file-name {
    margin-left: 32rpx;
    font-size: 32rpx;
  }
  .more-dot {
    flex-shrink: 0;
    margin-left: auto;
    height: 100%;
    width: 100rpx;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAICAYAAAHrdx0EAAAAAXNSR0IArs4c6QAAARdJREFUOBG1kzFWwzAMhm1PydoNHmvGpFtnrlEOwiE4CFyDmY1kzNi+dmNNNqPPsfJEX92peLB+6f9lyXLiXF7DMJyA4zg+OXUI9H3/7gnEGB+6rvM5GL3357ZtH0UQiSVlSheMJTMRsnFAELufpulAMNs9WE/3OSMFIbQceC2D49yHcC+Ay5xQ1/UrBEt6/FnQslvf6ixG4+l/nucvufSnVtKDqCii56qqdk3THDV+mcN1lsksimLLt67J0NZFVXUs1tg1iy7Its6BtlVosdXAWx+dzuRbZrLRA1Qogq2dhfJ5JnfNCflh/jRBQRqD0+LW/kdO4OuwRSwucaU4uSWuFNec9E8yavmr3nhwJfiurz0LPOveOb80evz1HfCdkgAAAABJRU5ErkJggg==") no-repeat;
    background-position: 50%;
    background-size: 34rpx;
  }
}

.add-new {
  position: fixed;
  right: 30rpx;
  display: flex;
  align-items: center;
  width: 180rpx;
  height: 70rpx;
  padding: 0 20rpx 0 30rpx;
  font-size: 30rpx;
  color: #fff;
  background-color: #1E2F68;
  border-radius: 40rpx;
  .add-text {
    margin-left: 20rpx;
  }
}

.popup-main {
  display: flex;
  flex-wrap: wrap;
  padding: 40rpx 40rpx 20rpx;
  .option-box {
    width: 33.3%;
    margin-bottom: 28rpx;
    text-align: center;
  }
  .option-img {
    width: 100rpx;
    height: 100rpx;
  }
}

.more-popup-main {
  .item-name {
    display: flex;
    align-items: center;
    height: 120rpx;
    padding: 30rpx;
    .icon-img {
      width: 50rpx;
      height: 50rpx;
      vertical-align: middle;
    }
    .file-name {
      margin-left: 32rpx;
      font-size: 32rpx;
    }
  }
}
</style>
