/*
 * @Author: zhengwei
 * @Date:   2016-11-21 09:31:23
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-11-22 11:20:15
 */
$(function () {
    function getSerialList() {
        $.ajax({
            url:"http://139.199.192.48:9091/api/getlianzai",//外网
            // url: "http://192.168.112.112:8888/api/getlianzai",
            success: function (data) {
                var html = template('serialListTmp', { "list": data })
                $('#serial').html(html);
            },
            Error: function (data) {
                console.log('请求不成功')
            }
        })
    }
})