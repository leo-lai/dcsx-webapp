<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <div class="content">
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
      brands: {}   // 品牌
    }
  },
  computed: {
    
  },
  watch: {
    
  },
  created() {
    this.$server.car.getBrands().then((response)=>{
      setTimeout(()=>{
        this.brands = groupByLetter(response.list)
      }, 600)
    })  
  },
  mounted() {

  },
  updated() {

  },
  methods: {
    sltBrand(item) {
      this.$storage.local.set('sltedBrand', item)
      this.$router.push(`/car/family/${item.id}`)
    }
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