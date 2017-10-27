(function(m)
{
	var InstructionsScene = function()
    {
        //这里定义变量  this.xxx  xxx就是定义的变量
        //一般性的属性设置
        //图片路径
        
        //容器
        this.scence;
        //返回
        this.backBt;
        
        
        
        //调用函数  
        this.init();
	}

	InstructionsScene.prototype = 
    {
		constructor:InstructionsScene,
        
        // 这里定义函数方法  格式 xxx:function()  
        init:function()
        {
            this.scence = new createjs.Container();
            
            //返回
            this.backBt = new Button("返回",120,50);
            this.scence.addChild(this.backBt.button);
            this.backBt.button.x = stageWidth * 0.75 - this.backBt.width / 2;
            this.backBt.button.y = stageHeight * 0.85;
        }
    }
    
    
    

	m.InstructionsScene = function()
    {
		return new InstructionsScene()
	};
})(window)






















//