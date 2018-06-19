# ins

layUI Dome 两天写的  个人总结：一个类bootstrap 风格的UI 框架，适合业务逻辑不复杂的项目。简单容易上手。

做了一个简单的js 模糊匹配：

###
 /**
     * 使用spilt方法实现模糊查询
     * @param  {Array}  list     进行查询的数组
     * @param  {String} keyWord  查询的关键词
     * @return {Array}           查询的结果
     */
    function fuzzyQuery(list, keyWord) {
        var arr = [],
            searcharr = keyWord.split(''),
            reg = new RegExp(searcharr.join('.*'));

        for (var i = 0; i < list.length; i++) {
            if (reg.exec(list[i]['chanpin'])) {
                arr.push(list[i]);
            }

        }
        return arr;
    }

访问地址：http://106.14.62.143:5888
