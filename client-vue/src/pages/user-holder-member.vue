<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <div class="content l-infinite-scroll">
        <l-scroll :scroll="scroll">
          <div class="list-block l-margin-0">
            <ul>
              <li class="item-content" v-for="item in scroll.alldata">
                <div class="item-inner">
                  <div class="item-title" v-text="item.name"></div>
                  <div class="item-after l-text-gray l-fs-m"></div>
                </div>
              </li>
            </ul>
          </div>
        </l-scroll>
      </div>
    </div>
  </div>
  
</template>

<script>
import lHeader from 'components/l-header'
import lScroll from 'components/l-scroll'

export default {
  components: {
    lHeader, lScroll
  },
  data () {
    return {
      scroll: {}
    }
  },
  created() {
    this.scroll = this.$server.holder.getMember()
    setTimeout(()=>{
      this.scroll.init()
    }, 600)
  }
}
</script>