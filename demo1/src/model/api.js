import request from 'model/request'

export default {
	// 1、销售动作分析
	// 销售动作分析
    internalStatInfo (params) {
        return request.post('/reportForm/salesAction/internalStatInfo', params);
    },
	// 销售动作趋势分析
    actionTrend (params) {
        return request.post('/reportForm/salesAction/actionTrend', params);
    },
	// 各销售部动作
    departmentData (params) {
        return request.post('/reportForm/salesAction/departmentData', params);
    },
	// 各销售小组动作
    groupData (params) {
        return request.post('/reportForm/salesAction/groupData', params);
    },
	// 动作类型分布
    actionTypeData (params) {
        return request.post('/reportForm/salesAction/actionTypeData', params);
    },
	// 一线销售日均动作分布
    dayAvgActionData (params) {
        return request.post('/reportForm/salesAction/dayAvgActionData', params);
    },
	// 一线销售动作排行
    actionRankData (params) {
        return request.post('/reportForm/salesAction/actionRankData', params);
    },
}
