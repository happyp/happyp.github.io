$(document).ready(function()
{
    $(".link .button").hover(function()
    {
        //获取data_tip 的内容
        var title = $(this).attr("data_tip");
        //将获取的内容赋值到里面
        $(".tip em").text(title);
        //获取按钮距离左边的距离 将提示框加载到当前按钮处
        var pos = $(this).offset().left;
        //计算按钮与提示框的宽度差值 从而进一步让按钮和提示框居中对齐
        var dis = ($(".tip").outerWidth() - $(this).outerWidth())/2;
        
        $(".tip").css({"left":(pos - dis)+"px"});
        $(".tip").animate({"top":90,"opacity":1},300);
                
        
    },function()
    {
         $(".tip").animate({"top":50,"opacity":0},300);
        
    })
})