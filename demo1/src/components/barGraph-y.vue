<template>
	<div class='wrapper'>
		<p class='title'>{{ title }}</p>
        <simpleSelecter
        	v-show='selectShow'
        	:options='barOptions'
        	@change='changeType(arguments[0])'
        	class='selectStyle'>
        </simpleSelecter>
		<div class='content'>
			<ul>
				<li v-for='(item, index) in drawData'>
					<div 
						class='rank'
						:class="{ 'rank-1': (index == 0 ? true : false), 'rank-2': (index == 1 ? true : false), 'rank-3': (index == 2 ? true : false) }"
						>
						{{ index + 1 }}
					</div>
					<div class='staff'>
						<p class='staff-name'>{{ item.name }}</p>
						<p class='staff-view'>
							<span
								:style="{ width: (item.value / maxValue * 6.8 + 'rem') }"
								class='staff-view-bar' 
								:class="{ 'staff-view-bar-1': (index == 0 ? true : false), 'staff-view-bar-2': (index == 1 ? true : false), 'staff-view-bar-3': (index == 2 ? true : false) }">
							</span>
							<span class='staff-view-value'>{{ item.value }}</span>
						</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import simpleSelecter from 'components/selecter/simple-selecter';

	export default {
		data () {
			return {
				maxValue: 0,
			}
		},
		props: {
			title: {
				type: String,
			},
			selectShow: {
				type: Boolean,
				default () {
					return false;
				}
			},
	        drawData: {
	        	type: Array,
	        	default () {
	        		return [];
	        	}
	        },
	        barOptions: {
	        	type: Array,
	        	default () {
	        		return [];
	        	}
	        },
		},
		watch: {
			drawData (data) {
				if (data.length > 0) {
					let drawArr = [];
					data.forEach(item => {
						drawArr.push(item.value);
					})
					this.maxValue = Math.max(...drawArr);
				};
			}
		},
		components: {
			simpleSelecter
		},
		methods: {
			changeType (obj) {
				this.$emit('change', obj);
			},
		},
	}
</script>

<style scoped lang='less'>
	.wrapper {
		position: relative;
		width: 100%;
		background: #ffffff;
        margin-top: .27rem;
        border-radius: .13rem;
        box-shadow: 0 .03rem .27rem 0 rgba(0, 0, 0, .1);
        box-sizing: border-box;
        -moz-box-sizing:border-box; /* Firefox */
        -webkit-box-sizing:border-box; /* Safari */
        padding: 0 .4rem;

        .title {
        	height: 1.49rem;
        	line-height: 1.49rem;
            font-size: .43rem;
            font-family: 'PingFang-SC-Medium';
            color: #666666;
            margin-bottom: .14rem;
        }

        .selectStyle {
			position: absolute;
			top: .59rem;
			right: .8rem;
        }

        .content {
			
			li {
				width: 100%;
				height: 1.2rem;
				border-bottom: .01rem solid #EEEEEE;
				padding-top: .4rem;

				.rank {
					float: left;
					width: .8rem;
					height: .8rem;
					line-height: .8rem;
					text-align: center;
					background: #F8F8F8;
					border-radius: .4rem;
					margin: 0 .4rem 0 0;
					font-size: .43rem;
					color: #999999;
				}
				.rank-1 {
					background: rgba(121,159,243,0.15);
					color: #799FF3;
				}
				.rank-2 {
					background: rgba(90,204,155,0.15);
					color: #5ACC9B;
				}
				.rank-3 {
					background: rgba(255,194,84,0.15);
					color: #FFC254;
				}
				.staff {
					float: left;
					.staff-name {
						font-size: .37rem;
						color: #666666;
					}
					.staff-view {

						.staff-view-bar {
							display: inline-block;
							width: 6.8rem;
							height: .13rem;
							margin-top: .29rem;
							background: #D8D8D8;
							border-radius: 0rem 1.21rem 1.21rem 0rem;
							vertical-align: top;
						}
						.staff-view-bar-1 {
							background: #799FF3;
						}
						.staff-view-bar-2 {
							background: #5ACC9B;
						}
						.staff-view-bar-3 {
							background: #FFC254;
						}
						.staff-view-value {
							display: inline-block;
							color: #999999;
							font-size: .37rem;
							margin-top: .18rem;
							vertical-align: top;
						}
					}
				}
			}

			li::last-of-type {
				boder-bottom: none;
			}
        }
	}
</style>