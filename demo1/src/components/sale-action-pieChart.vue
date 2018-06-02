<template>
    <div class='branch-action'>
        <p class='branch-action-title'>{{ title }}</p>
        <div class='bar-graph'>
        	<div :id="pieId" style="width:100%;height:6.43rem;overflow:hidden;"></div>
        	<ul class='legend-box'>
        		<li v-for='(item, index) in drawData'>
    				<span class='legend-icon' :style="{ background: colorArr[index] }"></span>
    				<span class='legend-name'>{{ item.name }} :   {{item.value}}</span>
    				<span class='legend-percent'>{{ (item.value / totalVal * 100).toFixed(0) }}%</span>
        		</li>
        	</ul>
        	<div class='total click-show' v-show='!singleShow'>
        		<p class='total-name click-name'>总动作数</p>
        		<p class='total-value click-value'>{{ totalVal }}</p>
        	</div>
        	<div class='single click-show' v-show='singleShow'>
        		<p class='single-name click-name'>{{ singleData.name }}</p>
        		<p class='single-value click-value'>{{ singleData.value }}</p>
        	</div>
        </div>
    </div>
</template>

<script>
	let echarts = require('echarts/lib/echarts');
	let pieObj = {};
    // 引入柱状图组件
    require('echarts/lib/chart/pie');
    // 引入组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/legend');

	export default {
		data () {
			return {
				valueFontSize: 0,
				totalVal: 0,
				singleData: {
					value: '',
					name: '',
				},
				singleShow: false,
				colorArr: ['#799FF3', '#5B709E', '#FFC254', '#5ACC9B', '#FF6B76', '#DEE2EC', '#DEE2EC'],
			}
		},
		props: {
	        title: {
	            type: String,
	        },
	        pieId: {
	        	type: String,
	        },
	        drawData: {
	        	type: Array,
	        	default () {
	        		return [];
	        	},
	        }
	    },
	    watch: {
	    	drawData (arr) {
		    	this.drawData.forEach(item => {
		    		this.totalVal += item.value;
		    	});
		    	this.drawLine(arr);
	    	}
	    },
	    methods: {
			drawLine (drawData) {
				let dom = document.getElementById(this.pieId);
				let myChart = echarts.init(dom);

				// 绘制图表
				myChart.setOption({
					series: [{
						type: 'pie',
						radius: ['46%', '68%'],
						center: ['28%', 'center'],
						hoverAnimation: true,
						avoidLabelOverlap: false,  // 防止遮盖
						label: {
							show: false,
						},
						data: this.drawData,
					}],
					color: this.colorArr,
				});

				// 此处无法使用touch事件
				myChart.on('click', params => {
					console.log(params);
					this.singleData.name = params.data.name;
					this.singleData.value = params.data.value;
					this.singleShow = true;
				});
			},
	    },
	    mounted () {
	    	this.valueFontSize = document.documentElement.style.fontSize.split('px')[0] * .45;
	    }
	}
</script>

<style scoped lang='less'>
	.branch-action {
        background: #fff;
        margin-top: .27rem;
        border-radius: .13rem;
        box-shadow: 0 .03rem .27rem 0 rgba(0, 0, 0, .1);
        .branch-action-title {
        	height: 1.49rem;
        	line-height: 1.49rem;
        	text-indent: .4rem;
            font-size: .43rem;
            color: #666;
        }
        .bar-graph {
        	position: relative;

        	.legend-box {
				position: absolute;
				right: .4rem;
				top: 50%;
				transform: translate(0, -50%);
				font-size: .35rem;

				li {
					height: .75rem;
					line-height: .75rem;
					
					.legend-icon {
						float: left;
						width: .27rem;
						height: .27rem;
						border-radius: 100%;
						vertical-align: top;
						margin-top: .22rem;
					}
					.legend-name {
						float: left;
						margin: 0 .53rem 0 .29rem;
						color: #333333;
					}
					.legend-percent {
						float: right;
						color: #999999;
					}
				}
        	}
        	.click-show {
        		position: absolute;
        		left: 12%;
        		top: 50%;
        		transform: translate(0, -50%);
        		width: 3rem;
        		text-align: center;
    			color: #999999;
    			text-align: center;
    			font-family: 'PingFangSC-Regular';

        		.click-name {
        			font-size: .32rem;
        		}
        		.click-value {
        			font-size: .67rem;
        			margin-top: .12rem;
        		}
        	}
        }
	}
</style>