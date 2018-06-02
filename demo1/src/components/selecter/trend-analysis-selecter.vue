<template>
    <div class="selecter" @click="toggle">
        <span :class="['input', {active: status}]">{{ current | formatDate }}</span>
        <ul class="select-options">
            <li v-for="(item, index) of options"
                @click="changeSelect(index)"
                class="select-option">
                {{ item.text }}
            </li>
        </ul>
        <div :class="{'select-shadow': status}"></div>
    </div>
</template>

<script>
    module.exports = {
        props: {
            defaultIndex: {
                type: Number,
                default: 0
            },
            options: {
                type: Array
            }
        },
        data () {
            return {
                status: false,
                current: {
                    text: '',
                    value: ''
                },
            };
        },
        watch: {
            options: {
                deep: true,
                handler (arr) {
                    this.current.text = arr[this.defaultIndex].text;
                    this.current.value = arr[this.defaultIndex].value;
                }
            }
        },
        filters: {
            formatDate (obj) {
                let startTime = obj.value[0] ? '  (' + obj.value[0].replace(/\-/g, '.') + '-' : '',
                    endTime = obj.value[1] ? obj.value[1].replace(/\-/g, '.') +  ')  ' : '',
                    name = obj.text;
                return name + startTime + endTime;
            }
        },
        methods: {
            changeSelect (index) {
                // 隐藏遮罩
                $('html,body').css('overflow', 'auto');
                
                this.current.text = this.options[index].text;
                this.current.value = this.options[index].value;
                // 发送 更新选项
                this.$emit('change', this.current);
            },
            toggle () {
                this.status = !this.status;
                // 显示/隐藏 遮罩
                if (this.status) {
                    $('html,body').css('overflow', 'hidden');
                } else {
                    $('html,body').css('overflow', 'auto');
                }
            }
        },
        mounted () {
            document.addEventListener('click', e => {
                if (!this.$el.contains(e.target)) this.status = false;
            });

            this.current.text = this.options[this.defaultIndex].text;
            this.current.value = this.options[this.defaultIndex].value;
        }
    };
</script>


<style scoped lang='less'>
    .selecter {
        position: relative;
        font-size: .37rem;
        background: #F8F8F8;
        border-radius: 0.08rem;

        .input {
            display: inline-block;
            width: 100%;
            color: #999999;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        .active {
            color: #799FF3;
        }

        .active+.select-options {
            display: block;
        }

        .select-options {
            position: fixed;
            left: 0;
            right: 0;
            top: 1.45rem;
            display: none;
            overflow: auto;
            zoom: 1;
            z-index: 9;
            .select-option {
                height: 1.33rem;
                line-height: 1.33rem;
                background-color: #fff;
                text-indent: .4rem;
                color: #666666;
                border-top: 0.01rem solid #eeeeee;
                font-size: .37rem;
            }
        }

        .select-shadow {
            position: fixed;
            left: 0;
            right: 0;
            top: 1.46rem;
            bottom: 0;
            background: #000000;
            opacity: .5;
            z-index: 8;
        }

        .input::after{
            display: inline-block;
            content: '';
            vertical-align: top;
            border: .13rem solid transparent;
            border-top-color: #999999;
        }

        .input.active::after {
            display: inline-block;
            border-top-color: transparent;
            border-bottom-color: #799FF3;
            color: #799FF3;
        }
    }
</style>
