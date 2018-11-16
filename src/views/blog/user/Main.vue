<template>
  <div>
    <div class="container clearfix">
      <main>
        <router-view></router-view>
      </main>
      <aside>
        <UserInf></UserInf>
        <SpotNews></SpotNews>
        <Classify></Classify>
        <File></File>
        <HostArticle></HostArticle>
      </aside>
    </div>
  </div>
</template>
<script>
import UserInf from "./UserInf";
import SpotNews from "./SpotNews";
import Classify from "./Classify";
import File from "./File";
import HostArticle from "./HostArticle";

export default {
  components: {
    UserInf,
    SpotNews,
    Classify,
    File,
    HostArticle
  },
  data() {
    return {
      num1: 1
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>
<style scoped>
aside {
  width: 300px;
  float: right;
}
main {
  width: 900px;
  float: left;
}
</style>
