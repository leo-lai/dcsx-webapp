<template>
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
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      pailiang: []   // 车系
    }
  },
  computed: {
    
  },
  watch: {
    
  },
  created() {
    let id = this.$route.params.id
    this.$http.getJSON(`/Member/car/pailiang/${id}`).then((response)=>{
      this.pailiang = response.list
    })
  },
  mounted() {

  },
  updated() {

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