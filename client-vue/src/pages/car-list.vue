<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <footer class="l-footer-fixed">
        <router-link class="button l-btn-bg1 l-margin-s" to="/car/add">添加车辆信息</router-link>
      </footer>
      <div class="content">
        <p class="l-margin l-fs-s l-text-gray">注：最多只能添加5辆车辆信息</p>
        <transition-group class="l-car-list" tag="div" name="l-car-list">
          <div class="l-flex-hc l-padding l-car-list-item l-link" 
            v-for="item in carList" :key="item.id" v-if="!item.isDel" @click.stop="editCar(item.id)">
            <div class="l-thumb-bg l-margin-r" :style="{'background-image': 'url(' +item.logo+ ')'}"></div>
            <div class="l-rest">
              <h4 class="l-margin-0 l-text-wrap2 l-fs-m" v-text="item.model_name"></h4>
              <i class="_carnum" v-text="item.car_license"></i>
              <i v-if="item.is_default == 1" class="_default">默认</i>
            </div>
            <div class="_del_edit">
              <i @click.stop="delCar(item)">删除</i>
              <i>编辑</i>
            </div>
          </div>
        </transition-group>
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
      carList: []
    }
  },
  methods: {
    delCar(item) {
      $.confirm(`确定删除车辆(${item.car_license}) ?`, ()=>{
        item.isDel = true
        this.$server.car.del(item.id).catch((errMsg)=>{
          item.isDel = false
          $.alert(errMsg)
        })
      })
    },
    editCar(id) {
      this.$router.push(`/car/edit/${id}`)
    }
  },
  created() {
    // 获取车辆信息
    setTimeout(()=>{
      $.showIndicator()
      this.$server.car.getList().then((response)=>{
        this.carList = response.list.map((item)=>{
          item.isDel = false
          return item
        })  
      }).finally(()=>{
        $.hideIndicator()
      })
    }, 600)
    
  }
}

</script>
<style>
.l-car-list-enter, 
.l-car-list-leave-active {
  opacity: 0;
  transform: translateY(-30px);
}
.l-car-list-leave-active {position: absolute; left:0; right: 0; }

.l-car-list{margin:0 0.75rem; position: relative;}
.l-car-list .l-car-list-item{margin-bottom: 0.75rem; transition: all 0.8s;}
.l-car-list-item ._del_edit{
  position: absolute;
  right: 0;
  bottom: 0;
  width: 3.675rem;
  height: 1.4rem;
  background: url(~assets/img-035.png) no-repeat 50% 50%;
  background-size: contain;
  overflow: hidden;
  font-size: 0;
}
.l-car-list-item ._del_edit i{
  float: left;
  width: 50%;
  height: 100%;
}
</style>