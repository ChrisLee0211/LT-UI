interface Params {
    width: number;
    height: number;
    text: string;
    init(): void
}

class SlideButton implements Params {
    width: number;
    height: number;
    text: string = '请滑动以解锁';
    isTouch: boolean = false;
    isSuccess:boolean = false;
    isEnd:boolean = false;
    constructor(width: number, height: number, text: string) {
        this.width = width;
        this.height = height;
        this.text = text
    }

    // 初始化各个部分的样式和绑定事件
    init(): void {
        this.reset() //重置样式
        this.slideEvent() //绑定滑动事件
    }

    //重置样式
    reset(): void {
        let slide_wrap: HTMLElement = document.querySelector('#slide-wrap') as HTMLElement;
        let slide_bar: HTMLElement = document.querySelector('#slide-bar') as HTMLElement;
        let slide_block: HTMLElement = document.querySelector('#slide-block') as HTMLElement;
        let slide_text:HTMLElement = document.querySelector('.slide-text') as HTMLElement;
        slide_bar.className = 'slide-bar';
        slide_block.className = 'slide-block'
        slide_text.className = 'slide-text'
        slide_wrap.style.width = this.width + 'px';
        slide_wrap.style.height = this.height + 'px';
        slide_block.style.width = this.height + 'px';
        slide_block.style.lineHeight = this.height + 'px';
        slide_block.style.left = '0px'
        slide_bar.style.lineHeight = this.height + 'px';
        slide_bar.style.fontSize = (this.height / 5) + 'px';
        slide_bar.style.textIndent = (this.height / 2) + "px";
        slide_text.innerText = this.text
    }

    // 绑定滑动事件
    slideEvent(): void {
        let self = this;
        let slide_max:number = self.width - self.height;
        let slide_block: HTMLElement = document.querySelector('#slide-block') as HTMLElement;
        // 手势触碰滑块：改变滑块样式——初始化是否触碰布尔值、是否成功布尔值
        slide_block.addEventListener('touchstart', function () {
            slide_block.style.backgroundColor = "#f6f3f3";
            slide_block.style.transition = "left 0s linear"
            self.isTouch = true;
            self.isSuccess = false;
        });
        // 手势滑动：计算左右边界
        slide_block.addEventListener('touchmove', function (e: any) {
            let curX: string = e.touches[0].pageX;
            if (self.isTouch == true) {
                e.target.style.left = (parseInt(curX) - self.height/2) + "px";
                let lastMove:number = parseInt(e.target.style.left)
                    if (lastMove < 0) {
                        e.target.style.left = 0;
                    }
                    if (lastMove > slide_max) {
                        e.target.style.left = (self.width - self.height) + "px";
                        self.isEnd = true
                    }
            }
        });

        // 手势离开，判定是否到最右
        slide_block.addEventListener('touchend',function(e:any){
            if(parseInt(e.target.style.left) >= slide_max){
                self.isSuccess = true;
                slide_block.style.backgroundColor = "white";
                self.success()
            }else{
                e.target.style.color = "lightgreen"
                slide_block.style.backgroundColor = "white";
                e.target.style.left = 0
            }
            self.isTouch = false
        })
    }

    // 请求成功的方法
    isPass():void{
        let slide_block: HTMLElement = document.querySelector('#slide-block') as HTMLElement;
        slide_block.className = 'success';
        setTimeout(function():void{
            slide_block.style.backgroundSize = "50%"
        },300)
    }

    // 请求失败的方法
    isFail():void{
        let slide_bar: HTMLElement = document.querySelector('#slide-bar') as HTMLElement;
        let slide_block: HTMLElement = document.querySelector('#slide-block') as HTMLElement;
        let slide_text:HTMLElement = document.querySelector('.slide-text') as HTMLElement;
        slide_block.className = 'fail';
        slide_block.style.backgroundSize = "50%";
        slide_block.classList.add('move')
        let self = this
        setTimeout(function():void{
            self.reset()
        },300)
    }

    // 加载中的钩子函数
    loading():any{
        return
    }

    success():void{
        let slide_wrap: HTMLElement = document.querySelector('#slide-wrap') as HTMLElement;
        let slide_bar: HTMLElement = document.querySelector('#slide-bar') as HTMLElement;
        let slide_text:HTMLElement = document.querySelector('.slide-text') as HTMLElement;
        let slide_block: HTMLElement = document.querySelector('#slide-block') as HTMLElement;
        let slideWrap_width:String|any = slide_wrap.style.width ;
        let slideBlock_width:String|any = slide_block.style.width ;
        let slide_bar_length:number = parseInt(slideWrap_width);  
        let slide_block_length:number = parseInt(slideBlock_width)
        slide_text.innerHTML = '';
        slide_block.style.left =  (slide_bar_length/2 - slide_block_length/2) + 'px'
        slide_bar.classList.add("active")
        slide_block.className = 'loading'
        slide_block.style.transition = "left .5s linear"
        slide_block.classList.add("action")
        this.loading()
    }
}