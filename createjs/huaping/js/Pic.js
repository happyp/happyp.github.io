(function(m)
{
	var Pic = function(col,src)
    {
        //这里定义变量  this.xxx  xxx就是定义的变量
        //一般性的属性设置
        //图片路径
        this.src = src;
        //定义舞台  获取主程序的舞台
        this.stage;
        //横向 纵向 分成几份 碎片
        this.col = col;
        
        //这里的displayObject 表示MyShape对象的显示对象(用createjs创健的显示对象,可以为Sprite,Shape,Bitmap等等),
        //外部 通过 MyShape 的实例对象 的displayObject属性来直接调用该显示对象
        //var myClass = new MyShape(...,...);
        //myClass.displayObject
        
        //加载类
        this.loader;
        //图片
        this.image;
        //切割线
        this.lines;
        //碎片数组
        this.debrisArr = [];
        //显示的小图片
        this.smallPic;
        //被隐藏的图片的编号
        this.backPoint = {x:0,y:0};

        //调用函数  
        //this.init();
	}

	Pic.prototype = 
    {
		constructor:Pic,
        
        // 这里定义函数方法  格式 xxx:function()  
        init:function()
        {
            var manifest = 
            [
                {src:this.src , id:"pic"}
            ]
            this.loader = new createjs.LoadQueue(false);
            var _this = this;
            this.loader.addEventListener("complete" , function(e){_this.handleComplete()});
            this.loader.loadManifest(manifest);
            
            this.backPoint = {x:this.col-1,y:this.col-1};
        },
        
        //图片加载完毕  处理函数
        handleComplete:function()
        {
           
            this.image = new createjs.Shape();
            this.loader.getResult("pic")
            //获取到外部的图片
            var pic = this.loader.getResult("pic")
            
            this.image.graphics.beginBitmapFill(pic)
            this.image.graphics.drawRect(0, 0, pic.width,pic.height);
			this.image.graphics.endFill();
            this.image.x = picX;
            this.image.y = picY;
            this.image.scaleX = picWidth / pic.width;
            this.image.scaleY = picHeight / pic.height;
            this.image.alpha = 0.2;
            this.stage.addChild(this.image);
            
            
            this.makePic(pic);
            this.makeSmallPic(pic);
            this.makeRandomMove();
            this.drawLines();
            
        },
        
        //切割图片
        makePic:function(pic)
        {
            
            var debrisWidth = pic.width / this.col;
            var debrisHeight = pic.height / this.col;
            
           
            var _this = this;
            
            //i表示 垂直方向   j表示 水平方向
            for(var i = 0;i < this.col; i ++)
            {
                for(var j = 0;j < this.col; j ++)
                {
                    
                    var debris = new createjs.Shape();
                    debris.graphics.beginBitmapFill(pic);
                    debris.graphics.drawRect(i * debrisWidth,j * debrisHeight,debrisWidth,debrisHeight);
                    debris.graphics.endFill();
                    debris.scaleX = debris.scaleY = (picWidth / col) / debrisWidth;
                    debris.regX = i * debrisWidth;
                    debris.regY = j * debrisHeight
                    
        
                    this.stage.addChild(debris);
                    debris.x = i * (picWidth / col) + picX;
                    debris.y = j * (picWidth / col) + picY;
                    //游戏过程中的移动坐标点
                    debris.movePoint = {x:i,y:j};
                    //碎片本身正确的坐标点
                    debris.homePoint = {x:i,y:j};

                    debris.addEventListener("mousedown",function(e){_this.picClick(e.currentTarget,true)})
                    //_this.movePic(e.currentTarget)
                    this.debrisArr.push(debris);
                }
            }
            
            this.debrisArr[this.debrisArr.length -1].visible = false;
            
        },
        
        //绘制线条
        drawLines:function()
        {
            this.lines = new createjs.Shape();
            this.lines.graphics.beginStroke("#000000")
            for(var i = 0;i<= col;i++)
            {
                this.lines.graphics.moveTo(0,picWidth / col * i);
                this.lines.graphics.lineTo(picHeight,picWidth / col * i);
                
                this.lines.graphics.moveTo(picHeight / col * i,0);
                this.lines.graphics.lineTo(picHeight / col * i,picWidth);
            }
            
            this.stage.addChild(this.lines)
            this.lines.x = picX;
            this.lines.y = picY;
        },
        
        //创建小图
        makeSmallPic:function(pic)
        {
            this.smallPic = new createjs.Shape();
            this.smallPic.graphics.beginBitmapFill(pic);
            this.smallPic.graphics.drawRect(0, 0, pic.width,pic.height);
            this.smallPic.graphics.endFill();
            this.smallPic.x = smallX;
            this.smallPic.y = smallY;
            this.smallPic.scaleX = smallWidth / pic.width;
            this.smallPic.scaleY = smallHeight / pic.height;
            this.stage.addChild(this.smallPic);
            
        },
        
        //游戏前 随机移动多次
        makeRandomMove:function()
        {
            for(var i = 0;i<200;i++)
            {
                this.roumdMove();
            }  
        },
        
        //随机移动一次
        roumdMove:function()
        {
            //获取所有能移动的碎片
            var movePicArr = [];
            
            for(var i = 0;i<this.debrisArr.length-1;i++)
            {
                if(!(this.moveDir(this.debrisArr[i].movePoint) == "none"))
                {
                    movePicArr.push(this.debrisArr[i]);
                }
            }
            
            var random = Math.floor(Math.random()*movePicArr.length);
            this.picClick(movePicArr[random],false);
        },
        
        //点击碎片 判断是否该移动
        picClick:function(debris,isEffect)
        {

            
            switch(this.moveDir(debris.movePoint))
            {
                case "up":
                    this.movePic(debris,0,-1,isEffect);
                    break;
                case "down":
                    this.movePic(debris,0,1,isEffect);
                    break;
                case "left":
                    this.movePic(debris,-1,0,isEffect);
                    break;
                case "right":
                    this.movePic(debris,1,0,isEffect);
                    break;
                case "none":
                    break;
            }
            
            
        },
        
        //判断是否能够移动 若能移动 移动方向是什么
        moveDir:function(movePoint)
        {
            if(movePoint.x == this.backPoint.x && movePoint.y - 1 == this.backPoint.y)
            {
                return "up";
            }
            if(movePoint.x == this.backPoint.x && movePoint.y + 1 == this.backPoint.y)
            {
                return "down";
            }
            if(movePoint.x + 1 == this.backPoint.x && movePoint.y == this.backPoint.y)
            {
                return "right";
            }
            if(movePoint.x - 1 == this.backPoint.x && movePoint.y == this.backPoint.y)
            {
                return "left";
            }
            
            return "none";
        },
        
        //移动碎片
        movePic:function(debris,dx,dy,isEffect)
        {
            //交换碎片与空白位置的坐标信息
            debris.movePoint.x += dx;
            debris.movePoint.y += dy;
            this.backPoint.x -= dx;
            this.backPoint.y -= dy;
            
            var moveX = debris.movePoint.x * picWidth/this.col + picX;
            var moveY = debris.movePoint.y * picHeight/this.col + picY;
            if(isEffect)
            {
                
                //createjs.Tween.get(debris).to({scaleX: 0.2, scaleY: 0.2}) /
                
                //暂时注销点击事件 等待动画完成
                for(var i = 0;i<this.debrisArr.length-1;i++)
                {
                    this.debrisArr[i].mouseEnabled = false;
                }
                var _this = this;
                createjs.Tween.get(debris).to({x:moveX,y:moveY}, 200).call(function(){_this.onComplete()});
                
                //横排检测
                if(dx == 0)
                {
                    this.testXAxis(debris);
                }
                
                //竖排检测
                if(dy == 0)
                {
                     this.testYAxis(debris);
                }
                
            }
            else
            {
                debris.x = moveX
                debris.y = moveY;
            }
            
            
        },
        
        //移动动画 结束
        onComplete:function()
        {
            
            var i = 0
            //恢复点击事件
            for(i = 0;i<this.debrisArr.length-1;i++)
            {
                this.debrisArr[i].mouseEnabled = true;
            }
            
            //检测是否拼图成功
            this.testWin();
            
        },
        
        //检测是否拼图成功
        testWin:function()
        {
            //检测是否拼图成功
            for(i = 0;i<this.debrisArr.length-1;i++)
            {
                var isX = (this.debrisArr[i].movePoint.x == this.debrisArr[i].homePoint.x);
                var isY = (this.debrisArr[i].movePoint.y == this.debrisArr[i].homePoint.y);
                
                
                if(!(isX && isY))
                {
                    return 
                }
            }
            
            this.win();
            //this.clear();
        },
        
        //若一排 或 一列上的图片拼成功 出现提示框  闪烁几下
        //检测横排
        testXAxis:function(debris)
        {
            //若一排 或 一列上的图片拼成功 出现提示框  闪烁几下
                //检测 排  dx为0 表示x轴不变 在y轴方向变化  也就是 "up" "down" 两种情况  
                
            var i = debris.movePoint.y;



            var j
            for(j = 0;j<this.col;j++)
            {
                var index = j * this.col + i


                var isX = (this.debrisArr[index].movePoint.x == this.debrisArr[index].homePoint.x);
                var isY = (this.debrisArr[index].movePoint.y == this.debrisArr[index].homePoint.y);
                if(!(isX && isY))
                {
                    return
                }
            }


            
            var xx = picX;
            var yy = i*picWidth/this.col + picY;
            var ww = picWidth;
            var hh = picHeight / this.col;

            this.drawRedRectTip(xx,yy,ww,hh);
            
        },
        
        
        //检测竖排
        testYAxis:function(debris)
        {
            //若一排 或 一列上的图片拼成功 出现提示框  闪烁几下
                //检测 排  dx为0 表示x轴不变 在y轴方向变化  也就是 "up" "down" 两种情况  
                
            var j = debris.movePoint.x;



            var i
            for(i = 0;i<this.col;i++)
            {
                var index = j * this.col + i


                var isX = (this.debrisArr[index].movePoint.x == this.debrisArr[index].homePoint.x);
                var isY = (this.debrisArr[index].movePoint.y == this.debrisArr[index].homePoint.y);
                if(!(isX && isY))
                {
                    return
                }
            }

            
            var xx = j*picWidth/this.col + picX
            var yy = picY;
            var ww = picHeight / this.col;
            var hh = picWidth;

            this.drawRedRectTip(xx,yy,ww,hh);
            
        },
        
        
        
        //游戏胜利
        win:function()
        {
            for(var i = 0;i<this.debrisArr.length;i++)
            {
                this.debrisArr[i].mouseEnabled = false;
                this.debrisArr[i].visible = false;
            }
            //this.debrisArr[this.debrisArr.length-1].visible = true;
            this.image.alpha = 1;
            this.lines.visible = false;
            this.smallPic.visible = false;
            
            //主函数的 win()方法
            gameWin();
        },
        
        //游戏失败
        gameOver:function()
        {
            for(var i = 0;i<this.debrisArr.length-1;i++)
            {
                this.debrisArr[i].mouseEnabled = false;
            }
        },
        
        //删除所有元素
        clear:function()
        {
            for(var i = 0;i<this.debrisArr.length;i++)
            {
                this.stage.removeChild(this.debrisArr[i]);
                this.debrisArr[i] = null;
            }
            this.debrisArr = [];
            
            this.stage.removeChild(this.image);
            this.stage.removeChild(this.smallPic);
            this.stage.removeChild(this.lines);
            
            this.image = null;
            this.smallPic = null;
            this.lines = null;
        },
        
        //创建红色矩形框 动画 来提示这排 或这列 组装成功
        //参数 表示 坐标 长宽
        drawRedRectTip:function(x,y,w,h)
        {
            
            var graphics = new createjs.Graphics();
            graphics.setStrokeStyle(5);
            graphics.beginStroke("#ff0000");
            graphics.drawRect(x,y,w,h);
            graphics.endStroke();
            var redRect = new createjs.Shape(graphics);
            this.stage.addChild(redRect);
            //redRect.graphics.beginStroke("")
            redRect.alpha = 0;
            createjs.Tween.get(redRect)
                .wait(250)
                .to({alpha:1}, 100)
                .wait(100)
                .to({alpha:0}, 100)
                .wait(100)
                .to({alpha:1}, 100)
                .wait(100)
                .to({alpha:0}, 100)
                .wait(100)
                .to({alpha:1}, 100)
                .wait(100)
                .to({alpha:0}, 100)
                .call(function(){redRect.parent.removeChild(redRect);redRect = null});
               
            
        },
        
        
        //暂停
        pause:function()
        {
            for(var i = 0;i<this.debrisArr.length-1;i++)
            {
                this.debrisArr[i].visible = false;
            }
            
            this.image.alpha = 1;
            this.lines.alpha = 0;
        },
        
        //继续
        continue:function()
        {
            for(var i = 0;i<this.debrisArr.length-1;i++)
            {
                this.debrisArr[i].visible = true;
            }
            
            this.image.alpha = 0.2;
            this.lines.alpha = 1;
        },
        
        
        
        
        //addChildTo  模拟显示对象的addChild()方法
        //parent表示需要添加的显示对象的父容器  一般指 舞台stage
        addChildTo:function(parent)
        {
            parent.addChild(this.image);
        }
    }
    
    
    
    
    

	m.Pic = function(col,src)
    {
		return new Pic(col,src)
	};
})(window)






















//