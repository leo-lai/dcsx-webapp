<template>
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
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      family: []   // 车系
    }
  },
  computed: {
    
  },
  watch: {
    
  },
  created() {
    let id = this.$route.params.id
    this.$http.getJSON(`/Member/car/family/${id}`).then((response)=>{
      this.family = response.list
    })
  },
  mounted() {

  },
  updated() {

  },
  methods: {
    sltFamily(item) {
      this.$storage.local.set('sltedFamily', item)
      this.$router.push(`/car/pailiang/${item.id}`)
    }
  }
}
</script>
<style>
</style>