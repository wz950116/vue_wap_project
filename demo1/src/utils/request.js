module.exports = {
    post: function (params, callback) {
        $.ajax({
            url: params.url,
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(params.data),
            contentType: 'application/json'
        }).done(function (res) {
            callback && callback(res);
        }).fail(function () {
            console.log('error');
        }).always(function () {
            // console.log('complete');
        });
    },
    get: function (params, callback) {
        $.ajax({
            url: params.url,
            type: 'GET',
            dataType: 'json',
            data: params.data,
            contentType: 'application/json'
        }).done(function (res) {
            callback && callback(res);
        }).fail(function () {
            console.log('error');
        }).always(function () {
            // console.log('complete');
        });
    },

    jsonp: function (params, callback) {
        $.ajax({
            url: params.url,
            type: 'GET',
            dataType: 'jsonp',
            data: params.data,
            contentType: 'application/json'
        }).done(function (res) {
            callback && callback(res);
        }).fail(function () {
            console.log('error');
        }).always(function () {
            // console.log('complete');
        });
    }
}
