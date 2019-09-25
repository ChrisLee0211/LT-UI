

/**
 * 滑块逻辑接口
 */
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
    isOver: boolean = false;
    isMove: boolean = false;
    constructor(width: number, height: number, text: string, id: string) {
        this.width = width;
        this.height = height;
        this.id = id;
        this.text = text;
        this.init();
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
        // 添加font-awesome的cdn
        let link: any = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = "http://cdn.bootcss.com/font-awesome/4.3.0/css/font-awesome.min.css";
        let head: HTMLElement = document.getElementsByTagName('head')[0] as HTMLElement;
        head.appendChild(link)

        // 滑块背景
        let slide_wrap: HTMLElement = document.createElement('div');
        slide_wrap.setAttribute('id', this.id + 'lt-slide-wrap');
        slide_wrap.className = 'lt-slide-wrap';
        // 滑动条
        let slide_bar: HTMLElement = document.createElement('div');
        slide_bar.setAttribute('id', this.id + 'lt-slide-bar');
        slide_bar.className = 'lt-slide-bar';
        // 滑动条文本
        let slide_text: HTMLElement = document.createElement('span');
        slide_text.setAttribute('id', this.id + 'slide-text');
        slide_text.className = "slide-text"
        // 滑块
        let slide_block: HTMLElement = document.createElement('i');
        slide_block.setAttribute('id', this.id + 'lt-slide-block');
        slide_block.className = 'fa fa-chevron-right fa-lg lt-slide-block'

        let fragment = document.createDocumentFragment()
        slide_bar.appendChild(slide_text);
        slide_wrap.appendChild(slide_bar);
        slide_wrap.appendChild(slide_block);
        fragment.appendChild(slide_wrap);
        button.appendChild(fragment)
    }

    //重置样式
    reset(): void {
        let slide_wrap: HTMLElement = document.querySelector('#' + this.id + 'lt-slide-wrap') as HTMLElement;
        let slide_bar: HTMLElement = document.querySelector('#' + this.id + 'lt-slide-bar') as HTMLElement;
        let slide_block: HTMLElement = document.querySelector('#' + this.id + 'lt-slide-block') as HTMLElement;
        let slide_text: HTMLElement = document.querySelector('#' + this.id + 'slide-text') as HTMLElement;
        slide_bar.className = 'lt-slide-bar';
        slide_block.className = 'fa fa-chevron-right fa-lg lt-slide-block'
        slide_text.className = 'slide-text'
        slide_wrap.style.width = this.width + 'px';
        slide_wrap.style.height = this.height + 'px';
        slide_block.style.width = this.height + 'px';
        slide_block.style.height = this.height + 'px';
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
        let slide_block: HTMLElement = document.querySelector('#' + this.id + 'lt-slide-block') as HTMLElement;
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
                    e.target.style.left = 0
                }
            }
            slide_block.style.backgroundColor = "white";
            self.isTouch = false
        })
    }

    // 请求成功的方法
    isPass(): void {
        let slide_block: HTMLElement = document.querySelector('#' + this.id + 'lt-slide-block') as HTMLElement;
        slide_block.className = 'fa fa-check fa-lg lt-success';
        // 一旦请求成功，即判定为整个滑动条的动画完成，不再提供滑动（ps：这个逻辑主要用于请求成功后锁定滑块）
        this.isOver = true;
    }

    // 请求失败的方法
    isFail(): void {
        let slide_bar: HTMLElement = document.querySelector('#' + this.id + 'lt-slide-bar') as HTMLElement;
        let slide_block: HTMLElement = document.querySelector('#' + this.id + 'lt-slide-block') as HTMLElement;
        let slide_text: HTMLElement = document.querySelector('#' + this.id + 'slide-text') as HTMLElement;
        slide_block.className = 'fa fa-times fa-lg lt-fail';
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
        let slide_wrap: HTMLElement = document.querySelector('#' + this.id + 'lt-slide-wrap') as HTMLElement;
        let slide_bar: HTMLElement = document.querySelector('#' + this.id + 'lt-slide-bar') as HTMLElement;
        let slide_text: HTMLElement = document.querySelector('#' + this.id + 'slide-text') as HTMLElement;
        let slide_block: HTMLElement = document.querySelector('#' + this.id + 'lt-slide-block') as HTMLElement;
        let slideWrap_width: String | any = slide_wrap.style.width;
        let slideBlock_width: String | any = slide_block.style.width;
        let slide_bar_length: number = parseInt(slideWrap_width);
        let slide_block_length: number = parseInt(slideBlock_width)
        slide_text.innerHTML = '';
        slide_block.style.left = (slide_bar_length / 2 - slide_block_length / 2) + 'px'
        slide_bar.classList.add("lt-active")
        slide_block.className = 'fa fa-cog fa-lg fa-spin fa-fw lt-loading'
        slide_block.style.transition = "left .5s linear"
        this.loading()
    }
}

