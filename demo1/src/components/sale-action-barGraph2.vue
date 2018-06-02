<template>
    <div class='branch-action'>
        <p class='branch-action-title'>{{ title }}</p>
        <div :id="barId" style="width:100%;height:8rem;"></div>
    </div>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts');
    // 引入柱状图组件
    require('echarts/lib/chart/bar');
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');

	export default {
		data () {
			return {
				showIndex: 0,
				fontSize: 0,
				barWidth: 0,
			}
		},
		props: {
	        title: {
	            type: String,
	        },
	        isAction: {
	            type: Boolean,
	            default: true
	        },
	        barId: {
	        	type: String,
	        },
	        drawLabelData: {
	        	type: Array,
	        	default () {
	        		return [];
	        	}
	        },
	        drawValueData: {
	        	type: Array,
	        	default () {
	        		return [];
	        	}
	        }
	    },
		methods: {
			drawLine() {
				let myChart = echarts.init(document.getElementById(this.barId));
				myChart.setOption({
					grid: {
						top: '0',
						containLabel: true
					},
					xAxis: [{
						type: 'value',
						show: false,
						axisTick: {
							show: false
						},
						axisLine: {
							show: false
						},
						splitLine: {
							show: false
						},
						data: []
					}],
					yAxis: [{
							type: 'category',
							axisTick: {
								show: false
							},
							axisLine: {
								show: false
							},
							data: []
						},
						//辅助y轴
						{
							type: 'category',
							axisTick: {
								show: false
							},
							axisLine: {
								show: false
							},
							axisLabel: {
								show: false
							},
							data: []
						}
					],
					series: [{
							name: '成绩',
							type: 'bar',
							itemStyle: {
								normal: {
									color: '#799FF3'
								}
							},
							barWidth: 10,
							data: [70, 80, 50, 90, 100]
						},
						//背景
						{
							name: '成绩',
							type: 'bar',
							yAxisIndex: 1,
							//颜色需要有透明度
							itemStyle: {
								normal: {
									color: 'rgba(102, 102, 102, 0.1)'
								}
							},
							barWidth: 10,
							//data填你需要的背景的值
							data: [100, 100, 100, 100, 100]
						},
					]
				});
				// 此处无法使用touch事件
				myChart.on('click', function(params) {
					console.log(params);
		        });
			},
			// 切换各销售部动作图表
			changeDraw (index) {
				this.showIndex = index;
			}
		},
	    mounted () {
			this.drawLine();
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
        	height: 1.46rem;
        	line-height: 1.46rem;
        	text-indent: .4rem;
            font-size: .43rem;
            font-family: 'PingFang-SC-Medium';
            color: #666;
            margin-bottom: .57rem;
        }
    }
</style>