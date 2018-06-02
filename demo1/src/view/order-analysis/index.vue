<template>
    <div id="app">
        <!-- 筛选框 -->
        <div class="selecters">
            <selecter 
                @change="handleDateChange(arguments[0])" 
                :options="timeOptions"
                :defaultIndex='timeShowIndex'
                class="selectStyle m-l-1" />
            <selecter 
                @change="handleScoreChange(arguments[0])" 
                :options="scoreOptions"
                class="selectStyle m-l-2" />
        </div>

        <!-- 主体内容 -->
        <div class='app-content'>
            <!-- 信息概览 -->
            <div class='info'>
                <ul class='info-wrap'>
                    <li class='info-item info-left'>
                        <div class='info-num'>
                            {{ infoShow.orderMoney }}
                            <span class='info-num-denominator'>万</span> 
                        </div>
                        <div class='info-name'>下单金额</div>
                    </li>
                    <li class='divide-line'></li>
                    <li class='info-item info-middle'>
                        <div class='info-num'>
                            {{ infoShow.orderItem.up }}
                            <span class='info-num-denominator'>/{{ infoShow.orderItem.down }}</span>
                        </div>
                        <div class='info-name'>下单项目数</div>
                    </li>
                    <li class='divide-line'></li>
                    <li class='info-item info-right'>
                        <div class='info-num'>
                            {{ infoShow.targetFinished }}
                            <span class='info-num-denominator'>%</span> 
                        </div>
                        <div class='info-name'>年度目标完成</div>
                    </li>
                </ul>
            </div>
            <!-- 各销售部动作 -->
            <saleActionBarGraph 
                title='各销售部情况' 
                barId='barGraph1' 
                :drawLabelData='barGraph1Label'
                :drawValueData='barGraph1Value'
                :barOptions='barOptions'
                @change='handleBranchChange(arguments[0])'>
            </saleActionBarGraph>
            <saleActionBarGraph 
                title='各销售小组情况' 
                barId='barGraph2' 
                :drawLabelData='barGraph2Label'
                :drawValueData='barGraph2Value'
                :barOptions='barOptions'
                @change='handleGroupChange(arguments[0])'>
            </saleActionBarGraph>
            <saleActionPieChart 
                title='单笔下单金额分布' 
                pieId='pieChart1'
                :drawData='pieGraph1Value'>
            </saleActionPieChart>
            <saleActionPieChart 
                title='项目累计下单金额分布' 
                pieId='pieChart2'
                :drawData='pieGraph2Value'>
            </saleActionPieChart>
            <saleActionBarGraphY
                title='一线销售下单排行'
                :selectShow='true'
                :barOptions='barOptions'
                :drawData='barGraphYData'
                @change='handleOnelineSaleChange(arguments[0])'>
            </saleActionBarGraphY>
            <saleActionBarGraphY
                title='项目下单排行'
                :selectShow='true'
                :barOptions='barOptions'
                :drawData='barGraphYData'
                @change='handleItemOrderChange(arguments[0])'>
            </saleActionBarGraphY>
        </div>
        
        <!-- 日期选择器 -->
        <div class="date-shadow" v-show='showDatePicker'></div>
        <div class='date-picker-btn' v-show='showDatePicker'>
            <span style='float:left;' @click='showDatePicker = false'>取消</span>
            <span style='float:right;color:#799FF3;' @click='confirmDate'>确认</span>
        </div>
        <mt-picker
            ref='picker'
            :slots="slots" 
            @change="onValuesChange" 
            v-show='showDatePicker'>
        </mt-picker>
    </div>
</template>

