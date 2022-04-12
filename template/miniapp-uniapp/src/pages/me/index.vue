<template>
  <div>
    <div class="top-box">
      <u-avatar text="头像" size="128"></u-avatar>
      <div>用户昵称</div>
    </div>
    <u-gap height="12" bg-color="#FBFBFB"></u-gap>

    <u-cell-group>
      <u-cell-item title="账户信息" index="1"
                   @click="onCellClick">
        <img class="cell-icon-img" slot="icon" src="@/static/account_info.png" />
      </u-cell-item>
      <u-cell-item title="账号安全" index="2"
                   @click="onCellClick">
        <img class="cell-icon-img" slot="icon" src="@/static/account_security.png" />
      </u-cell-item>
      <u-cell-item icon="setting-fill" title="清理缓存" index="3"
                   @click="onCellClick"></u-cell-item>
    </u-cell-group>

    <div class="exit-btn-box">
      <u-button type="error" @click="onExitClick">退出登录</u-button>
    </div>

    <tabbar />
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar'
export default {
  components: {Tabbar},
  data() {
    return {

    }
  },

  methods: {
    onCellClick(index) {
      switch (index) {
        case '1': {
          uni.$y.navigate('/pages/account/info')
          break
        }
        case '2': {
          uni.$y.navigate('/pages/account/security')
          break
        }
      }
    },

    onExitClick() {
      uni.$y.modal('确认', '是否确认退出登录？').then(() => {
        wx.redirectTo({url: '/pages/login/index'})
      })
    }
  }
}
</script>

<style lang="scss">
.top-box {
  display: flex;
  align-items: center;
  height: 200rpx;
  padding: 10rpx 30rpx;
}
.exit-btn-box {
  width: 70%;
  margin: 100rpx auto;
}
.cell-icon-img {
  width: 34rpx;
  height: 34rpx;
  margin-right: 10rpx;
}
</style>
