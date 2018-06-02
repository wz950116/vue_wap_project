<template>
<div class="t-m-ing">
    <vueLoading :loading="isLoading" color="#FF8550"></vueLoading>
    <div class="t-item bg-red-ing"
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
                <div class="item-main-rate">
                    <div class="item-main-rate__bg">
                        <div
                            class="progress-bar"
                            :style="{width: !showProgressBar ? '0' : (item.withdrewAmount / item.totalAmount).toFixed(3) * 100 + '%'}">
                        </div>
                    </div>
                    <div class="item-main-rate__text">已提现{{item.withdrewAmount}}/{{item.totalAmount}}</div>
                </div>
                <div class="item-main-tag">{{taskNames[item.nextStep].name}}</div>
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
            listData: [],
            showProgressBar: false,
            taskNames: [{
                type: 0,
                name: '拨打热线'
            }, {
                type: 1,
                name: '现场看房'
            }, {
                type: 2,
                name: '立即提现'
            }]
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
                type: 0
            }).then(res => {
                if (res.code == 200) {
                    this.listData = [].concat(res.data)
                    this.showProgress()
                }
            })
        },
        // 延时设置进度条宽度
        showProgress() {
            setTimeout(() => {
                this.showProgressBar = true
                this.isLoading = false
            }, 300)
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