/**
 * 输入框逻辑接口
 */
interface Input {
    width: number,
    height: number,
    id: string,
    tips: string,
    type?: string,
    init(): void,
    createDom(): void
}

class Input implements Input {
    width: number;
    height: number;
    id: string;
    type?: string;
    tips: string;
    dom?: HTMLElement;
    labelDom?: HTMLElement;
    inputDom?: HTMLElement;
    constructor(width: number, height: number, id: string, tips: string, type?: string) {
        this.width = width;
        this.height = height;
        this.id = id;
        this.tips = tips;
        this.type = type;
        this.init()
    }
    // 初始化
    init(): void {
        this.createDom();
        this.bindEvent();
    }
    createDom(): void {
        let dom: HTMLElement = document.getElementById(this.id) as HTMLElement;
        let inputDom: HTMLElement = document.createElement('input');
        let labelDom: HTMLElement = document.createElement('span');
        if (this.type === 'password') {
            inputDom.setAttribute('type', 'password')
        }
        labelDom.innerHTML = this.tips;
        inputDom.style.textIndent = '10px';
        inputDom.style.width = this.width + 'px';
        inputDom.style.height = this.height + 'px';
        dom.appendChild(labelDom);
        dom.appendChild(inputDom);
        this.setStyle(dom, labelDom, inputDom);
        this.dom = dom;
        this.labelDom = labelDom;
        this.inputDom = inputDom
    }
    setStyle(...args: any) {
        let arr = [...args];
        let dom: HTMLElement = arr[0];
        let inputDom: HTMLElement = arr[2];
        let labelDom: HTMLElement = arr[1];
        let label_width: string | any = labelDom.offsetWidth;
        dom.className = "inputBody";
        inputDom.className = "inputStyle";
        let labelStyle: string = `margin-right:20px;transform:translateX(${label_width + 40}px)`
        labelDom.setAttribute('style', labelStyle)
    }
    bindEvent(): void {
        let dom: HTMLElement = this.dom as HTMLElement;
        let labelDom: HTMLElement = this.labelDom as HTMLElement;
        let inputDom: HTMLElement = this.inputDom as HTMLElement;

        inputDom.addEventListener('focus', (e) => {
            inputDom.className = "inputStyle inputActive"
            let labelStyle: string = `margin-right:20px;transform:translateX(0px)`;
            labelDom.className = "inputLabel";
            labelDom.setAttribute('style', labelStyle);
            let value: any = inputDom.innerHTML;
            this.focus((<HTMLInputElement>e.target).value);
        });
        inputDom.addEventListener('blur', (e) => {
            let text: any | null = (<HTMLInputElement>e.target).value;
            if (text === '') {
                let labelStyle: string = `margin-right:20px;transform:translateX(${labelDom.offsetWidth + 40}px)`
                labelDom.setAttribute('style', labelStyle);

            } else {

            }
            this.blur(text);
            inputDom.className = "inputStyle";
        })
        inputDom.addEventListener('input', (e) => {
            this.change((<HTMLInputElement>e.target).value)
        })
        labelDom.addEventListener('mouseover', () => {
            inputDom.className = "inputStyle inputActive"
        });
        labelDom.addEventListener('mouseout', () => {
            inputDom.className = "inputStyle"
        })
        labelDom.addEventListener('click', () => {
            inputDom.className = "inputStyle inputActive";
            inputDom.focus()
        })
    }
    focus(val: any): any {
        console.log(val)
    }
    change(val: any): any {
        console.log(val)
    }
    blur(val: any): any {
        console.log(val)
    }

}

