<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <div class="content">
        
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
      goodsInfo: {}
    }
  },
  created() {
    setTimeout(()=>{
      this.$server.combo.getInfo(this.$route.params.id)
      .then((obj)=>{
        this.goodsInfo = obj
      })
    }, 600)
  }
}
</script>
<style lang="less">

</style>