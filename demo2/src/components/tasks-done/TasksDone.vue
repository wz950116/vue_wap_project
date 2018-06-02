<template>
<div class="t-m-done">
    <vueLoading :loading="isLoading" color="#FF8550"></vueLoading>
    <div class="t-item bg-red-done"
        v-for="item in listData"
        :key="item.activityId">
        <div class="t-item-box" @click="goTaskPage(item.activityId)">
            <div class="item-main">
                <p class="item-main-title">{{item.title}}</p>
                <p class="item-main-sub">
                    <span class="item-main-sub__dot"></span>
                    <span class="item-main-sub__text">适用于{{item.estateName}}</span>
                </p>
                <p class="item-main-sub">
                    <span class="item-main-sub__dot"></span>
                    <span>有效期至{{item.endDate.replace(/-/g, '.')}}</span>
                </p>
            </div>
        </div>
    </div>
    <NoData v-if="listData.length === 0"></NoData>
</div>
</template>
<script>
import NoData from 'com/no-data/NoData'
import vueLoading from 'vue-spinner/src/ClipLoader.vue'
import $$api from '@/model/api'
export default {
    components: { NoData, vueLoading },
    data() {
        return {
            isLoading: true,
            listData: []
        }
    },
    watch: {
    },
    computed: {
        uid() {
            return this.$store.state.uid
        }
    },
    methods: {
        // 获取listData
        getListData() {
            $$api.getActivityList({
                uid: this.uid,
                type: 1
            }).then(res => {
                if (res.code == 200) {
                    this.listData = [].concat(res.data)
                    setTimeout(() => {
                        this.isLoading = false
                    }, 300)
                }
            })
        },
        goTaskPage(activityId) {
            location.href = `//activity.focus${window.env}.cn/activity-task/?activityId=${activityId}`
        }
    },
    beforeMount() {
        this.getListData()
    }
}
</script>
<style src="./style.less" lang="less" scoped></style>
