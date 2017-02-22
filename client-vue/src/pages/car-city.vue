<template>
  <div class="content">
    <ul class="l-car-prefix-list">
      <li v-for="item in carCity" @click="sltCarCity(item)">
        <span v-text="item.oldName"></span>
        (<span v-text="item.province"></span>)
      </li>
    </ul>
  </div>
</template>

<script>
import carCityList from 'src/data/car-city.js'
export default {
  components: {
  },
  data () {
    return {
      carCity: carCityList   // 车牌城市
    }
  },
  computed: {
    
  },
  watch: {
    
  },
  created() {
    
  },
  mounted() {

  },
  updated() {

  },
  methods: {
    sltCarCity(item) {
      this.$eventHub.$emit('APP-CAR-CITY', item)
    }
  }
}
</script>
<style>
.l-car-model-list{margin:0;}
.l-car-model-list .l-thumb{width: 3.0rem; height: 2.0rem;}
.l-car-model-list .list-group-title{text-transform: uppercase;}
</style>