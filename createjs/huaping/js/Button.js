(function(m)
{
	var Button = function(textStr,width,height)
    {
        //这里定义变量  this.xxx  xxx就是定义的变量
        //一般性的属性设置
        //图片路径
        
        //按钮文字内容
        this.textStr = textStr;
        //按钮外形
        this.shape;
        //按钮文字
        this.text;
        //整个按钮容器
        this.button;
        //舞台
        this.stage;
        //宽度
        this.width = width
        //高度
        this.height = height
        //调用函数  
        this.init();
	}

	Button.prototype = 
    {
		constructor:Button,
        
        // 这里定义函数方法  格式 xxx:function()  
        init:function()
        {
            
            
            this.shape = new createjs.Shape();
            this.shape.graphics.beginFill("#1b9af7")
            this.shape.graphics.drawRect(0,0,this.width,this.height);
            this.shape.graphics.endFill();
            
            this.text = new createjs.Text(this.textStr,"24px Arial","#ffffff");
            this.text.lineWidth = this.width;
            this.text.lineHeight = this.height;
            this.text.textAlign = "center";
            this.text.textBaseline = "middle";
            
            
            this.button = new createjs.Container();
            
            this.button.addChild(this.shape);
            this.button.addChild(this.text);
            this.text.x = this.width * 0.5;
            this.text.y = this.height * 0.5;
            
            this.button.cursor = "pointer"
            
            var _this = this;
            this.button.addEventListener("mouseover",function(e){_this.onMouseOver()});
            this.button.addEventListener("mouseout",function(e){_this.onMouseOut()});
            this.button.addEventListener("mousedown",function(e){_this.onMouseOut()});
            this.button.addEventListener("pressup",function(e){_this.onMouseOver()});
            //4CB0F9
        },
        
        
        onMouseOver:function()
        {
            this.shape.graphics.clear();
            this.shape.graphics.beginFill("#4CB0F9")
            this.shape.graphics.drawRect(0,0,this.width,this.height);
            this.shape.graphics.endFill();
        },
        
        onMouseOut:function()
        {
            this.shape.graphics.clear();
            this.shape.graphics.beginFill("#1b9af7")
            this.shape.graphics.drawRect(0,0,this.width,this.height);
            this.shape.graphics.endFill();
        },
        
        
    }
    
    
    

	m.Button = function(textStr,width,height)
    {
		return new Button(textStr,width,height)
	};
})(window)






















//