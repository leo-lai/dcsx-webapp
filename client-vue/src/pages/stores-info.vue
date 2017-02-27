<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <div class="content">
        <div class="l-margin-b">
          <div class="l-panel-title l-border-b">
            <span class="l-text-gray">门店名称</span>
          </div>
          <div class="l-panel-content l-padding" v-text="storeInfo.store_name"></div>
        </div>
        <div class="l-margin-b">
          <div class="l-panel-title l-border-b">
            <span class="l-text-gray">门店描述</span>
          </div>
          <div class="l-panel-content l-padding" v-text="storeInfo.description"></div>
        </div>
        <div class="l-margin-b">
          <div class="l-panel-title l-border-b">
            <span class="l-text-gray">详细地址</span>
          </div>
          <div class="l-panel-content l-padding" v-text="storeInfo.address"></div>
        </div>
        <div class="l-margin-b">
          <div class="l-panel-title l-border-b">
            <span class="l-text-gray">门店电话</span>
          </div>
          <div class="l-panel-content l-padding" v-text="storeInfo.telphone"></div>
        </div>
        <div class="l-margin-b">
          <div class="l-panel-title l-border-b">
            <span class="l-text-gray">营业时间</span>
          </div>
          <div class="l-panel-content l-padding" v-text="storeInfo.buniness_hours"></div>
        </div>
        <div class="l-margin-b">
          <div class="l-panel-title l-border-b">
            <span class="l-text-gray">门店照片</span>
          </div>
          <div class="l-panel-content l-padding-s l-store-images">
            <img v-for="item in images" :src="item.picpath" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import lHeader from 'components/l-header'

export default {
  components: {
    lHeader
  },
  data () {
    return {
      images: [],
      storeInfo: {}  
    }
  },
  created() {
    $.showIndicator()
    this.$server.store.getInfo(this.$route.params.id)
    .then(({obj, list})=>{
      this.storeInfo = obj
      this.images = list
    }).finally(()=>{
      $.hideIndicator()
    })
  }
}
</script>
<style scoped>
.l-store-images{overflow:hidden;}
.l-store-images img{
  float: left;
  margin: 0.375rem;
  width: 5.0rem;
  height: 5.0rem;
}
</style>