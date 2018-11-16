<template>
    <div>
        <TopBar></TopBar>
        <Header></Header>
        <router-view :key="Date.parse(new Date())"></router-view>
        <BackToTop></BackToTop>
    </div>
</template>
<script>
import TopBar from "@/components/mdule/topbar";
import Header from "@/components/mdule/header";
import BackToTop from "@/components/backtop/index";
export default {
  components: {
    TopBar,
    Header,
    BackToTop
  }
};
</script>
