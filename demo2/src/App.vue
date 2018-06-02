<template>
    <div id="app">
        <mainContainer></mainContainer>
    </div>
</template>

<script>
import mainContainer from 'com/MainContainer/MainContainer'
export default {
    name: 'App',
    components: { mainContainer }
}
</script>

<style lang="less">
@import "../static/css/reset.less";
@import 'assets/css/common.less';
#app {
    .normalFont;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}
</style>