<script>
    import { Picker } from 'mint-ui';
    import selecter from 'components/selecter/selecter';
    import saleActionBarGraph from 'components/sale-action-barGraph';
    import saleActionBarGraphY from 'components/barGraph-y';
    import saleActionPieChart from 'components/sale-action-pieChart';
    import { getBeforeDate, getTime, lastMonthDate, _dateTimeFormatter } from 'utils/Time.js';

    export default {
        data () {
            return {
                timeShowIndex: 0,
                // 顶部select选项
                timeOptions: [
                    {
                        "value": [getBeforeDate(1)[0], getBeforeDate(1)[0]],
                        "text": "昨日"
                    }, 
                    {
                        "value": [getTime(0), getTime(-6)],
                        "text": "本周"
                    }, 
                    {
                        "value": [getTime(7), getTime(1)],
                        "text": "上周"
                    }, 
                    {
                        "value": lastMonthDate(1),
                        "text": "本月"
                    }, 
                    {
                        "value": lastMonthDate(0),
                        "text": "上月"
                    }, 
                    {
                        "value": 5,
                        "text": "历史"
                    }
                ],
                scoreOptions: [
                    {
                        "value": 0,
                        "text": "全部评分"
                    },
                    {
                        "value": 1,
                        "text": "9.5以上"
                    },
                    {
                        "value": 1,
                        "text": "8.0-9.5"
                    },
                    {
                        "value": 1,
                        "text": "6.5-8.0"
                    },
                    {
                        "value": 1,
                        "text": "5.0-6.5"
                    },
                    {
                        "value": 1,
                        "text": "5.0以下"
                    }
                ],

                // 条形柱状图1
                barGraph1Label: [],
                barGraph1Value: [],
                barGraph2Label: [],
                barGraph2Value: [],
                // 环形图1
                pieGraph1Value: [],
                // 环形图2
                pieGraph2Value: [],
                // 条形柱状图2
                barGraphYData: [],
                // 条形柱状图1 - 右侧筛选框
                barOptions: [],
                // 时间选择器的显示/隐藏
                showDatePicker: false,
                dateList: [],
                slots: [
                    {
                        flex: 1,
                        values: [],
                        className: 'slot1',
                        textAlign: 'right',  // 文字对齐方式
                        defaultIndex: 0,
                        value: '2018.05',
                        valueKey: 0,
                    }, 
                    {
                        flex: 1,
                        divider: true,
                        content: '',
                        className: 'slot2',
                    }, 
                    {
                        flex: 1,
                        values: [],
                        className: 'slot3',
                        textAlign: 'left',
                        defaultIndex: 0,
                        value: '2018.05',
                        valueKey: 0,
                    }
                ],

                // 发送请求参数
                startTimeParam: '', 
                endTimeParam: '',
                type: '',

                // 信息概览
                infoShow: {
                    orderMoney: 150,
                    orderItem: {
                        up: 10,
                        down: 100,
                    },
                    targetFinished: 12,
                },
            }
        },
        methods: {
            initRender () {
                setTimeout(() => {
                    // 条形柱状图1
                    this.barGraph1Label = ['胡琪悦', '程力', '李兰'];
                    this.barGraph1Value = [17, 5, 3];

                    // 条形柱状图2
                    this.barGraph2Label = ['胡琪悦', '李丽丽', '程力', '胡伟', '李兰', '陈伟'];
                    this.barGraph2Value = [9, 7, 6, 5, 4, 2];

                    // 环形图1
                    this.pieGraph1Value = [{
                        value: 7,
                        name: '拜访客户'
                    }, {
                        value: 7,
                        name: '下单'
                    }, {
                        value: 5,
                        name: '提案'
                    }, {
                        value: 3,
                        name: '了解需求'
                    }, {
                        value: 3,
                        name: '线下活动'
                    }, {
                        value: 1,
                        name: '回款'
                    }, {
                        value: 1,
                        name: '投放广告'
                    }];

                    // 环形图2
                    this.pieGraph2Value = [{
                        value: 7,
                        name: '5条以上'
                    }, {
                        value: 6,
                        name: '3-4条'
                    }, {
                        value: 5,
                        name: '1-2条'
                    }, {
                        value: 3,
                        name: '0条'
                    }];

                    // 条形柱状图3
                    this.barGraphYData = [{
                        name: '胡琪悦',
                        value: 9,
                    }, {
                        name: '李丽丽',
                        value: 7,
                    }, {
                        name: '程力',
                        value: 6,
                    }, {
                        name: '胡伟',
                        value: 5,
                    }, {
                        name: '李兰',
                        value: 4,
                    }, {
                        name: '陈伟',
                        value: 2,
                    }, ];

                    // 条形柱状图1 - 右侧筛选框
                    this.barOptions = [{
                        label: '400完成量',
                        value: 0,
                    }, {
                        label: '400完成率',
                        value: 1,
                    }, {
                        label: '员工达标数',
                        value: 2,
                    }, {
                        label: '员工达标率',
                        value: 3,
                    }, {
                        label: '项目达标数',
                        value: 4,
                    }, {
                        label: '项目达标率',
                        value: 5,
                    }];
                }, 1000);
            },
            // 时间变动
            handleDateChange (obj) {
                if (obj.text == '历史') {
                    this.showDatePicker = true;
                };
                // 时间参数
                this.startTimeParam = obj.value[0];
                this.endTimeParam = obj.value[1];
            },
            // 类型变动
            handleScoreChange (obj) {
                this.type = obj.value;
            },
            // 销售部情况变动
            handleBranchChange (obj) {
                
            },
            // 销售小组情况
            handleGroupChange (obj) {
                
            },
            // 一线销售下单排名
            handleOnelineSaleChange (obj) {

            },
            // 项目下单排行
            handleItemOrderChange (obj) {

            },
            // 历史时间选择
            onValuesChange (picker, values) {
                // 确保slot2.value > slot1.value
                if (values[0] > values[1]) {
                    picker.setSlotValue(1, values[0]);
                }
                this.dateList = values;
            },
            // 历史时间确认
            confirmDate () {
                this.showDatePicker = false;
                this.timeOptions[5].value = this.dateList;
                this.timeShowIndex = 5;
                // 自定义时间参数
                this.startTimeParam = this.dateList[0].replace(/\./g, '-');
                this.endTimeParam = this.dateList[1].replace(/\./g, '-');
            },
        },
        components: {
            selecter,
            saleActionBarGraph,
            saleActionBarGraphY,
            saleActionPieChart,
        },
        mounted () {
            let nowYear = new Date().getFullYear(),
                nowMonth = new Date().getMonth() + 1, 
                nowDay = new Date().getDate(),
                slotArr = [], slot2Arr = [];
            for (let i = 1; i <= 12; i++) {
                let item = i < 10 ? '0' + i : i,
                    monthDay = new Date(nowYear, i, 0).getDate();
                for (let m = 1; m <= monthDay; m++) {
                    m = m < 10 ? '0' + m : m;
                    slotArr.push(nowYear + '.' + item + '.' + m);
                };
            };
            this.slots[0].values = slotArr;
            this.slots[2].values = slotArr;

            // 获取当天年月作为默认值
            let toMonth = nowYear + '.' + (nowMonth >= 10 ? nowMonth : '0' + nowMonth),
                toDay = toMonth + '.' + (nowDay <= 10 ? '0' + nowDay : nowDay);
            slotArr.forEach((item, index) => {
                if (item == toDay) {
                    this.slots[0].defaultIndex = index;
                    this.slots[2].defaultIndex = index;
                }
            });

            this.initRender();
        }
    }
