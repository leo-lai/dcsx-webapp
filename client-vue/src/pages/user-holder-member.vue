<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <div class="content">
        <div class="list-block l-margin-0">
          <ul>
            <li class="item-content" v-for="item in list">
              <div class="item-inner">
                <div class="item-title">标题标题标题标题标题标题标题标题标题标题标题</div>
                <div class="item-after l-text-gray l-fs-m">标签</div>
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
      list: []
    }
  },
  created() {
    setTimeout(()=>{
      $.showIndicator()
      this.$server.holder.getMember(1, 10).then(({list})=>{
        this.list = list
      }).finally(()=>{
        $.hideIndicator()
      })
    }, 600)
  }
}
</script>