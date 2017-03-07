<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <div class="content">
        <div class="list-block l-margin-0">
          <ul>
            <li class="item-content" v-for="item in model" @click="sltModel(item)">
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
      model: []   // 车排量
    }
  },
  created() {
    $.showIndicator()
    this.$server.car.getModel(this.$route.params.id)
    .then((response)=>{
      setTimeout(()=>{
        this.model = response.list
      }, 600)
    }).finally(()=>{
      $.hideIndicator()
    })
  },
  methods: {
    sltModel(item) {
      this.$storage.session.set('sltedModel', item)
      this.$router.go(-3)
    }
  }
}
</script>