<template>
  <header :class="$style.mainheader">
    <h1>HTodo</h1>
  </header>
</template>
<script>
export default {
  data() {
    return {
      text: "1999111222"
    };
  }
};
</script>
<style module lang="stylus">
.main-Header
  text-align center
  h1
    font-size 100px
    color rgba(175, 47, 47, 1)
    font-weight 400
    margin 20px
</style>
