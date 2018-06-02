<template>
<div class="mc">
    <div class="navbar">
        <navbar></navbar>
    </div>
    <div class="list-main" v-if="asynDataReady">
        <tasksIng v-show="navbarActive === 0"></tasksIng>
        <tasksDone v-show="navbarActive === 1"></tasksDone>
        <tasksEx v-show="navbarActive === 2"></tasksEx>
    </div>
    <!-- <div class="footer">领取更多福利 >></div> -->
</div>
</template>
<script>
import navbar from 'com/navbar/Navbar.vue'
import tasksIng from 'com/tasks-ing/TasksIng'
import tasksDone from 'com/tasks-done/TasksDone'
import tasksEx from 'com/tasks-expired/TasksExpired'
import $$api from '@/model/api'
export default {
    components: {
        navbar: navbar,
        tasksIng: tasksIng,
        tasksDone: tasksDone,
        tasksEx: tasksEx
    },
    data() {
        return {
            asynDataReady: false
        }
    },
    computed: {
        navbarActive() {
            return this.$store.state.navbarActive
        }
    },
    methods: {
        getUidfromCookie() {
            $$api.getUserInfoFromCookie().then(res => {
                if (res.code == 200) {
                    this.$store.commit('setUserId', res.data.uid)
                    // 测试用的uid
                    this.asynDataReady = true
                } else {
                    if ((/^\d+\.\d+\.\d+\.\d+/).test(location.hostname)) {
                        // 本地开发，种一个测试uid
                        this.$store.commit('setUserId', 144028935)
                        this.asynDataReady = true
                    } else {
                        // 跳转至登录页
                        location.href = `//login.focus${window.env}.cn/login?ru=${location.href}`
                    }
                }
            })
        }
    },
    beforeMount() {
        this.getUidfromCookie()
    }

}
</script>
<style src="./style.less" lang="less" scoped></style>
