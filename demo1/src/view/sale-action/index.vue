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
                @change="handleTypeChange(arguments[0])" 
                :options="typeOptions"
                class="selectStyle m-l-2" />
        </div>

        <!-- 主体内容 -->
        <div class='app-content'>
            
            <!-- 信息概览 -->
            <div class='info'>
                <ul class='info-wrap'>
                    <li class='info-item info-left'>
                        <div class='info-num'>
                            {{ infoShow.actionNum }}
                        </div>
                        <div class='info-name'>动作数</div>
                    </li>
                    <li class='divide-line'></li>
                    <li class='info-item info-middle'>
                        <div class='info-num'>
                            {{ infoShow.averageAction }}
                        </div>
                        <div class='info-name'>人均动作</div>
                    </li>
                    <li class='divide-line'></li>
                    <li class='info-item info-right'>
                        <div class='info-num'>
                            {{ infoShow.hasAction.up }}
                            <span class='info-num-denominator'>/{{ infoShow.hasAction.down }}</span> 
                        </div>
                        <div class='info-name'>有动作人数</div>
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
                @change='handleBranchChange(arguments[0])'
                v-show='saleBranch.actions.length > 0'>
            </saleActionBarGraph>
            <saleActionBarGraph 
                title='各销售小组情况' 
                barId='barGraph2' 
                :drawLabelData='barGraph2Label'
                :drawValueData='barGraph2Value'
                :barOptions='barOptions'
                @change='handleGroupChange(arguments[0])'
                v-show='saleGroup.actions.length > 0'>
            </saleActionBarGraph>
            <saleActionPieChart 
                title='动作类型分布' 
                pieId='pieChart1'
                :drawData='actionTypeData'
                v-show='actionTypeData.length > 0'>
            </saleActionPieChart>
            <saleActionPieChart 
                title='一线销售日均动作分布' 
                pieId='pieChart2'
                :drawData='dayAvgActionData'
                v-show='dayAvgActionData.length > 0'>
            </saleActionPieChart>
            <saleActionBarGraphY
                title='一线销售动作排行'
                :drawData='actionRankData'
                v-show='actionRankData.length > 0'>
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
    import _ from "lib/underscore.v1.4.4.min";
    import { Picker } from 'mint-ui';
    import selecter from 'components/selecter/selecter';
    import saleActionBarGraph from 'components/sale-action-barGraph';
    import saleActionBarGraphY from 'components/barGraph-y';
    import saleActionPieChart from 'components/sale-action-pieChart';
    import { getBeforeDate, getTime, lastMonthDate, _dateTimeFormatter } from 'utils/Time.js';

    import $api from 'model/api';

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
                typeOptions: [
                    {
                        "value": 0,
                        "text": "全部类型"
                    },
                    {
                        "value": 1,
                        "text": "拜访客户"
                    },
                    {
                        "value": 2,
                        "text": "提案"
                    },
                    {
                        "value": 3,
                        "text": "签订合同"
                    },
                    {
                        "value": 4,
                        "text": "下单"
                    },
                    {
                        "value": 5,
                        "text": "投放广告"
                    },
                    {
                        "value": 6,
                        "text": "线下活动"
                    },
                    {
                        "value": 7,
                        "text": "回款"
                    },
                    {
                        "value": 8,
                        "text": "代收代付"
                    },
                    {
                        "value": 9,
                        "text": "其他"
                    }
                ],

                // 条形柱状图1
                barGraph1Label: [],
                barGraph1Value: [],
                barGraph2Label: [],
                barGraph2Value: [],
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
                    actionNum: '',
                    averageAction: '',
                    hasAction: {
                        up: '',
                        down: '',
                    }
                },

                // 各销售部情况
                saleBranch: {
                    actions: [],
                    actionsAvg: [],
                    hasActionAvg: [],
                    hasActions: [],
                },

                // 各销售小组情况
                saleGroup: {
                    actions: [],
                    actionsAvg: [],
                    hasActionAvg: [],
                    hasActions: [],
                },

                // 动作类型分布
                actionTypeData: [],

                // 一线销售日均动作分布
                dayAvgActionData: [],

                // 一线销售动作排行
                actionRankData: [],
            }
        },
        methods: {
            initRender () {
                let params = {
                    personId: 1801010339,
                    areaCode: -1,
                    salesRole: 1,
                    startDay: '2018-05-16',
                    endDay: '2018-05-18',
                    actionType: -1,
                };
                // 销售动作分析
                $api.internalStatInfo(params).then(res => {
                    if (res.msg === 'success') {
                        let data = res.data;
                        this.infoShow.actionNum = data.actionCnt;
                        this.infoShow.averageAction = data.actionPerMan;
                        this.infoShow.hasAction.up = data.hasActionCnt;
                        this.infoShow.hasAction.down = data.staffCnt;
                    }
                }).catch(e => {
                    console.log(e);
                });

                // 各销售部动作
                $api.departmentData(params).then(res => {
                    if (res.msg === 'success') {
                        this.saleBranch = res.data;
                        this.handleBranchChange({
                            label: '动作数',
                            value: 'actions',
                        })
                    }
                }).catch(e => {
                    console.log(e);
                });

                // 各销售小组动作
                $api.groupData(params).then(res => {
                    if (res.msg === 'success') {
                        this.saleGroup = res.data;
                        this.handleGroupChange({
                            label: '动作数',
                            value: 'actions',
                        })
                    }
                }).catch(e => {
                    console.log(e);
                });

                // 动作类型分布
                $api.actionTypeData(params).then(res => {
                    if (res.msg === 'success') {
                        let nameArr = res.data.res[0];
                        let valueArr = res.data.res[1];
                        nameArr.forEach((i, index) => {
                            this.actionTypeData.push({
                                value: valueArr[index],
                                name: i,
                            });
                        });
                    }
                }).catch(e => {
                    console.log(e);
                });

                // 一线销售日均动作分布
                $api.dayAvgActionData(params).then(res => {
                    let nameArr = ['0条', '0-1条', '1-2条', '2-3条', '3条以上'];
                    if (res.msg === 'success') {
                        nameArr.forEach((i, index) => {
                            this.dayAvgActionData.push({
                                name: i,
                                value: res.data[index],
                            });
                        });
                    }
                }).catch(e => {
                    console.log(e);
                });

                // 一线销售动作排行
                $api.actionRankData(params).then(res => {
                    if (res.msg === 'success') {
                        let nameArr = res.data.res[0];
                        let valueArr = res.data.res[1];
                        nameArr.forEach((i, index) => {
                            this.actionRankData.push({
                                value: valueArr[index],
                                name: i,
                            });
                        });
                    }
                }).catch(e => {
                    console.log(e);
                });
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
            handleTypeChange (obj) {
                this.type = obj.value;
            },
            // 销售部情况变动
            handleBranchChange (obj) {
                let type = obj.value;
                this.barGraph1Label = this.saleBranch[type][0];
                this.barGraph1Value = this.saleBranch[type][1];
            },
            // 销售小组情况
            handleGroupChange (obj) {
                let type = obj.value;
                this.barGraph2Label = this.saleGroup[type][0];
                this.barGraph2Value = this.saleGroup[type][1];
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

            // 精确到 日
            for (let i = 1; i <= 12; i++) {
                let item = i < 10 ? '0' + i : i,
                    monthDay = new Date(nowYear, i, 0).getDate();
                for (let m = 1; m <= monthDay; m++) {
                    m = m < 10 ? '0' + m : m;
                    slotArr.push(nowYear + '.' + item + '.' + m);
                };
            };
            // 精确到 月
            // for (let i = 1; i <= 12; i++) {
            //     let item = i < 10 ? '0' + i : i;
            //     slotArr.push(nowYear + '.' + item);
            // }
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

            // 条形柱状图1 - 右侧筛选框
            this.barOptions = [
                {
                    label: '动作数',
                    value: 'actions',
                }, {
                    label: '人均动作',
                    value: 'actionsAvg',
                }, {
                    label: '有动作人数',
                    value: 'hasActions',
                }
            ];

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