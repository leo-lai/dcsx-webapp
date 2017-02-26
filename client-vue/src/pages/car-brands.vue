<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <div class="content">
        <!-- 车品牌列表 -->
        <div class="list-block contacts-block l-car-model-list">
          <div class="list-group" v-cloak v-for="(brandList, letter) in brands">
            <ul>
              <li class="list-group-title" v-text="letter"></li>
              <li v-for="item in brandList" @click="sltBrand(item)">
                <div class="item-content">
                  <div class="item-media">
                    <img class="l-thumb" :src="item.icon">
                  </div>
                  <div class="item-inner">
                    <div class="item-title" v-text="item.name"></div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 车品牌列表 end-->
      </div>
    </div>
    
    <!-- 车系列 -->
    <div class="panel panel-right panel-cover l-panel-big" id="panel-right">
      <div class="l-flex-v l-panel-inner">
        <header class="l-panel-hd">
          <div class="l-flex-hvc l-padding-s">
            <img style="height: 2rem;" class="l-thumb l-margin-r-s" :src="sltedBrand.icon">
            <h3 v-text="sltedBrand.name">车品牌</h3>
          </div>
          <div class="_sub-tit">车系</div>
        </header>
        <div class="l-panel-bd l-rest">
          <div class="list-block l-margin-0">
            <ul>
              <li class="item-content item-link" v-for="item in family" @click="sltFamily(item)">
                <div class="item-inner">
                  <div class="item-title" v-text="item.name"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 车系列 end-->
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
      brands: {},     // 品牌
      family: [],     // 车系
      sltedBrand: {}
    }
  },
  methods: {
    sltBrand(item) {
      this.sltedBrand = item
      $.showIndicator()
      this.$server.car.getFamily(item.id)
      .then((response)=>{
        $.hideIndicator()
        this.family = response.list
        this.$nextTick(()=>{
          $.openPanel('#panel-right')
        })
      })
    },
    sltFamily(item) {
      this.$router.push(`/car/group/${item.id}`)  
    }
  },
  created() {
    this.$server.car.getBrands().then((response)=>{
      setTimeout(()=>{
        this.brands = groupByLetter(response.list)
      }, 600)
    })  
  },
  beforeRouteLeave(to, from, next) {
    $.closePanel()
    next()
  }
}

// 车品牌按字母排序
function groupByLetter(arr = []){ 
  const retObject = {}
  arr.forEach((item, index)=>{
    retObject[item.letter] = retObject[item.letter] || [];
    retObject[item.letter].name = item.letter
    retObject[item.letter].push(arr[index])
  })
  return retObject
}
</script>
<style>
.l-car-model-list{margin:0;}
.l-car-model-list .l-thumb{width: 3.0rem; height: 2.0rem;}
.l-car-model-list .list-group-title{text-transform: uppercase;}
</style>