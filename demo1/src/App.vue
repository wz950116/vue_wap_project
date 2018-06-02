<template>
    <keep-alive>
        <ul class='dev-list'>
            <li>
                <router-link to='/sale-action'>销售动作分析</router-link>
            </li>
            <li>
                <router-link to='/action-items'>有动作项目分析</router-link>
            </li>
            <li>
                <router-link to='/order-analysis'>下单分析</router-link>
            </li>
            <li>
                <router-link to='/400finish-analysis'>400完成分析</router-link>
            </li>
            <li>
                <router-link to='/trend-analysis'>趋势分析</router-link>
            </li>
        </ul>
        <router-view></router-view>
    </keep-alive>
</template>

<style scoped lang='less'>
    .dev-list {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: nowrap;
        width: 100%;
        font-size: .37rem;
        color: red;
        line-height: .5rem;

        li {
            padding: .5rem;
        }
    }
</style>

<script>
    import 'static/css/reset.less';
    export default {
        data () {
            return {
                
            }
        },
        
    }
</script>