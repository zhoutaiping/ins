/**
 * Created by mtc on 2018/6/1.
 */
var menu = [
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

setSelectLeveOne(this.menu);
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

}

function onLevlChange(field, level) {
    var menu = this.menu,
        that = this,
        value = field.value,
        nextLevelType = {
            "leveone": "#levetwo", "levetwo": "#levethree", "levethree": "#levefour","levefour":null
        },
        nextLevel = nextLevelType[field.id];
    this.clearSelec(field.id,level,value);
    console.log(nextLevel,value,level,that.searchStatus)
    var optionMenu = this.getMenu(menu,value,level), option = [],select = $(nextLevel),aLine = $(nextLevel+'_point');
    select.empty();
    select.append('<option value="">请选择保险类型</option>');

    if (!value || false == Array.isArray(menu)) {
        that.searchStatus = false;
        return true;
    }



    if (optionMenu && optionMenu['node'] && optionMenu['node'].length) {
        that.searchStatus = false;
        $('#'+field.id+'_point').css('display','none');
        optionMenu['node'].forEach(function (element) {
            option.push("<option value =" + element['id'] + ">" + element['title'] + "</option>")
        });
        if (select) {
            select.css("display","block");
            aLine.css("display","block");
            select.append(option);
        }
    }else {
        that.searchStatus = true;
        select.css("display","none");
        aLine.css("display","none");
    }
    console.log(that.searchStatus)
}
//清理节点
function clearSelec(id,level){
    var that = this;
    switch (level){
        case 1:
            var arguments = ['levetwo','levethree','levefour'], arr = Array.from(arguments);
            break;
        case 2:
            var arguments = ['levethree','levefour'], arr = Array.from(arguments);
            break;
        case 3:
            var arguments = ['levefour'], arr = Array.from(arguments);
            break;
        default:
            var  arr =[];
            break;

    }

    cleanNodeOption(arr,id);

}

function cleanNodeOption(nodeArr,id){
    select = $('#'+id);


    for(var i=0;i<nodeArr.length;i++){
        $('#'+nodeArr[i]).empty();
        $('#'+nodeArr[i]).css('display','none');
        $('#'+nodeArr[i]+'_point').css('display','none');
    }
}

//获取节点 menu-菜单tree , id-要获取节点的id ,level-要获取节点的level
function getMenu(menu,id,level){
    var that = window;
    var optionMenu = {};
    for (var i =0;i<menu.length;i++){
        switch (level){
            case 1:
                if(menu[i]['id'] == id && menu[i]['level'] == level){
                    console.log(menu[i]);
                    return optionMenu = menu[i];
                }
                break;
            case 2:
                var node = menu[i]['node'];
                if(node.length == 0){
                    optionMenu ={};
                }else {
                    for (var j = 0,nodeLength =node.length;j<nodeLength;j++){
                        if(node[j]['id'] == id && node[j]['level'] == level){
                            console.log(node[j]);
                            return optionMenu = node[j];
                        }
                    }
                }
                break;
            case 3:
                var node = menu[i]['node'];
                if(node.length == 0){
                    optionMenu ={};
                }else {
                    for (var j = 0,nodeLength =node.length;j<nodeLength;j++){
                        var threeNode = node[j]['node'];
                        if(threeNode.length == 0){
                            optionMenu ={};
                        }else {
                            for (var k = 0,threeNodeLength =threeNode.length;k<threeNodeLength;k++){
                                console.log(threeNode[k]);
                                if(threeNode[k]['id'] == id && threeNode[k]['level'] == level){
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

function onSearch(button, e) {
    console.log(this.searchStatus)
    if(this.searchStatus == false){
        $('#my-message').message({
            closeSelector: '.my-custom-close'
        }).open();
        return true;
    }

    /*var src = 'http://localhost:8808/pro/1100/10/20';
    ajax({
        type: "get",
        url: src, //添加自己的接口链接
        timeOut: 5000,
        before: function () {
//                 console.log("before");
        },
        success: function (data) {
            this.loadlist(data);
        },
        error: function () {
//                 console.log("error");
        }
    });*/

}
//列表-加载数据
function loadlist(data) {
    console.log(data);
    this.starTotals('加载成功!')
}

function doNotification(html) {
    var myNotification = new Notify('消息提示!', {
        body: html,
        tag: 'My unique id',
        icon: 'http://imgs.todriver.com/image/u3443117432123918520.jpg',
        timeout: 5
    });
    myNotification.show();
}

function starTotals(html) {
    if (!Notify.needsPermission) {
        this.doNotification(html);
    } else if (Notify.isSupported()) {
        Notify.requestPermission(this.doNotification(html));
    }
}


function setPage(){
    var displayCount = $('#displayCount').val();
    $(".pageBox").pageFun({ /*需要在本地服务器上才能浏览如:http://192.168.0.104/test/page1/index.html*/
        interFace: "data/page.json",
        /*接口*/
        displayCount: displayCount,
        /*每页显示总条数*/
        maxPage: 1,
        /*每次最多加载多少页*/
        dataFun: function(data) {
            var dataHtml = '<li>' + data.dataNum + '<>';
            return dataHtml;
        },
        pageFun: function(i) {
            var pageHtml = '<li class="pageNum">' + i + '<>';
            return pageHtml;
        }
    })
}

//window.location.hash = 'https://www.baidu.com';

//window.location.href.split(“=”)[1]//得到lemon
