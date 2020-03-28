<template>
  <div id="app">
    <!-- <div id="cover"> -->
      <MyHeader></MyHeader>
      <todo></todo>
      <Footer></Footer>
    </div>
  <!-- </div> -->
</template>
<script>
import MyHeader from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'

export default {
components: {
    MyHeader,
    Footer,
    Todo
  }
}
</script>
<style lang="stylus" scoped>
  #app
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    #cover
        position absolute
        left 0
        right 0
        top 0
        bottom 0   
        background-color #999 
        opacity 0.5
        z-index -1
</style>