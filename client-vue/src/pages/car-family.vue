<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <div class="content">
        <div class="list-block l-car-model-list">
          <ul>
            <li class="item-content" v-for="item in family" @click="sltFamily(item)">
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
      family: []   // 车系
    }
  },
  methods: {
    sltFamily(item) {
      this.$storage.local.set('sltedFamily', item)
      this.$router.push(`/car/pailiang/${item.id}`)
    }
  },
  created() {
    $.showIndicator()
    this.$server.car.getFamily(this.$route.params.id)
    .then((response)=>{
      setTimeout(()=>{
        this.family = response.list
      }, 600)
    }).finally(()=>{
      $.hideIndicator()
    })
  }
}
</script>
<style>
</style>