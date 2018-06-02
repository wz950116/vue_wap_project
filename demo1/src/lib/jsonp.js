var $jsonp = {
  getJson: function (url, fn) {
    var name = 'jsonp_' + (+new Date()); //设置一个名字
    //重新拼装url,加入callback
    url = url + (url.indexOf('?') === -1 ? '?' : '&') + 'callback='+name;

	//创建script标签
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url; // 设置要远程的url
    script.id = "id_" + name; // 设置id，为了后面可以删除

	// 把传进来的函数重新组装，并把它设置为全局函数，远程就是调用这个函数
    window[name] = function (json) {
      window[name] = undefined; // 执行这个函数后，要销毁
      var elem = document.getElementById("id_" + name); // 获取这个script的元素
      $jsonp.removeElem(elem); // 删除head里面插入的script，这三步都是为了不影响污染整个DOM
      fn(json); // 执行传入的的函数
    };
    // 在head里面插入script元素
    var head = document.getElementsByTagName("head");
    if (head && head[0]) {
      head[0].appendChild(script);
    }
  },
  removeElem : function (elem) {
    var parent = elem.parentNode;
    if(parent && parent.nodeType !== 11)
    {
      parent.removeChild(elem);
    }
  }
}

module.exports = $jsonp;
