<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <footer class="l-page-footer l-border-t">
        <a class="button button-fill l-btn"><i class="l-icon">&#xe640;</i>&ensp;联系客服</a>
      </footer>
      <div class="content">
        <div class="l-panel-title l-border-b">
          <span class="l-text-gray">最近门店</span>
        </div>
        <div class="l-store-item l-margin-b" v-for="item in storeList">
          <router-link class="l-store-item-bd l-flex-h" :to="'/user/stores/info/'+item.store_id">
            <img class="l-thumb" :src="item.picpath">
            <div class="l-rest l-flex-v">
              <div class="l-rest">
                <span class="l-fs-s l-text-gray pull-right"><i class="l-icon">&#xe634;</i>{{toFixed(item.distance)}}km</span>
                <h4 v-text="item.store_name"></h4>
              </div>
              <p v-text="item.address"></p>
            </div>
          </router-link>
          <div class="l-store-item-ft l-flex-h l-border-t">
            <a class="l-rest l-flex-hvc l-border-r l-text-default" :href="'tel:' + item.telphone">
              <i class="l-icon">&#xe640;</i><span>&ensp;电话</span>
            </a>
            <div class="l-rest l-flex-hvc">
              <i class="l-icon">&#xe601;</i><span>&ensp;导航</span>
            </div>
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
      storeList: []
    }
  },
  methods: {
    toFixed(num = 0, point = 1) {
      return (num - 0).toFixed(point)
    }
  },
  created() {
    this.$server.getPosition().then((position)=>{
      $.showIndicator()
      this.$server.store.getList(1, 10, position.longitude, position.latitude)
      .then(({obj, list})=>{
        this.buyInfo = obj
        this.storeList = list
        this.sltedStore = list[0] || {}
      }).finally(()=>{
        $.hideIndicator()
      })
    })
  }

}
</script>