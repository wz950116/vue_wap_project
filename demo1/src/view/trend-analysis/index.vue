<template>
	<div class='trend-wrapper'>
		<div class="selecters">
			<selecter 
                @change="handleChange(arguments[0])" 
                :options="timeOptions"
                :defaultIndex='timeShowIndex'
                class="selectStyle m-l-1" />
        </div>

        <div class='draw-content'>
			<div class='draw-tab' v-for='(item, index) in tabArr' @click='changeTab(index)'>
				<div 
					:class="['draw-tab-name', {'draw-tab-name-active': index == tabIndex}]">
					{{ item }}
				</div>
				<div class='draw-tab-underline' v-show='index == tabIndex'></div>
			</div>
        </div>

		<lineChart :drawData='drawData'></lineChart>

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
	import { DatetimePicker } from 'mint-ui';
	import selecter from 'components/selecter/trend-analysis-selecter';
	import lineChart from 'components/lineChart';
	import { getBeforeDate, getTime, lastMonthDate, _dateTimeFormatter } from 'utils/Time.js';

	export default {
		data () {
			return {
				showDatePicker: false,
				timeShowIndex: 0,
				tabArr: ['动作数', '人均动作', '有动作人数'],
				tabIndex: 0,
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
                selectValue: '',
                timeOptions: [
                    {
                        "value": getBeforeDate(7),
                        "text": '近七日'
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
                        "value": '',
                        "text": "自定义时间范围"
                    }
                ],
                drawData: [],

                // 发送请求参数
                startTimeParam: '', 
                endTimeParam: '', 
			}
		},
		components: {
			selecter,
			lineChart,
		},
		methods: {
			render () {
				setTimeout(() => {
					this.drawData = [
						['3.20', '3.21', '3.22', '3.23', '3.24', '3.25', '昨日'],
						[6, 7, 10, 7, 7.5, 5, 4],
					]
				}, 2000);
			},
			handleChange (obj) {
                if (obj.text == '自定义时间范围') {
                    this.showDatePicker = true;
                };
                // 时间参数
                this.startTimeParam = obj.value[0];
                this.endTimeParam = obj.value[1];

                this.render();
            },
            onValuesChange (picker, values) {
                // 确保slot2.value > slot1.value
                if (values[0] > values[1]) {
                    picker.setSlotValue(1, values[0]);
                }
                this.dateList = values;
            },
            confirmDate () {
                this.showDatePicker = false;
                this.timeOptions[5].value = this.dateList;
                this.timeShowIndex = 5;
                // 自定义时间参数
            	this.startTimeParam = this.dateList[0].replace(/\./g, '-');
            	this.endTimeParam = this.dateList[1].replace(/\./g, '-');
            },
            changeTab (index) {
            	this.tabIndex = index;
            },
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

            // 初始化
            this.render();
        }
	}
</script>

<style lang='less'>
	.trend-wrapper {
		height: 100%;
		background: #F5F5F5;

		.selecters {
		    display: flex;
		    justify-content: center;
		    align-items: center;
			width: 100%;
			height: 1.47rem;
			border-top: .01rem solid #EEEEEE;
			border-bottom: .01rem solid #EEEEEE;
			background: #ffffff;

			.selectStyle {
				width: 9.07rem;
		        height: .93rem;
		        line-height: .93rem;
		        background: #F8F8F8;
		        border-radius: 0.08rem;
		        color: #999999;
		        font-size: .37rem;

		        .input {
            		text-align: center;
		        }

		        .input::after{
		            margin: .4rem 0 0 .2rem;
		        }

		        .input.active::after {
		            margin: .25rem 0 0 .2rem;
		        }
		    }
		}
		
		.draw-content {
            display: flex;
            justify-content: center;
            width: 100%;
            height: 1.2rem;
            border-bottom: .01rem solid #EEEEEE;
            color: #BBBBBB;
            font-size: .37rem;
            background: #ffffff;

            .draw-tab {
            	width: 30%;
				height: 100%;
				text-align: center;
				font-family: 'PingFangSC-Regular';

				.draw-tab-name {
					margin: .41rem 0 .23rem;
				}
				.draw-tab-name-active {
					color: #799FF3;
					font-family: 'PingFang-SC-Medium';
				}
				.draw-tab-underline {
					width: .4rem;
					height: .05rem;
					border-radius: .04rem;
					background: #799FF3;
					margin: 0 auto;
				}
            }
		}

		.date-shadow {
	        position: fixed;
	        left: 0;
	        right: 0;
	        top: 0;
	        bottom: 4.75rem;
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