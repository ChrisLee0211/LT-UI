interface Params {
    width: number;
    height: number;
    text: string;
    id: string;
    createDom(): void;
    init(): void
}

class SlideButton implements Params {
    width: number;
    height: number;
    text: string = '请滑动以解锁';
    id: string;
    isTouch: boolean = false;
    isSuccess: boolean = false;
    isEnd: boolean = false;
    isOver:boolean = false;
    constructor(width: number, height: number, text: string, id: string) {
        this.width = width;
        this.height = height;
        this.id = id;
        this.text = text
    }

    // 初始化各个部分的样式和绑定事件
    init(): void {
        this.createDom()
        this.reset() //重置样式
        this.slideEvent() //绑定滑动事件
    }

    // 创建元素
    createDom(): void {
        let button: HTMLElement = document.getElementById(this.id) as HTMLElement

        // 滑块背景
        let slide_wrap: HTMLElement = document.createElement('div');
        slide_wrap.setAttribute('id', this.id + 'slide-wrap');
        slide_wrap.className = 'slide-wrap';
        // 滑动条
        let slide_bar: HTMLElement = document.createElement('div');
        slide_bar.setAttribute('id', this.id + 'slide-bar');
        slide_bar.className = 'slide-bar';
        // 滑动条文本
        let slide_text: HTMLElement = document.createElement('span');
        slide_text.setAttribute('id', this.id + 'slide-text');
        slide_text.className = "slide-text"
        // 滑块
        let slide_block: HTMLElement = document.createElement('div');
        slide_block.setAttribute('id', this.id + 'slide-block');
        slide_block.className = 'slide-block'

        let fragment = document.createDocumentFragment()
        slide_bar.appendChild(slide_text);
        slide_wrap.appendChild(slide_bar);
        slide_wrap.appendChild(slide_block);
        fragment.appendChild(slide_wrap);
        button.appendChild(fragment)
        // for (let i = 0; i < button.length; i++) {
        //     button[i].appendChild(fragment)
        // }
    }

    //重置样式
    reset(): void {
        let slide_wrap: HTMLElement = document.querySelector('#' + this.id + 'slide-wrap') as HTMLElement;
        let slide_bar: HTMLElement = document.querySelector('#' + this.id + 'slide-bar') as HTMLElement;
        let slide_block: HTMLElement = document.querySelector('#' + this.id + 'slide-block') as HTMLElement;
        let slide_text: HTMLElement = document.querySelector('#' + this.id + 'slide-text') as HTMLElement;
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
        let slide_max: number = self.width - self.height;
        let slide_block: HTMLElement = document.querySelector('#' + this.id + 'slide-block') as HTMLElement;
        // 手势触碰滑块：改变滑块样式——初始化是否触碰布尔值、是否成功布尔值
        slide_block.addEventListener('touchstart', function () {
            self.isSuccess = false;
            self.isTouch = true;
            slide_block.style.backgroundColor = "#f6f3f3";
            slide_block.style.transition = "left 0s linear"
        });
        // 手势滑动：计算左右边界
        slide_block.addEventListener('touchmove', function (e: any) {
            let curX: string = e.touches[0].pageX;
            if (self.isOver == false) { //判定是否已经完成了一次滑动并且成功，防止成功后被继续拖动
                e.target.style.left = (parseInt(curX) - self.height / 2) + "px";
                let lastMove: number = parseInt(e.target.style.left)
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
        slide_block.addEventListener('touchend', function (e: any) {
            if (self.isOver == false) { //判定是否已经完成了一次滑动并且成功，防止成功后被继续拖动
                if (parseInt(e.target.style.left) >= slide_max) {
                    self.isSuccess = true;
                    self.success()
                } else {
                    e.target.style.color = "lightgreen"
                    e.target.style.left = 0
                }
            }
            slide_block.style.backgroundColor = "white";
            self.isTouch = false
        })
    }

    // 请求成功的方法
    isPass(): void {
        let slide_block: HTMLElement = document.querySelector('#' + this.id + 'slide-block') as HTMLElement;
        slide_block.className = 'success';
        // 一旦请求成功，即判定为整个滑动条的动画完成，不再提供滑动（ps：这个逻辑主要用于请求成功后锁定滑块）
        this.isOver = true;
    }

    // 请求失败的方法
    isFail(): void {
        let slide_bar: HTMLElement = document.querySelector('#' + this.id + 'slide-bar') as HTMLElement;
        let slide_block: HTMLElement = document.querySelector('#' + this.id + 'slide-block') as HTMLElement;
        let slide_text: HTMLElement = document.querySelector('#' + this.id + 'slide-text') as HTMLElement;
        slide_block.className = 'fail';
        slide_block.style.backgroundSize = "50% 50%";
        let self = this
        setTimeout(function (): void {
            self.reset()
        }, 300)
    }

    // 加载中的钩子函数
    loading(): any {
        return
    }

    success(): void {
        let slide_wrap: HTMLElement = document.querySelector('#' + this.id + 'slide-wrap') as HTMLElement;
        let slide_bar: HTMLElement = document.querySelector('#' + this.id + 'slide-bar') as HTMLElement;
        let slide_text: HTMLElement = document.querySelector('#' + this.id + 'slide-text') as HTMLElement;
        let slide_block: HTMLElement = document.querySelector('#' + this.id + 'slide-block') as HTMLElement;
        let slideWrap_width: String | any = slide_wrap.style.width;
        let slideBlock_width: String | any = slide_block.style.width;
        let slide_bar_length: number = parseInt(slideWrap_width);
        let slide_block_length: number = parseInt(slideBlock_width)
        slide_text.innerHTML = '';
        slide_block.style.left = (slide_bar_length / 2 - slide_block_length / 2) + 'px'
        slide_bar.classList.add("active")
        slide_block.className = 'loading'
        slide_block.style.transition = "left .5s linear"
        slide_block.classList.add("action")
        this.loading()
    }
}