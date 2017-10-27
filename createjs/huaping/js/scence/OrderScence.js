(function(m)
{
	var OrderScence = function()
    {
        //这里定义变量  this.xxx  xxx就是定义的变量
        //一般性的属性设置
        //图片路径
        
        //容器
        this.scence;
        //三阶
        this.orderThreeBt;
        //四阶
        this.orderFourBt;
        //五阶
        this.orderFiveBt
        
        
        
        //调用函数  
        this.init();
	}

	OrderScence.prototype = 
    {
		constructor:OrderScence,
        
        // 这里定义函数方法  格式 xxx:function()  
        init:function()
        {
            this.scence = new createjs.Container();
            
            //三阶
            this.orderThreeBt = new Button("三    阶",240,50);
            this.scence.addChild(this.orderThreeBt.button);
            this.orderThreeBt.button.x = stageWidth / 2 - this.orderThreeBt.width / 2;
            this.orderThreeBt.button.y = stageHeight * 0.38;

            //四阶
            this.orderFourBt = new Button("四    阶",240,50);
            this.scence.addChild(this.orderFourBt.button);
            this.orderFourBt.button.x = stageWidth / 2 - this.orderFourBt.width / 2;
            this.orderFourBt.button.y = stageHeight * 0.45;

            //五阶
            this.orderFiveBt = new Button("五    阶",240,50);
            this.scence.addChild(this.orderFiveBt.button);
            this.orderFiveBt.button.x = stageWidth / 2 - this.orderFiveBt.width / 2;
            this.orderFiveBt.button.y = stageHeight * 0.52;
        }
    }
    
    
    

	m.OrderScence = function()
    {
		return new OrderScence()
	};
})(window)






















//