interface scrollbar {
    originWidth: string | number,
    id: string,
    options: scrollOpt,
    getOriginWidth(): string | number
}

interface scrollOpt {
    loadMore: boolean,
    pullOffset: number
}

class scrollbar implements scrollbar {
    originWidth: string | number = '';
    id: string;
    options: scrollOpt;
    content: any;
    scroll: HTMLElement;
    scroll_wrap: HTMLElement;
    scroll_bar: HTMLElement;
    scroll_thumb: HTMLElement;
    scroll_precent:number|null = 0;
    timer: number | null = null;
    lastScroll: number = 0;
    pullTimeer: number | null = null;
    proxyObj: any;
    isPress: Boolean = false;
    thumb_offsetY: number = 0;
    thumb_offsetX: number = 0;
    thumb_mouseY:number = 0;


    constructor(id: string, options?: scrollOpt) {
        this.originWidth = this.getOriginWidth();
        this.id = id;
        if (options) {
            this.options = options;
        } else {
            this.options = { loadMore: false, pullOffset: 0 }
        }
        let contentDom: HTMLElement = document.getElementById(id) as HTMLElement;
        this.content = this.getContent(contentDom)
        let { scroll, scroll_bar, scroll_wrap } = this.createBaseDom();
        this.scroll = scroll;
        this.scroll_bar = scroll_bar;
        this.scroll_wrap = scroll_wrap;
        this.scroll_thumb = this.initScrollBar(this.scroll_bar, this.scroll_wrap);
        this.bindEvent()
    }

    // 获取当前浏览器中滚动条的宽度
    /*通过创建一个body以外的块状元素outer，给固定宽度，然后在里面添加一个宽度100%的块状元素inner,
        inner在外层父元素设置了样式overflow:scroll的作用下会出现滚动条，此时用outer的宽减去inner
        的宽度，即为滚动条的宽度，随后销毁该元素
    */
    getOriginWidth() {
        let O_width;
        const outer: HTMLElement = document.createElement('div');
        outer.style.width = "100px";
        outer.style.visibility = 'hidden'; //不能用display:none,因为会直接不存在该节点
        outer.style.position = 'absolute';
        outer.style.top = '-9999px';
        outer.style.overflow = "scroll";
        document.body.appendChild(outer);
        const inner: HTMLElement = document.createElement('div');
        inner.style.width = "100%";
        outer.appendChild(inner);
        const outer_width: number = outer.offsetWidth;
        const inner_width: number = inner.offsetWidth;
        if (outer.parentNode) {
            outer.parentNode.removeChild(outer)
        } else {
            document.body.removeChild(outer)
        }
        O_width = outer_width - inner_width;
        if (O_width === 0) {
            O_width = 25
        }
        return O_width
    };

    // 获取html的可视内容
    getContent(dom: HTMLElement) {
        let htmlContent: any = dom.innerHTML;
        return htmlContent
    };

