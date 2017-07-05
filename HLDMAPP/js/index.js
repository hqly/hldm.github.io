/*
 * @Author: zhengwei
 * @Date:   2016-11-21 09:31:23
 * @Last Modified by: TinyMark
 * @Last Modified time: 2017-06-25 15:59:09
 */
$(function () {
    // 1.点击菜单的时候主页往右移动，左侧菜单也往右移动
    // 2.获取点击菜单元素
    // 3.添加点击事件
    // 4.把主页往右移动200像素，同时将遮罩层显示出来
    // 5.把左侧菜单往右移动200像素
    // 6.点击遮罩层任意位置让左侧菜单往左移动200px
    // 7.主页往左移动200像素，同时遮罩层消失

    // 获取点击元素
    var menu = $('.icon-menu');
    var leftMenu = $('#left_nav');
    var layout = $('#layout');
    var mask = $('.mask');
    // 添加点击事件
    menu.on('click', function () {
        layout.css("transform", "translateX(200px)");
        mask.addClass('show');
        leftMenu.css('transform', 'translateX(0px)');
    });
    mask.on('click', function () {
        layout.css("transform", "translateX(0px)");
        mask.removeClass('show');
        leftMenu.css('transform', 'translateX(-200px)');
    })




    //实现轮播图的滑动
    //1 添加滑动事件
    //2 获取滑动开始的位置
    //3 获取滑动结束的位置
    //4 用滑动结束的位置-开始的位置=滑动的距离
    //5 通过滑动的距离判断是从左往右还是从右往左
    //6 从左往右滑动的时候，轮播图要切换到上一张
    //7 从右往左滑动的时候，轮播图要切换到下一张
    // 获取轮播图容器
    var slide = $('#slide');
    // 滑动开始的位置
    var startX = 0;
    // 滑动结束的位置
    var endX = 0;
    // 添加滑动开始事件
    slide.on('touchstart', function (e) {
        // console.log(e);//打印一下e看看e是什么
        // console.log(e.originalEvent.touches[0].clientX);//看看能否获取到开始位置
        startX = e.originalEvent.touches[0].clientX;
    })
    // 添加滑动结束事件
    slide.on('touchend', function (e) {
        // console.log(e);
        // console.log(e.originalEvent.changedTouches[0].clientX)

        endX = e.originalEvent.changedTouches[0].clientX;
        // console.log(endX-startX);//看看是正还是负，判断是往右还是往左滑
        if (endX - startX > 0) {
            $('.carousel').carousel('prev');
        } else {
            $('.carousel').carousel('next');
        }
    })





    // 请求轮播图的api
    // 1、将请求到的轮播图数据给模板去生成html
    // 2、把生成好的html放到carousel-inner轮播图每一项的容器里面
    getSlide();
    function getSlide() {
        // 1、请求轮播图api
        // 发送一个请求
        // 第一个参数是请求的api地址，第二个参数是请求成功的回掉函数
        $.ajax({
            // url:"http://139.199.192.48:9091/api/getlunbo",//外网
            url: "http://192.168.112.112:8888/api/getlunbo",
            success: function (data) {
                // console.log(data);
                // 如果执行了success的回掉函数说明请求成功
                // 将请求回来的数组包到一个对象的list属性身上
                data = { "list": data };
                // 给模板去生成html
                // 调用template方法第一个参数是模板的ID，第二个参数是数据
                var html = template('slideTmp', data);
                // console.log(html);
                // 把html放到carousel-inner容器中
                // 注意如果直接替换里面的每一项轮播可能会出项轮播图看不见，原因是轮播项需要一个active才能显示
                $('.carousel-inner').html(html);
                $('.carousel-inner .item').eq(0).addClass('active');
            },
            Error: function (data) {
                console.log('请求不成功')
            }
        })
    }

    // 请求tab切换栏api
    var tabTitle = $('#nav >.nav-tabs>li>a');
    tabTitle.on('click', function () {
        // console.log(this.dataset['type']);
        // console.log($(this).attr('href'))
        // var herf=($(this).attr('href'))
        getCartoonList($(this).data('type'), $(this).attr('href'));
    })
    // 获取动漫列表的函数
    getCartoonList(1, "#home");
    function getCartoonList(type) {
        // console.log(type);
        $.ajax({
            // url:"http://139.199.192.48:9091/api/gethometab/"+type,
            url: "http://192.168.112.112:8888/api/gethometab/" + type,
            success: function (data) {
                // console.log(data);
                data={"list": data };
                var html=template("cartoonListTmp",data);
                $("herf").html(html);
            },
            // 请求不成功的时候
            Error: function (data) {
                console.log("请求不成功");
            }
        })
    }
})
