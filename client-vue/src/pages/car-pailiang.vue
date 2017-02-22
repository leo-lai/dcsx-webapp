<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <div class="content">
        <div class="list-block l-car-model-list">
          <ul>
            <li class="item-content" v-for="item in pailiang" @click="sltPailiang(item)">
              <div class="item-inner">
                <div class="item-title" v-text="item.name"></div>
              </div>
            </li>
          </ul>
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
      pailiang: []   // 车系
    }
  },
  created() {
    this.$server.car.getPailiang(this.$route.params.id)
    .then((response)=>{
      setTimeout(()=>{
        this.pailiang = response.list
      }, 600)
    })
  },
  methods: {
    sltPailiang(item) {
      this.$storage.local.set('sltedPailiang', item)
      this.$router.go(-3)
    }
  }
}
</script>
<style>
</style>