    // 构建基础布局
    createBaseDom() {
        let scroll: HTMLElement;
        scroll = document.getElementById(this.id) as HTMLElement;
        scroll.innerHTML = '';
        let scroll_wrap: HTMLElement = document.createElement('div');
        let scroll_bar: HTMLElement = document.createElement('div');
        scroll_wrap.setAttribute('id', `scorll_wrap-${this.id}`);
        scroll_bar.setAttribute('id', `scroll_bar-${this.id}`);
        scroll.className = 'lt-scroll';
        scroll_wrap.className = 'lt-scroll-wrap lt-ishorizontal';
        scroll_bar.className = 'lt-scroll-bar lt-scroll-moveOut';
        //根据构建函数中获取到原生滚动条的宽度，开始进行样式修改
        let wrapStyle = `margin-right:-${this.originWidth}px;margin-bottom:-${this.originWidth}px;padding-right:${this.originWidth}px`
        scroll_wrap.setAttribute('style', wrapStyle);
        scroll_wrap.innerHTML = this.content;
        scroll.appendChild(scroll_wrap);
        scroll.appendChild(scroll_bar);

        return { scroll, scroll_wrap, scroll_bar }
    }
    //组装滑动条
    initScrollBar(bar: HTMLElement, wrap: HTMLElement) {
        let barWidth: string | number = Number(this.originWidth) * 0.4;
        let barStyle: string = `width:${barWidth}px;`;
        bar.setAttribute('style', barStyle);
        // 定义一个滚动块thumb
        let thumb: HTMLElement = document.createElement('div');
        thumb.className = 'lt-scroll-thumb';
        // 获取thumb高度的方法：只需要知道滚动内容的高度clientHeight和可视窗口的高度scrollHeight
        // 再得出两者的比例关系，那么滚动块和滚动条也必然是这个比例关系，同理即可得出高度
        let precent: number = parseInt(String(wrap.clientHeight / wrap.scrollHeight * 100)) / 100;
        let barHeight: number = bar.offsetHeight;
        let thumbHeight: number = barHeight * precent;
        let thumbStyle: string = `height:${thumbHeight}px;transform:translateY(${this.lastScroll}px)`;
        thumb.setAttribute('style', thumbStyle);
        thumb.setAttribute('id', `scroll_thumb-${this.id}`)
        this.scroll_thumb = thumb;
        bar.appendChild(thumb);
        return thumb
    }

