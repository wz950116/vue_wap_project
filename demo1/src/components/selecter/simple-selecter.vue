<template>
    <div class='selecter'>
        <span :class="['input', {active: status}]" @click="toggle">{{ cur.label }}</span>
        <ul class="select-options" v-show='status'>
            <li v-for="(item, index) of options"
                @click="changeSelect(index)"
                class="select-option">
                {{ item.label }}
            </li>
        </ul>
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
                cur: (this.options[this.defaultIndex] ? {
                    label: this.options[this.defaultIndex].label,
                    value: this.options[this.defaultIndex].value
                } : null) || {label: '', value: ''}
            };
        },
        watch: {
            defaultIndex (index) {
                this.updateCur();
            },
            options () {
                this.updateCur();
            }
        },
        methods: {
            updateCur () {
                for (var i in this.cur) {
                    this.cur[i] = this.options[this.defaultIndex][i];
                }
            },
            changeSelect (index) {
                this.status = false;
                for (var i in this.cur) {
                    this.cur[i] = this.options[index][i];
                }
                // 发送 更新选项
                this.$emit('change', this.cur);
            },
            toggle () {
                this.status = !this.status;
            }
        },
        mounted () {
            var _this = this;
            document.addEventListener('click', function (e) {
                if (!_this.$el.contains(e.target)) _this.status = false;
            });
        }
    };
</script>


<style scoped lang='less'>
    .selecter {
        position: relative;
        font-size: .37rem;
        border-radius: 0.08rem;

        .input {
            display: inline-block;
            color: #799FF3;
        }


        .input::after{
            content: '';
            position: absolute;
            top: .09rem;
            right: -.4rem;
            border: .13rem solid transparent;
            border-top-color: #799FF3;
        }

        .input.active::after {
            border-top-color: transparent;
            border-bottom-color: #799FF3;
            top: -.02rem;
            color: #799FF3;
        }

        .select-options {
            position: absolute;
            right: -.8rem;
            top: .73rem;
            width: 4rem;
            border-radius: .13rem;
            box-shadow: 0 .03rem .27rem 0 rgba(0, 0, 0, .1);
            zoom: 1;
            z-index: 2;
            .select-option {
                height: 1.07rem;
                line-height: 1.07rem;
                background-color: #fff;
                text-indent: .4rem;
                color: #666666;
                border-top: 0.01rem solid #eeeeee;
                font-size: .37rem;
            }
            .select-option:first-of-type {
                border: none;
            }
        }
    }

    .active {
        .input {
            color: #799FF3;
        }
        .select-options {
            display: block;
        }
    }
</style>