</script>

<style lang="less">
    #app {
        wdith: 100%;
        background: #F8F8F8;
        font-family: 'PingFangSC'; 

        .selecters {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 1.47rem;
            border-bottom: 0.01rem solid #eeeeee;
            background: #fff;

            .selectStyle {
                height: .93rem;
                line-height: .93rem;

                .input {
                    text-align: center;
                }
                .input::after {
                    margin: .4rem 0 0 .13rem;
                }
                .input.active::after {
                    margin: .25rem 0 0 .13rem;
                }
            }
            .m-l-1 {
                width: 4.47rem;
                margin-right: .27rem;
                box-sizing: border-box;
            }
            .m-l-2 {
                width: 4.47rem;
                box-sizing: border-box;
            }
        }

        .app-content {
            padding: .27rem;

            .info {
                width: 100%;
                background: #fff;
                border-radius: 0.08rem;
                box-shadow: 0 .03rem .27rem 0 rgba(0, 0, 0, .1);

                .info-wrap {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    padding: .67rem 0;

                    .info-item {
                        width: 33.3%;
                        text-align: center;

                        .info-num {
                            width: 100%;
                            font-size: .67rem;
                            color: #666666;

                            .info-num-denominator {
                                font-size: .32rem;
                            }
                        }
                        .info-name {
                            width: 100%;
                            font-size: .32rem;
                            margin-top: .35rem;
                            color: #BBBBBB;
                        }
                    }
                    .divide-line {
                        width: 1px;
                        height: 1.07rem;
                        background: #eeeeee;
                    }
                }
            }
        }


        .date-shadow {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, .5);
            z-index: 5;
        }
        
        .date-picker-btn {
            position: fixed;
            top: auto;
            right: auto;
            bottom: 179px;
            left: 0;
            width: 100%;
            height: 1.33rem;
            line-height: 1.33rem;
            padding: 0 .4rem;
            border: .01rem solid #EEEEEE;
            background: #fff;
            font-size: .37rem;
            color: #666666;
            z-index: 7;
            box-sizing: border-box;
        }
        
        .picker {
            z-index: 6;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            background: #ffffff;

            .picker-items {
                
                .picker-item {
                    font-size: .37rem;
                    color: #BBBBBB;
                }
                .picker-selected {
                    font-size: .37rem;
                    color: #333333;
                }
                .picker-center-highlight::before, .picker-center-highlight::after {
                    background-color: #BBBBBB !important;
                }
            }
        }
    }
</style>