    // 为各元素绑定事件
    bindEvent() {
        const that = this;
        this.proxyContent()
        //监测内容滚动
        this.scroll_wrap.addEventListener('scroll', (e: Event) => {
            //滚轮以及触摸滚动模式下
            if (this.isPress === false) {
                this.scroll_bar.className = 'lt-scroll-bar lt-scroll-moveOn';
                this.scroll_thumb.className = 'lt-scroll-thumb lt-scroll-moveOn';
                let scroll_top_origin: number = this.scroll_wrap.scrollTop;
                //原生滚动条的滑动距离与滚动条长度的占比关系
                let precent: number = parseInt(String(scroll_top_origin / this.scroll_wrap.scrollHeight * 100)) / 100;
                this.scroll_precent = precent;
                let scroll_Top_self: number = this.scroll_bar.offsetHeight * precent;
                this.scroll_thumb.style.transform = `translateY(${scroll_Top_self}px)`
                if (this.options.loadMore === true) {
                    this.lastScroll = scroll_Top_self;
                    if (this.pullTimeer) { clearTimeout(this.pullTimeer) }
                    this.pullTimeer = setTimeout(() => {
                        let pullDownNum: number = this.scroll_wrap.clientHeight - this.scroll_thumb.offsetHeight - scroll_Top_self;
                        if (this.options.pullOffset > pullDownNum) {
                            this.pull(this.scroll_wrap);
                            // 重新渲染内容，通过数据劫持触发滚动条重新计算机制
                            this.proxyObj.innerHTML = this.scroll_wrap.innerHTML
                        }
                    }, 500)
                }
                if (this.timer) { clearTimeout(this.timer) }
                this.timer = setTimeout(() => {
                    this.scroll_bar.className = 'lt-scroll-bar lt-scroll-moveOut';
                    this.scroll_thumb.className = 'lt-scroll-thumb .lt-scroll-thumb-reset'
                }, 1000)
            }
            // 拖拽滚动条的情况下
            if(this.isPress === true){

            }
        })
        //监测鼠标悬浮滚动条
        this.scroll_bar.addEventListener('mouseover', (e: Event) => {
            this.scroll_bar.className = 'lt-scroll-bar lt-scroll-moveOn';
            this.scroll_thumb.className = 'lt-scroll-thumb lt-scroll-moveOn';
        })
        this.scroll_bar.addEventListener('mouseout', (e: Event) => {
            if (this.isPress === true) return
            this.scroll_bar.className = 'lt-scroll-bar lt-scroll-moveOut';
            this.scroll_thumb.className = 'lt-scroll-thumb .lt-scroll-thumb-reset'
        })
        let getMousePosition = this.getMousePosition
        //拖拽tumb的计算函数
        let dragTumb = function(e:MouseEvent){
            if(that.isPress===true){
                let thumb_height:number = that.scroll_thumb.offsetHeight;
                let bar_height:number = that.scroll_bar.offsetHeight;
                let y:number = that.getMousePosition(e).y - that.thumb_mouseY;
                let height = that.scroll_bar.clientHeight - that.scroll_thumb.offsetHeight;
                let scroll_top = Math.min(Math.max(0, y), height);
                that.scroll_thumb.style.transform = `translateY(${scroll_top}px)`
            }
        }
        
        //监测鼠标点击thumb
        this.scroll_thumb.addEventListener('mousedown',(e:MouseEvent)=>{
            this.isPress = true;
            //笔记备注：点击前还需考虑是从顶部开始拖拽还是中间开始，如果是中间的话，那么元素距离页面顶部的距离
            //就要加上上次滑动的距离，另外上次滑动的距离lastScroll与滚动条距离存在比例关系
            //元素距离页面顶部的距离
            this.thumb_offsetY =this.scroll_thumb.offsetTop;
            //鼠标距离顶部的距离
            let mouseY:number = this.getMousePosition(e).y;
            //鼠标距离元素顶部的距离
            this.thumb_mouseY = mouseY - this.thumb_offsetY;
            document.onselectstart = () => false;
            this.scroll_thumb.className='lt-scroll-thumb lt-scroll-moveOn lt-scroll-click'
            this.scroll_thumb.addEventListener('mousemove',dragTumb)
        })
        this.scroll_thumb.addEventListener('mouseup',(e:MouseEvent)=>{
            this.isPress = false;
            this.scroll_thumb.removeEventListener('mousemove',dragTumb)
            this.scroll_thumb.className='lt-scroll-thumb lt-scroll-moveOn'
            document.onselectstart = null;
        })
    }
    //滚动加载事件钩子
    /**
     * @param content 包含了被包裹内容的dom元素
     */
    pull(content: object) {

    }

    /**
     * 获取鼠标X位置
     * @param event 触发的事件模型
     */
    getMousePosition(e:MouseEvent){
        let x:number,y:number;
        if (e.pageX) {
            x = e.pageX
            y = e.pageY
        } else {
            x = e.clientX + document.body.scrollLeft - document.body.clientLeft
            y = e.clientY + document.body.scrollTop - document.body.clientTop
        }
        return {x:x,y:y}
    }

    //重置滚动条:是否需要重建dom结构还是直接修改scrollbar？？？如何保持上次滚动距离？
    resetScroll() {
        let precent: number = parseInt(String(this.scroll_wrap.clientHeight / this.scroll_wrap.scrollHeight * 100)) / 100;
        let barHeight: number = this.scroll_bar.offsetHeight;
        let thumbHeight: number = barHeight * precent;
        let thumbStyle: string = `height:${thumbHeight}px;transform:translateY(${this.lastScroll}px)`;
        this.scroll_thumb.setAttribute('style', thumbStyle);
    }

    //对滚动内容进行数据绑定，监测内容，发生改变则重新计算滚动条
    proxyContent() {
        const that = this;
        this.proxyObj = new Proxy(this.scroll_wrap, {
            get(target, key, receiver) {
                return Reflect.get(target, key)
            },
            set(target, name, value) {
                that.resetScroll()
                return Reflect.set(target, name, value)
            }
        })
    }
}