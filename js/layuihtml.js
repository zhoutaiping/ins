/**
 * Created by zhoutaiping on 2018/6/10.
 */

//JavaScript代码区域
<!-- 注意：如果你直接复制所有代码到本地，上述js路径需要改成你本地的 -->
layui.use(['form', 'table'], function(){
    var table = layui.table,
        form = layui.form,
        that = this;
    var layer = layui.layer;
    var layuiBodyHeight = $('.layui-body').height();
    $('#tabDiv').height(layuiBodyHeight-270);

    var menuTree = [
        {
            id: '1000', title: '人寿保险', level: 1,
            node: [
                {id: '1100', title: '定期寿险', level: 2, node: []},
                {id: '1200', title: '终身寿险', level: 2, node: []},
                {id: '1300', title: '两全保险', level: 2, node: []}
            ]
        },
        {
            id: '2000', title: '年金保险', level: 1,
            node: [
                {id: '2100', title: '养老年金保险', level: 2, node: []},
                {id: '2200', title: '非养老年金保险', level: 2, node: []}
            ]
        },
        {
            id: '3000', title: '健康保险', level: 1,
            node: [
                {id: '3100', title: '个人税收优惠型健康保险', level: 2, node: []},
                {
                    id: '3200', title: '非个人税收优惠型健康保险', level: 2,
                    node: [
                        {
                            id: '3210', title: '疾病保险', level: 3,
                            node: [
                                {id: '3211', title: '重大疾病保险', node: []},
                                {id: '3212', title: '防癌保险', node: []},
                                {id: '3213', title: '其他疾病保', node: []}
                            ]
                        },
                        {
                            id: '3220', title: '医疗保险', level: 3,
                            node: [
                                {id: '3221', title: '费用补偿型医疗保险', level: 4, node: []}
                            ]
                        },
                        {id: '3230', title: '失失能收入损失保险', level: 3, node: []},
                        {id: '3240', title: '护理保险', level: 3, node: []}
                    ]
                }
            ]
        },
        {
            id: '4000', title: '意外伤害保险', level: 1,
            node: []
        },
        {
            id: '5000', title: '委托委托管理业务', level: 1,
            node: [
                {id: '5100', title: '健康保障委托管理', level: 2, node: []},
                {id: '5200', title: '养老保障委托管理', level: 2, node: []}
            ]
        }
    ];
    var searchStatus = false;
    var searchId = null;

    setSelectLeveOne(menuTree);
    loadGrid({
        total:0,
        xinxi:[]
    });
    //加载菜单
    function setSelectLeveOne(menu) {
        if (false == Array.isArray(menu)) {
            return true;
        }
        var optionMenu = [], option = [], select = $('#leveone');
        menu.find(function (menu) {
            if (menu['level'] == 1) {
                optionMenu.push({
                    value: menu['id'], title: menu['title']
                })
            }
        });
        optionMenu.forEach(function (element) {
            option.push(
                "<option value =" + element['value'] + ">" + element['title'] + "</option>"
            );
        });

        if (select) {
            select.append(option);
        }
        form.render('select');

    }
    //菜单修改
    function onLevlChange(value, level,id) {
        var menu = menuTree,
            value = value,
            nextLevelType = {
                "leveone": "levetwo", "levetwo": "levethree", "levethree": "levefour", "levefour": null
            },
            that = this,
            nextLevel = nextLevelType[id];
        clearSelec(id, level, value);

        var optionMenu = getMenu(menu, value, level), option = '<option value=0>请选择</option>',
            div = $('#'+nextLevel+'_div'),optionLength = $('#'+id+' option').length,select = $('#'+nextLevel), aLine = $('#'+nextLevel + '_lable');

        if (!value || false == Array.isArray(menu)) {
            that.searchStatus = false;
            return true;
        }
        if (optionMenu && optionMenu['node'] && optionMenu['node'].length) {
            that.searchStatus = false;

            optionMenu['node'].forEach(function (element) {
                option += "<option value =" + element['id'] + ">" + element['title'] + "</option>";
            });

            div.css("display", "block");
            aLine.css("display", "block");
            select.html(option);
            form.render('select');

        } else {
            if(value!=0 && optionLength > 1){
                that.searchStatus = true;
            }else {
                that.searchStatus = false;
            }

            searchId = value;

            select.css("display", "none");
            aLine.css("display", "none");
        }
        form.render('select' );
    }
    //清理节点
    function clearSelec(id, level) {
        var that = this;
        switch (level) {
            case 1:
                var arguments = ['levetwo', 'levethree', 'levefour'], arr = Array.from(arguments);
                break;
            case 2:
                var arguments = ['levethree', 'levefour'], arr = Array.from(arguments);
                break;
            case 3:
                var arguments = ['levefour'], arr = Array.from(arguments);
                break;
            default:
                var arr = [];
                break;

        }

        cleanNodeOption(arr, id);

    }

    function cleanNodeOption(nodeArr, id) {
        select = $('#' + id);
        for (var i = 0; i < nodeArr.length; i++) {
            $('#' + nodeArr[i]).empty();
            $('#' + nodeArr[i]+'_div').css('display', 'none');
        }
    }

//获取节点 menu-菜单tree , id-要获取节点的id ,level-要获取节点的level
    function getMenu(menu, id, level) {

        var optionMenu = {};
        for (var i = 0; i < menu.length; i++) {
            switch (level) {
                case 1:
                    if (menu[i]['id'] == id && menu[i]['level'] == level) {

                        return optionMenu = menu[i];
                    }
                    break;
                case 2:
                    var node = menu[i]['node'];
                    if (node.length == 0) {
                        optionMenu = {};
                    } else {
                        for (var j = 0, nodeLength = node.length; j < nodeLength; j++) {
                            if (node[j]['id'] == id && node[j]['level'] == level) {

                                return optionMenu = node[j];
                            }
                        }
                    }
                    break;
                case 3:
                    var node = menu[i]['node'];
                    if (node.length == 0) {
                        optionMenu = {};
                    } else {
                        for (var j = 0, nodeLength = node.length; j < nodeLength; j++) {
                            var threeNode = node[j]['node'];
                            if (threeNode.length == 0) {
                                optionMenu = {};
                            } else {
                                for (var k = 0, threeNodeLength = threeNode.length; k < threeNodeLength; k++) {

                                    if (threeNode[k]['id'] == id && threeNode[k]['level'] == level) {
                                        return optionMenu = threeNode[k];
                                    }
                                }
                            }
                        }
                    }
                    break;
            }
        }
        return optionMenu;
    }

    <!-- 注意：监听select -->
    form.on('select(select_leveone)', function(data){

        var id = data.elem.id,value = data.value;
        $('#'+id+'_lable').text(value !=""?" ":'*');
        onLevlChange(value, 1,id);
    });
    form.on('select(select_levetwo)', function(data){
        var id = data.elem.id,value = data.value;

        $('#'+id+'_lable').text(value !=""?" ":'*');
        onLevlChange(value, 2,id);
    });
    form.on('select(select_levethree)', function(data){
        var id = data.elem.id,value = data.value;

        $('#'+id+'_lable').text(value !=""?" ":'*');
        onLevlChange(value, 3,id);
    });
    form.on('select(select_levefour)', function(data){
        var id = data.elem.id,value = data.value;

        $('#'+id+'_lable').text(value !=""?" ":'*');
        onLevlChange(value, 4,id);
    });

    //监听提交
    form.on('submit(insGrid)', function(data){
        if (this.searchStatus == false) {
            layer.msg('请选择保险类型!');
            return false;
        }
        if(searchId == null){
            layer.msg('请选择保险类型!');
            return false;
        }
        var Code = data.field['chenbao']+""+data.field['qijian']+""+data.field['shuxing']+""
                +data.field['xiaoshou']+""+data.field['jiaofei']+""+data.field['leixing']+"";
        var id = searchId;
        var src = '/api/pro/' + id + '/'+Code;
        ajax({
            type: "get",
            url: src, //添加自己的接口链接
            timeOut: 5000,
            before: function () {
            },
            success: function (data) {
                layer.msg('加载成功!');
                loadGrid(JSON.parse(data), 10);
                searchId == null;
            },
            error: function () {
            }
        });
        return false;
    });
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
    function loadGrid(data){
        var chanpin_name = $.trim($('#chanpin_name').val()),
            newData = [],
            gridStore = null,
            total = 0;
        if(chanpin_name){
            newData = fuzzyQuery(data['xinxi'],chanpin_name);
        }

        if(newData.length > 0){
            gridStore = newData;total = newData.length;
        }else {
            gridStore = data['xinxi'];total = data['total'];
        }


        //第一个实例
        table.render({
            elem: '#tabGrid'
            ,height: layuiBodyHeight-290
            ,data:gridStore //数据接口

            ,page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                layout: ['prev', 'page', 'next', 'skip', 'count','limit' ] //自定义分页布局
                ,curr: 1 //设定初始在第 5 页
                ,groups: 5 //只显示 1 个连续页码
                ,count:total
                ,hash: 'fenye'
                ,first: false //不显示首页
                ,last: false //不显示尾页

            }
            ,cols: [[ //表头
                {field: 'id', title: '保险编号', width:100, sort: true, fixed: 'left',style:'height:40px;'}
                ,{field: 'gongsi', title: '公司名称', width:260,sort:false}
                ,{field: 'chanpin', title: '保险产品名称', width:400, sort: false}
                ,{field: '', title: '查看详情', width:150, sort: true,sort: false,templet: '#showInfoBtn',style:'height:40px;'}
            ]]
        });

    }

    //查看按钮监听
    form.on('submit(showInfoBtn)', function(obj){
        var id = this.value;
        var str = 'http://localhost:8808/info.html?id='+id+'';
        window.open(str,'_blank','');
    });

});