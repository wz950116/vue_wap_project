<template>
    <div id="chart" style="width: 100%; height: 6.85rem"></div>  
</template>

<script>
	let echarts = require('echarts/lib/echarts');
    // 引入柱状图组件
    require('echarts/lib/chart/line');
    // 引入组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/legend');

	export default {
		data () {
			return {
				
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
	    	drawData (data) {
	    		this.drawLine(data);
	    	},
	    },
	    methods: {
			drawLine (drawData) {
				// 基于准备好的dom，初始化echarts实例
				let myChart = echarts.init(document.getElementById('chart'));
				// 绘制图表
				myChart.setOption({
					xAxis: {
						type: 'category',
						// 是否显示刻度
						axisTick: {
							show: false
						},
						// 是否显示x轴
						axisLine: {
							lineStyle: {
								width: 0,  // 轴线不透明度
							}
						},
						axisLabel: {
							color: '#BBBBBB',  // x轴字体颜色
							interval: 0,  // 横轴信息全部显示  
						},
						data: drawData[0]
					},
					yAxis: {
						max: Math.max(...drawData[1]),
						axisTick: {
							show: false
						},
						axisLine: {
							lineStyle: {
								color: '#BBB',
								width: 0,
							}
						},
						splitLine: {
							lineStyle: {
								color: 'rgba(119, 187, 255, 0.1)',  // 网格线颜色
							}
						},
					},
					tooltip: {
						trigger: "axis",  // 坐标轴触发 default: item
						showContent: true,
						axisPointer: {
							lineStyle: {
								color: '#799FF3',
								opacity: 0.4,
								width: 1,
							},
						},
						position (point, params, dom, rect, size) {
							return [point[0] - 25, point[1] - 50];
						},
						formatter: '{c0}<span style="display:inline-block;border:.24rem solid transparent;border-top-color:#fff;position:absolute;top:.9rem;left:50%;transform:translate(-50%,0);"></span>',
						backgroundColor: '#ffffff',
						textStyle: {
							color: '#333333',
							align: 'center',
						},
						extraCssText: 'width:1rem;height:.7rem;box-shadow: 0 .1rem .27rem 0 rgba(0, 0, 0, 0.2);line-height:.8rem;'
					},
					series: [{
						type: 'line',
						smooth: true,  // 是否平滑
						symbol: 'image://data:image/png;base64,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',
						showSymbol: false,
						symbolSize: 12,
						itemStyle: {
							borderColor: '#799FF3',  // 折点颜色
							borderWidth: 3,
						},
						lineStyle: {
							color: '#799FF3',  // 线条颜色
							shadowColor: 'rgba(119, 187, 255, 0.6)',
							shadowBlur: 10,
							shadowOffsetY: 10
						},
						areaStyle: {
							color: 'rgba(119, 187, 255, 0.1)',
						},
						zlevel: 1,
						data: drawData[1],
					}]
				});
				
				// 此处无法使用touch事件
				myChart.on('click', params => {
					// console.log(params);
		        });
			},
	    },
	}
</script>

<style scoped lang='less'>
	#chart {
		background: #ffffff;
	}
</style>