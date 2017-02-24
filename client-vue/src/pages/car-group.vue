<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <div class="content">
        <!-- 车组列表 -->
        <div class="list-block l-margin-0">
          <ul>
            <li class="item-content item-link" v-for="item in group" @click="sltGroup(item)">
              <div class="item-inner">
                <div class="item-title" v-text="item.name"></div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 车组列表 end-->
      </div>
    </div>
    <div class="panel-overlay"></div>
    <!-- 车排量 -->
    <div class="panel panel-right panel-cover l-panel-big" id="panel-right">
      <div class="l-flex-v l-panel-inner">
        <header class="l-panel-hd">
          <div class="l-flex-hvc l-padding-s">
            <h3 v-text="sltedGroup.name">车组</h3>
          </div>
          <div class="_sub-tit">车排量</div>
        </header>
        <div class="l-panel-bd l-rest">
          <div class="list-block l-margin-0">
            <ul>
              <li class="item-content item-link" v-for="item in pailiang" @click="sltPailiang(item)">
                <div class="item-inner">
                  <div class="item-title" v-text="item.name"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 车排量 end-->
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
      group: [],        // 车组
      pailiang: [],     // 车排量
      sltedGroup: {}
    }
  },
  methods: {
    sltGroup(item) {
      this.sltedGroup = item
      $.showIndicator()
      this.$server.car.getPailiang(item.id)
      .then((response)=>{
        $.hideIndicator()
        this.pailiang = response.list
        this.$nextTick(()=>{
          $.openPanel('#panel-right')
        })
      })
    },
    sltPailiang(item) {
      this.$router.push(`/car/model/${item.id}`)
    }
  },
  created() {
    this.$server.car.getGroup(this.$route.params.id)
    .then((response)=>{
      setTimeout(()=>{
        this.group = response.list
      }, 600)
    })  
  },
  beforeRouteLeave(to, from, next) {
    $.closePanel('#panel-right')
    next()
  }
}


</script>
