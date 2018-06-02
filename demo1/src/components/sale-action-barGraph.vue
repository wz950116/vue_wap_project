<template>
    <div class='branch-action'>
        <p class='branch-action-title'>{{ title }}</p>
        <simpleSelecter
        	:options='barOptions'
        	@change='changeType(arguments[0])'
        	class='selectStyle'>
        </simpleSelecter>
        <div :id="barId" style="width:100%;height:6.56rem;"></div>
    </div>
</template>

<script>
	let elementFontSize = document.documentElement.style.fontSize.split('px')[0];
    // 引入基本模板
    let echarts = require('echarts/lib/echarts');
    // 引入柱状图组件
    require('echarts/lib/chart/bar');
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/dataZoom');
    import simpleSelecter from 'components/selecter/simple-selecter';

	export default {
		data () {
			return {
				barBorderRadius: 0,
				barWidth: 0,
				gridTop: 0,
				renderLabelData: [],
				showZoom: false,
				showFive: '',
			}
		},
		components: {
			simpleSelecter
		},
		props: {
	        title: {
	            type: String,
	        },
	        barId: {
	        	type: String,
	        },
	        barOptions: {
	        	type: Array,
	        	default () {
	        		return [];
	        	}
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
	    watch: {
	    	drawLabelData (arr) {
	    		this.renderLabelData = arr;
	    		if (arr.length > 6) {
	    			this.showZoom = true;
	    			this.showFive = 4 / arr.length * 100;
	    		} else {
	    			this.showZoom = false;
	    		}
				this.drawLine(elementFontSize);
	    	}
	    },
		methods: {
			changeType (obj) {
				this.$emit('change', obj);
			},
			drawLine(elementFontSize) {
				// 基于准备好的dom，初始化echarts实例
				let myChart = echarts.init(document.getElementById(this.barId));
				// 绘制图表
				let option = {
					grid: {
						top: elementFontSize * .5,  // 图表位置
					},
					xAxis: {
						// 是否显示刻度
						axisTick: {
							show: false
						},
						// 轴线文字
						axisLabel: {
							color: '#333333',
							fontSize: elementFontSize * .35,
							interval: 0,  // 横轴信息全部显示
						},
						// 轴线
						axisLine: {
							lineStyle: {
								width: 0,  // 轴线不透明度
							}
						},
						data: this.renderLabelData
					},
					yAxis: {
						axisTick: {
							show: false
						},
						// 轴线文字
						axisLabel: {
							color: '#BBB',
							fontSize: elementFontSize * .32,
						},
						// 轴线
						axisLine: {
							lineStyle: {
								width: 0,
							}
						},
						// 网格线
						splitLine: {
							lineStyle: {
								color: '#799FF3',
								opacity: .15,
							}
						},
					},
					series: [{
						type: 'bar',
						itemStyle: {
							normal: {
								color: '#799FF3',
								barBorderRadius: elementFontSize * .05,
								label: {
									show: true,
									position: 'top',
									fontSize: elementFontSize * .43
								}
							}
						},
						barWidth: elementFontSize * .67,
						data: this.drawValueData
					}]
				};



				if (this.showZoom) {
					//给x轴设置滚动条
					option.dataZoom = [
						{
							start: 0, // 默认为0  
							end: this.showFive,  // 显示区域占所有的比例 默认100
							type: 'slider',
							show: this.showZoom,
							xAxisIndex: [0],
							handleSize: 0, // 滑动条的 左右2个滑动条的大小  
							height: 8, 
							left: 40, 
							right: 40, 
							bottom: 20,
							handleColor: '#ddd',
							handleStyle: {
								borderColor: "#cacaca",
								shadowBlur: 2,
								background: "#ddd",
								shadowColor: "#ddd",
							},
							backgroundColor: '#ddd',
						},
						// 内部滑动 
						{
							type: 'inside',
							show: this.showZoom,
							xAxisIndex: [0],
							start: 0,
							end: this.showFive,  
						},
					]
				};

				myChart.setOption(option)

				// 此处无法使用touch事件
				myChart.on('click', function(params) {
					console.log(params);
		        });
			},
		},
	}
</script>

<style scoped lang='less'>
	.branch-action {
		position: relative;
        background: #fff;
        margin-top: .27rem;
        border-radius: .13rem;
        box-shadow: 0 .03rem .27rem 0 rgba(0, 0, 0, .1);

        .branch-action-title {
        	height: 1.49rem;
        	line-height: 1.49rem;
        	text-indent: .4rem;
            font-size: .43rem;
            font-family: 'PingFang-SC-Medium';
            color: #666;
        }

        .selectStyle {
			position: absolute;
			top: .59rem;
			right: .8rem;
        }
    }
</style>