<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "app"
  };
</script>

<style>
  @import url(./assets/css/sandalstrap.css);
  @import url(./assets/iconfont/iconfont.css);
  html,
  body {
    width: 100%;
    height: 100%;
    background: #f0f0f0;
  }
  #app {
    width: 100%;
    height: 100%;
  }
  /* ul>li横排 */
  .ul-row {
    *zoom: 1;
    /*IE/7/6*/
  }
  .ul-row::before,
  .ul-row::after {
    content: "";
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both;
  }
  .ul-row:after {
    clear: both;
  }
  .ul-row>li {
    float: left;
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .container {
    width: 1216px;
    padding: 0 24px;
    margin: 0 auto;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
  }
</style>
