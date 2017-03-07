<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <div class="content">
        <!-- 车品牌列表 -->
        <div class="list-block contacts-block l-car-model-list">
          <div :id="letter" class="list-group" v-for="(brandList, letter) in brands">
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
      <div id="l-letter-list" class="l-letter-list l-flex-vhc">
        <div class="_inner">
          <a :href="'#'+letter" :letter="letter" v-text="letter" v-for="(brandList, letter) in brands"></a>
        </div>
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
      .then(({list})=>{
        $.hideIndicator()
        this.family = list
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
    $.showIndicator()
    this.$server.car.getBrands().then(({list})=>{
      setTimeout(()=>{
        this.brands = groupByLetter(list)
      }, 600)
    }).finally(()=>{
      $.hideIndicator()
    })
  },
  mounted() {
    const self = this
    let timeid = 0
    $('#l-letter-list').on('click', 'a', function(){
      $('.content').scrollTop($('.content').scrollTop() + $('#' + $(this).attr('letter')).position().top)
      // window.location.replace(self.$route.path + $(this).attr('href'))
      // self.$router.replace(self.$route.path + $(this).attr('href'))
      return false
    }).on('touchmove', function(e){
      clearTimeout(timeid)
      // timeid = setTimeout(()=>{
        if(e.target.tagName.toLowerCase() === 'a'){
          let a = document.elementFromPoint(e.touches[0].pageX, e.touches[0].pageY)
          $('.content').scrollTop($('.content').scrollTop() + $('#' + $(a).attr('letter')).position().top)  
        }
      // }, 50)
      return false
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
<style scoped>
.l-bar-nav ~ .l-letter-list{top: 2.2rem;}
.l-letter-list{position: absolute; top: 0; bottom: 0; right: 0; z-index: 999;  }
.l-letter-list ._inner{width: 1.5rem;margin: 0 0.375rem; font-size: 0.7rem;opacity: 0.6;text-align: center; padding: 0.75rem 0;border-radius: 0.75rem;}
.l-letter-list ._inner:active{ opacity: 0.9;background-color: #f3f3f3;}
.l-letter-list a{display: block; color: #999; width: 100%;}
.l-car-model-list{margin:0; backface-visibility: visible;}
.l-car-model-list .l-thumb{width: 3.0rem; height: 2.0rem;}
.l-car-model-list .list-group-title{text-transform: uppercase;}
.l-car-model-list ul{-webkit-transform: translate3d(0,0,0);}
</style>