/*
 * @Author: zhengwei
 * @Date:   2016-11-21 09:31:23
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-11-22 14:47:39
 */
$(function(){
    function getFeatureList(){
        $.ajax({
            url:"http://139.199.192.48:9091/api/gethometab/1",//外网
            url:"http://139.199.192.48:9091/api/gethometab/2",//外网
            url:"http://139.199.192.48:9091/api/gethometab/3",//外网
            url:"http://139.199.192.48:9091/api/gethometab/4",//外网
            // url:"http://192.168.112.112:8888/api/gettopics",
            success:function(data){
                var html=template('featuresListTmp',{'list':data})
                $('#features').html(html);
            },
            Error:function(data){
                console.log(data);
                console.log('请求不成功');
            }

        })
    }
})
