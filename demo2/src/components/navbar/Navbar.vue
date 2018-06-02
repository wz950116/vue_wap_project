<template>
<div class="nav-m">
    <div class="nav-m-block"
        @click="switchNav(0)"
        :class="{'nav-m-block-active': navbarActive === 0}">
        <span class="nav-m-block__lable">进行中</span>
        <span class="nav-m-block__bar"></span>
    </div>
    <div class="nav-m-block"
        @click="switchNav(1)"
        :class="{'nav-m-block-active': navbarActive === 1}">
        <span class="nav-m-block__lable">已完成</span>
        <span class="nav-m-block__bar"></span>
    </div>
    <div class="nav-m-block"
        @click="switchNav(2)"
        :class="{'nav-m-block-active': navbarActive === 2}">
        <span class="nav-m-block__lable">已失效</span>
        <span class="nav-m-block__bar"></span>
    </div>
</div>
</template>
<script>
export default {
    computed: {
        navbarActive() {
            return this.$store.state.navbarActive
        }
    },
    methods: {
        switchNav(index) {
            this.$store.commit('switchNav', index)
        }
    }
}
</script>
<style src="./style.less" lang="less" scoped></style>
