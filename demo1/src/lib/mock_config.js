var Mock = require('./mock');
// 调用mock方法模拟数据
Mock.mock(
    'http://mock/getBasicInfo', {
        'code':200,
        'msg': 'sucess',
        'data':{
            'money|1-200':200,
            'priceDesc':'140万/套',
            'projCoverPhoto':Mock.Random.image('400x300', '#EE3924', '#FFFFFF', 'png', 'EstateTestImg'),
            'cityName':'@city',
            'estateName':'@ctitle(6)',
            'estateDesc':'@csentence(10)'
        }
    }
);
Mock.mock(
    'http://mock/getAdData',
    {
        'code': 200,
        'message': '',
        'data': {
            'ad_map': {
                '100249': {
                    'ad_pos_id': 100249,
                    'link': 'https://house.focus-dev.cn/loupan/123.html',
                    'resource_map': {
                        'text': {
                            'despriction': '厉害了非常不错'
                        },
                        'pic': {
                            'url': '//t4.focus-img.cn/sh280x210sh/bet/res/14400b72d8a5e7e7e96732b2e8c4ace2.JPG'
                        },
                        'title': {
                            'despriction': '高级楼盘1111111'
                        },
                        'list': {
                            'estate_id_list': [
                                123
                            ]
                        }
                    },
                    'city_name': '北京',
                    'order_id': 1712054050,
                    'estate_id': 123
                },
                '100263': {
                    'ad_pos_id': 100249,
                    'link': 'https://house.focus-dev.cn/loupan/123.html',
                    'resource_map': {
                        'text': {
                            'despriction': '厉害了非常不错'
                        },
                        'pic': {
                            'url': '//t4.focus-img.cn/sh280x210sh/bet/res/14400b72d8a5e7e7e96732b2e8c4ace2.JPG'
                        },
                        'title': {
                            'despriction': '高级楼盘1111111'
                        },
                        'list': {
                            'estate_id_list': [
                                123
                            ]
                        }
                    },
                    'city_name': '北京',
                    'order_id': 1712054050,
                    'estate_id': 123
                },
                '100264': {
                    'ad_pos_id': 100249,
                    'link': 'https://house.focus-dev.cn/loupan/123.html',
                    'resource_map': {
                        'text': {
                            'despriction': '厉害了非常不错'
                        },
                        'pic': {
                            'url': '//t4.focus-img.cn/sh280x210sh/bet/res/14400b72d8a5e7e7e96732b2e8c4ace2.JPG'
                        },
                        'title': {
                            'despriction': '高级楼盘1111111'
                        },
                        'list': {
                            'estate_id_list': [
                                123
                            ]
                        }
                    },
                    'city_name': '北京',
                    'order_id': 1712054050,
                    'estate_id': 123
                },
                '100265': {
                    'ad_pos_id': 100249,
                    'link': 'https://house.focus-dev.cn/loupan/123.html',
                    'resource_map': {
                        'text': {
                            'despriction': '厉害了非常不错'
                        },
                        'pic': {
                            'url': '//t4.focus-img.cn/sh280x210sh/bet/res/14400b72d8a5e7e7e96732b2e8c4ace2.JPG'
                        },
                        'title': {
                            'despriction': '高级楼盘1111111'
                        },
                        'list': {
                            'estate_id_list': [
                                123
                            ]
                        }
                    },
                    'city_name': '北京',
                    'order_id': 1712054050,
                    'estate_id': 123
                }
            }
        }
    }
);

Mock.mock(
    'http://mock/getMoneyFirst',
    {
        'code': 200,
        'msg': '抢红包成功',
        'data': {
            'reason':0
        }
    }
);

Mock.mock(
    'http://mock/getRedPacketSchedule',
    {'code':200,
        'msg':'红包任务页信息',
        'data':{'broadcast':'0',
            'districtArea':'地址地址区区区区',
            'depositMoney':0,
            'geoLat':40.207333,
            'posAllocJson':{'ad_pos_id':100265,
                'area_code':110100,
                'link':'https://house.focus-dev.cn/loupan/123.html',
                'idea_id':727686,
                'pos_resource_group_id':1,
                'news_id':-1,
                'forum_id':-1,
                'ad_weight':99,
                'resource_map':{'text':{'despriction':'good臻的的很顾得444'}, 'pic':{'url':'//t4.focus-img.cn/sh280x210sh/bet/res/14400b72d8a5e7e7e96732b2e8c4ace2.JPG'}, 'title':{'despriction':'古德楼盘赞赞444'}, 'list':{'estate_id_list':[123]}},
                'live_id':123,
                'city_name':'北京',
                'if_ad':1,
                'demander_id':1707000766,
                'support_type':'estate',
                'order_id':1712054055,
                'estate_id':123,
                'city_id':1
            },
            'login':'1',
            '400call':'0',
            'offlineViewHouse':'0',
            'extractStatus':'0',
            'expiryDate':'2017.12.14-2017.12.21',
            '400callPhoneNum':'02759551299-11145',
            'money':188.88,
            'geoLon':116.28425,
            'priceDesc':'1234万/套'
        }
    }
);

// 获取分享页二维码
Mock.mock(
    'http://mock/getRedPacketShareQRCode',
    {
        'code':200,
        'msg':'返回成功',
        'data':{
            'QRCode':'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkAQAAAABYmaj5AAABTklEQVR42tXUsY3EIBAAQJyYFiAxrdmJaeFIbJNACyaB1iAx6YdsAs/p/l6+hwZ+JYKRVrDLIlC5xRf6N0qIBT+v7BhaQbETWWfuoCPpEjdKnLQnAwB57+vcg2Kuq+LCRTb2Pu+uhKh5xrvOu2roY9Hht7+b0jZySCKmvSORH6LEi5uOdp0R8xPtCNSD7MEprluVa5pnrIZDdOQfDKLzAlpBMTLTNJxDR7rEZ3je0Ulw7cgvsiO7n8xEKNAqs4NHbaQVrRLZakdquXCrXOevpl1h2Qrq5i7qctFWxeiQmR8Ja5WHxA+u5Wtin6o3ZMmIcDSt0rScrEBa91ZghzxSPyHckQuJLFF62hFoo63waGlVam5dMolWCZEH0xoMtIJyYh01vF7dH0mLQ94QYl0RATVX9uQsote00Y6KOVcur59uP1Qrm1c0CjCt/uMP9g0PP9n85QLaUAAAAABJRU5ErkJggg=='
        }
    }
);

// 获取支付宝账号
Mock.mock(
    'http://mock/getBindAlipayAccount',
    {
        'code':200,
        'msg':'返回成功',
        'data':{
            'isBind': true,
            'alipayAccount':'adfocus@sohu-inc.com'
        }
    }
);

// 提现
Mock.mock(
    'http://mock/alipayTransferAccount',
    {
        'code':200,
        'msg':'很遗憾今日提现金额以领完，明日再申请',
        'data':{
            'reason':2
        }
    }
);
