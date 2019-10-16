"use strict";
var SlideButton = /** @class */ (function () {
    function SlideButton(width, height, text, id) {
        this.text = '请滑动以解锁';
        this.isTouch = false;
        this.isSuccess = false;
        this.isEnd = false;
        this.isOver = false;
        this.isMove = false;
        this.width = width;
        this.height = height;
        this.id = id;
        this.text = text;
        this.init();
    }
    // 初始化各个部分的样式和绑定事件
    SlideButton.prototype.init = function () {
        this.createDom();
        this.reset(); //重置样式
        this.slideEvent(); //绑定滑动事件
    };
    // 创建元素
    SlideButton.prototype.createDom = function () {
        var button = document.getElementById(this.id);
        // 添加font-awesome的cdn
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = "http://cdn.bootcss.com/font-awesome/4.3.0/css/font-awesome.min.css";
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(link);
        // 滑块背景
        var slide_wrap = document.createElement('div');
        slide_wrap.setAttribute('id', this.id + 'lt-slide-wrap');
        slide_wrap.className = 'lt-slide-wrap';
        // 滑动条
        var slide_bar = document.createElement('div');
        slide_bar.setAttribute('id', this.id + 'lt-slide-bar');
        slide_bar.className = 'lt-slide-bar';
        // 滑动条文本
        var slide_text = document.createElement('span');
        slide_text.setAttribute('id', this.id + 'slide-text');
        slide_text.className = "slide-text";
        // 滑块
        var slide_block = document.createElement('i');
        slide_block.setAttribute('id', this.id + 'lt-slide-block');
        slide_block.className = 'fa fa-chevron-right fa-lg lt-slide-block';
        var fragment = document.createDocumentFragment();
        slide_bar.appendChild(slide_text);
        slide_wrap.appendChild(slide_bar);
        slide_wrap.appendChild(slide_block);
        fragment.appendChild(slide_wrap);
        button.appendChild(fragment);
    };
    //重置样式
    SlideButton.prototype.reset = function () {
        var slide_wrap = document.querySelector('#' + this.id + 'lt-slide-wrap');
        var slide_bar = document.querySelector('#' + this.id + 'lt-slide-bar');
        var slide_block = document.querySelector('#' + this.id + 'lt-slide-block');
        var slide_text = document.querySelector('#' + this.id + 'slide-text');
        slide_bar.className = 'lt-slide-bar';
        slide_block.className = 'fa fa-chevron-right fa-lg lt-slide-block';
        slide_text.className = 'slide-text';
        slide_wrap.style.width = this.width + 'px';
        slide_wrap.style.height = this.height + 'px';
        slide_block.style.width = this.height + 'px';
        slide_block.style.height = this.height + 'px';
        slide_block.style.lineHeight = this.height + 'px';
        slide_block.style.left = '0px';
        slide_bar.style.lineHeight = this.height + 'px';
        slide_bar.style.fontSize = (this.height / 5) + 'px';
        slide_bar.style.textIndent = (this.height / 2) + "px";
        slide_text.innerText = this.text;
    };
    // 绑定滑动事件
    SlideButton.prototype.slideEvent = function () {
        var self = this;
        var slide_max = self.width - self.height;
        var slide_block = document.querySelector('#' + this.id + 'lt-slide-block');
        // 手势触碰滑块：改变滑块样式——初始化是否触碰布尔值、是否成功布尔值
        slide_block.addEventListener('touchstart', function () {
            self.isSuccess = false;
            self.isTouch = true;
            slide_block.style.backgroundColor = "#f6f3f3";
            slide_block.style.transition = "left 0s linear";
        });
        // 手势滑动：计算左右边界
        slide_block.addEventListener('touchmove', function (e) {
            var curX = e.touches[0].pageX;
            if (self.isOver == false) { //判定是否已经完成了一次滑动并且成功，防止成功后被继续拖动
                e.target.style.left = (parseInt(curX) - self.height / 2) + "px";
                var lastMove = parseInt(e.target.style.left);
                if (lastMove < 0) {
                    e.target.style.left = 0;
                }
                if (lastMove > slide_max) {
                    e.target.style.left = (self.width - self.height) + "px";
                    self.isEnd = true;
                }
            }
        });
        // 手势离开，判定是否到最右
        slide_block.addEventListener('touchend', function (e) {
            if (self.isOver == false) { //判定是否已经完成了一次滑动并且成功，防止成功后被继续拖动
                if (parseInt(e.target.style.left) >= slide_max) {
                    self.isSuccess = true;
                    self.success();
                }
                else {
                    e.target.style.left = 0;
                }
            }
            slide_block.style.backgroundColor = "white";
            self.isTouch = false;
        });
    };
    // 请求成功的方法
    SlideButton.prototype.isPass = function () {
        var slide_block = document.querySelector('#' + this.id + 'lt-slide-block');
        slide_block.className = 'fa fa-check fa-lg lt-success';
        // 一旦请求成功，即判定为整个滑动条的动画完成，不再提供滑动（ps：这个逻辑主要用于请求成功后锁定滑块）
        this.isOver = true;
    };
    // 请求失败的方法
    SlideButton.prototype.isFail = function () {
        var slide_bar = document.querySelector('#' + this.id + 'lt-slide-bar');
        var slide_block = document.querySelector('#' + this.id + 'lt-slide-block');
        var slide_text = document.querySelector('#' + this.id + 'slide-text');
        slide_block.className = 'fa fa-times fa-lg lt-fail';
        var self = this;
        setTimeout(function () {
            self.reset();
        }, 300);
    };
    // 加载中的钩子函数
    SlideButton.prototype.loading = function () {
        return;
    };
    SlideButton.prototype.success = function () {
        var slide_wrap = document.querySelector('#' + this.id + 'lt-slide-wrap');
        var slide_bar = document.querySelector('#' + this.id + 'lt-slide-bar');
        var slide_text = document.querySelector('#' + this.id + 'slide-text');
        var slide_block = document.querySelector('#' + this.id + 'lt-slide-block');
        var slideWrap_width = slide_wrap.style.width;
        var slideBlock_width = slide_block.style.width;
        var slide_bar_length = parseInt(slideWrap_width);
        var slide_block_length = parseInt(slideBlock_width);
        slide_text.innerHTML = '';
        slide_block.style.left = (slide_bar_length / 2 - slide_block_length / 2) + 'px';
        slide_bar.classList.add("lt-active");
        slide_block.className = 'fa fa-cog fa-lg fa-spin fa-fw lt-loading';
        slide_block.style.transition = "left .5s linear";
        this.loading();
    };
    return SlideButton;
}());
var Input = /** @class */ (function () {
    function Input(width, height, id, tips, type) {
        this.width = width;
        this.height = height;
        this.id = id;
        this.tips = tips;
        this.type = type;
        this.init();
    }
    // 初始化
    Input.prototype.init = function () {
        this.createDom();
        this.bindEvent();
    };
    Input.prototype.createDom = function () {
        var dom = document.getElementById(this.id);
        var inputDom = document.createElement('input');
        var labelDom = document.createElement('span');
        if (this.type === 'password') {
            inputDom.setAttribute('type', 'password');
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
        this.inputDom = inputDom;
    };
    Input.prototype.setStyle = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var arr = args.slice();
        var dom = arr[0];
        var inputDom = arr[2];
        var labelDom = arr[1];
        var label_width = labelDom.offsetWidth;
        dom.className = "inputBody";
        inputDom.className = "inputStyle";
        var labelStyle = "margin-right:20px;transform:translateX(" + (label_width + 40) + "px)";
        labelDom.setAttribute('style', labelStyle);
    };
    Input.prototype.bindEvent = function () {
        var _this = this;
        var dom = this.dom;
        var labelDom = this.labelDom;
        var inputDom = this.inputDom;
        inputDom.addEventListener('focus', function (e) {
            inputDom.className = "inputStyle inputActive";
            var labelStyle = "margin-right:20px;transform:translateX(0px)";
            labelDom.className = "inputLabel";
            labelDom.setAttribute('style', labelStyle);
            var value = inputDom.innerHTML;
            _this.focus(e.target.value);
        });
        inputDom.addEventListener('blur', function (e) {
            var text = e.target.value;
            if (text === '') {
                var labelStyle = "margin-right:20px;transform:translateX(" + (labelDom.offsetWidth + 40) + "px)";
                labelDom.setAttribute('style', labelStyle);
            }
            else {
            }
            _this.blur(text);
            inputDom.className = "inputStyle";
        });
        inputDom.addEventListener('input', function (e) {
            _this.change(e.target.value);
        });
        labelDom.addEventListener('mouseover', function () {
            inputDom.className = "inputStyle inputActive";
        });
        labelDom.addEventListener('mouseout', function () {
            inputDom.className = "inputStyle";
        });
        labelDom.addEventListener('click', function () {
            inputDom.className = "inputStyle inputActive";
            inputDom.focus();
        });
    };
    Input.prototype.focus = function (val) {
        console.log(val);
    };
    Input.prototype.change = function (val) {
        console.log(val);
    };
    Input.prototype.blur = function (val) {
        console.log(val);
    };
    return Input;
}());
var scrollbar = /** @class */ (function () {
    function scrollbar(id, options) {
        this.originWidth = '';
        this.timer = null;
        this.lastScroll = 0;
        this.pullTimeer = null;
        this.isPress = false;
        this.thumb_offsetY = 0;
        this.thumb_offsetX = 0;
        this.thumb_mouseY = 0;
        this.originWidth = this.getOriginWidth();
        this.id = id;
        if (options) {
            this.options = options;
        }
        else {
            this.options = { loadMore: false, pullOffset: 0 };
        }
        var contentDom = document.getElementById(id);
        this.content = this.getContent(contentDom);
        var _a = this.createBaseDom(), scroll = _a.scroll, scroll_bar = _a.scroll_bar, scroll_wrap = _a.scroll_wrap;
        this.scroll = scroll;
        this.scroll_bar = scroll_bar;
        this.scroll_wrap = scroll_wrap;
        this.scroll_thumb = this.initScrollBar(this.scroll_bar, this.scroll_wrap);
        this.bindEvent();
    }
    // 获取当前浏览器中滚动条的宽度
    /*通过创建一个body以外的块状元素outer，给固定宽度，然后在里面添加一个宽度100%的块状元素inner,
        inner在外层父元素设置了样式overflow:scroll的作用下会出现滚动条，此时用outer的宽减去inner
        的宽度，即为滚动条的宽度，随后销毁该元素
    */
    scrollbar.prototype.getOriginWidth = function () {
        var O_width;
        var outer = document.createElement('div');
        outer.style.width = "100px";
        outer.style.visibility = 'hidden'; //不能用display:none,因为会直接不存在该节点
        outer.style.position = 'absolute';
        outer.style.top = '-9999px';
        outer.style.overflow = "scroll";
        document.body.appendChild(outer);
        var inner = document.createElement('div');
        inner.style.width = "100%";
        outer.appendChild(inner);
        var outer_width = outer.offsetWidth;
        var inner_width = inner.offsetWidth;
        if (outer.parentNode) {
            outer.parentNode.removeChild(outer);
        }
        else {
            document.body.removeChild(outer);
        }
        O_width = outer_width - inner_width;
        if (O_width === 0) {
            O_width = 25;
        }
        return O_width;
    };
    ;
    // 获取html的可视内容
    scrollbar.prototype.getContent = function (dom) {
        var htmlContent = dom.innerHTML;
        return htmlContent;
    };
    ;
    // 构建基础布局
    scrollbar.prototype.createBaseDom = function () {
        var scroll;
        scroll = document.getElementById(this.id);
        scroll.innerHTML = '';
        var scroll_wrap = document.createElement('div');
        var scroll_bar = document.createElement('div');
        scroll_wrap.setAttribute('id', "scorll_wrap-" + this.id);
        scroll_bar.setAttribute('id', "scroll_bar-" + this.id);
        scroll.className = 'lt-scroll';
        scroll_wrap.className = 'lt-scroll-wrap lt-ishorizontal';
        scroll_bar.className = 'lt-scroll-bar lt-scroll-moveOut';
        //根据构建函数中获取到原生滚动条的宽度，开始进行样式修改
        var wrapStyle = "margin-right:-" + this.originWidth + "px;margin-bottom:-" + this.originWidth + "px;padding-right:" + this.originWidth + "px";
        scroll_wrap.setAttribute('style', wrapStyle);
        scroll_wrap.innerHTML = this.content;
        scroll.appendChild(scroll_wrap);
        scroll.appendChild(scroll_bar);
        return { scroll: scroll, scroll_wrap: scroll_wrap, scroll_bar: scroll_bar };
    };
    //组装滑动条
    scrollbar.prototype.initScrollBar = function (bar, wrap) {
        var barWidth = Number(this.originWidth) * 0.4;
        var barStyle = "width:" + barWidth + "px;";
        bar.setAttribute('style', barStyle);
        // 定义一个滚动块thumb
        var thumb = document.createElement('div');
        thumb.className = 'lt-scroll-thumb';
        // 获取thumb高度的方法：只需要知道滚动内容的高度clientHeight和可视窗口的高度scrollHeight
        // 再得出两者的比例关系，那么滚动块和滚动条也必然是这个比例关系，同理即可得出高度
        var precent = parseInt(String(wrap.clientHeight / wrap.scrollHeight * 100)) / 100;
        var barHeight = bar.offsetHeight;
        var thumbHeight = barHeight * precent;
        var thumbStyle = "height:" + thumbHeight + "px;transform:translateY(" + this.lastScroll + "px)";
        thumb.setAttribute('style', thumbStyle);
        thumb.setAttribute('id', "scroll_thumb-" + this.id);
        this.scroll_thumb = thumb;
        bar.appendChild(thumb);
        return thumb;
    };
    // 为各元素绑定事件
    scrollbar.prototype.bindEvent = function () {
        var _this = this;
        var that = this;
        this.proxyContent();
        //监测内容滚动
        this.scroll_wrap.addEventListener('scroll', function (e) {
            //滚轮以及触摸滚动模式下
            if (_this.isPress === false) {
                _this.scroll_bar.className = 'lt-scroll-bar lt-scroll-moveOn';
                _this.scroll_thumb.className = 'lt-scroll-thumb lt-scroll-moveOn';
                var scroll_top_origin = _this.scroll_wrap.scrollTop;
                //原生滚动条的滑动距离与滚动条长度的占比关系
                var precent = parseInt(String(scroll_top_origin / _this.scroll_wrap.scrollHeight * 100)) / 100;
                var scroll_Top_self_1 = _this.scroll_bar.offsetHeight * precent;
                _this.scroll_thumb.style.transform = "translateY(" + scroll_Top_self_1 + "px)";
                if (_this.options.loadMore === true) {
                    _this.lastScroll = scroll_Top_self_1;
                    if (_this.pullTimeer) {
                        clearTimeout(_this.pullTimeer);
                    }
                    _this.pullTimeer = setTimeout(function () {
                        var pullDownNum = _this.scroll_wrap.clientHeight - _this.scroll_thumb.offsetHeight - scroll_Top_self_1;
                        if (_this.options.pullOffset > pullDownNum) {
                            _this.pull(_this.scroll_wrap);
                            // 重新渲染内容，通过数据劫持触发滚动条重新计算机制
                            _this.proxyObj.innerHTML = _this.scroll_wrap.innerHTML;
                        }
                    }, 500);
                }
                if (_this.timer) {
                    clearTimeout(_this.timer);
                }
                _this.timer = setTimeout(function () {
                    _this.scroll_bar.className = 'lt-scroll-bar lt-scroll-moveOut';
                    _this.scroll_thumb.className = 'lt-scroll-thumb .lt-scroll-thumb-reset';
                }, 2000);
            }
            // 拖拽滚动条的情况下
            if (_this.isPress === true) {
            }
        });
        //监测鼠标悬浮滚动条
        this.scroll_bar.addEventListener('mouseover', function (e) {
            _this.scroll_bar.className = 'lt-scroll-bar lt-scroll-moveOn';
            _this.scroll_thumb.className = 'lt-scroll-thumb lt-scroll-moveOn';
        });
        this.scroll_bar.addEventListener('mouseout', function (e) {
            if (_this.isPress === true)
                return;
            _this.scroll_bar.className = 'lt-scroll-bar lt-scroll-moveOut';
            _this.scroll_thumb.className = 'lt-scroll-thumb .lt-scroll-thumb-reset';
        });
        var getMousePosition = this.getMousePosition;
        //拖拽tumb的计算函数
        var dragTumb = function (e) {
            if (that.isPress === true) {
                var y = that.getMousePosition(e).y + that.lastScroll - that.thumb_mouseY;
                var height = that.scroll_bar.clientHeight - that.scroll_thumb.offsetHeight;
                var scroll_top = Math.min(Math.max(0, y), height);
                that.scroll_thumb.style.transform = "translateY(" + scroll_top + "px)";
                var bar_height = that.scroll_bar.offsetHeight;
                var wrap_scrollHeight = that.scroll_wrap.scrollHeight;
                var precent = parseInt(String(scroll_top / bar_height * 100)) / 100;
                that.scroll_wrap.scrollTo(0, wrap_scrollHeight * precent);
            }
        };
        //监测鼠标点击thumb
        this.scroll_thumb.addEventListener('mousedown', function (e) {
            _this.isPress = true;
            //笔记备注：点击前还需考虑是从顶部开始拖拽还是中间开始，如果是中间的话，那么元素距离页面顶部的距离
            //就要加上上次滑动的距离，另外上次滑动的距离lastScroll与滚动条距离存在比例关系
            //元素距离页面顶部的距离
            _this.thumb_offsetY = _this.scroll_thumb.offsetTop;
            //鼠标距离顶部的距离
            var mouseY = _this.getMousePosition(e).y;
            //鼠标距离元素顶部的距离
            _this.thumb_mouseY = mouseY - _this.thumb_offsetY;
            document.onselectstart = function () { return false; };
            _this.scroll_thumb.className = 'lt-scroll-thumb lt-scroll-moveOn lt-scroll-click';
            _this.scroll_thumb.addEventListener('mousemove', dragTumb);
            //把拖拽事件同时绑定到全局body上，防止拖拽过程中超出边界
            document.body.addEventListener('mousemove', dragTumb);
        });
        //保证拖拽手势在拖动过程中超出边界后松开鼠标也不影响功能，
        document.body.addEventListener('mouseup', function (e) {
            _this.isPress = false;
            document.body.removeEventListener('mousemove', dragTumb);
            _this.scroll_thumb.removeEventListener('mousemove', dragTumb);
            _this.scroll_thumb.className = 'lt-scroll-thumb lt-scroll-moveOn';
            document.onselectstart = null;
            if (that.scroll_thumb.style.transform !== null) {
                //获取上次停留的滚动距离，再下一次拖拽时以此为基础
                var s = that.scroll_thumb.style.transform.split(')')[0].split('(')[1].split("p")[0];
                _this.lastScroll = parseInt(s);
            }
            if (_this.timer) {
                clearTimeout(_this.timer);
            }
            _this.timer = setTimeout(function () {
                _this.scroll_bar.className = 'lt-scroll-bar lt-scroll-moveOut';
                _this.scroll_thumb.className = 'lt-scroll-thumb .lt-scroll-thumb-reset';
            }, 2000);
        });
        this.scroll_thumb.addEventListener('mouseup', function (e) {
            _this.isPress = false;
            _this.scroll_thumb.removeEventListener('mousemove', dragTumb);
            document.body.removeEventListener('mousemove', dragTumb);
            _this.scroll_thumb.className = 'lt-scroll-thumb lt-scroll-moveOn';
            document.onselectstart = null;
            if (that.scroll_thumb.style.transform !== null) {
                //获取上次停留的滚动距离，再下一次拖拽时以此为基础
                var s = that.scroll_thumb.style.transform.split(')')[0].split('(')[1].split("p")[0];
                _this.lastScroll = parseInt(s);
            }
        });
    };
    //滚动加载事件钩子
    /**
     * @param content 包含了被包裹内容的dom元素
     */
    scrollbar.prototype.pull = function (content) {
    };
    scrollbar.prototype.triggerPull = function () {
    };
    /**
     * 获取鼠标X位置
     * @param event 触发的事件模型
     */
    scrollbar.prototype.getMousePosition = function (e) {
        var x, y;
        if (e.pageX) {
            x = e.pageX;
            y = e.pageY;
        }
        else {
            x = e.clientX + document.body.scrollLeft - document.body.clientLeft;
            y = e.clientY + document.body.scrollTop - document.body.clientTop;
        }
        return { x: x, y: y };
    };
    //重置滚动条:是否需要重建dom结构还是直接修改scrollbar？？？如何保持上次滚动距离？
    scrollbar.prototype.resetScroll = function () {
        var precent = parseInt(String(this.scroll_wrap.clientHeight / this.scroll_wrap.scrollHeight * 100)) / 100;
        var barHeight = this.scroll_bar.offsetHeight;
        var thumbHeight = barHeight * precent;
        var thumbStyle = "height:" + thumbHeight + "px;transform:translateY(" + this.lastScroll + "px)";
        this.scroll_thumb.setAttribute('style', thumbStyle);
    };
    //对滚动内容进行数据绑定，监测内容，发生改变则重新计算滚动条
    scrollbar.prototype.proxyContent = function () {
        var that = this;
        this.proxyObj = new Proxy(this.scroll_wrap, {
            get: function (target, key, receiver) {
                return Reflect.get(target, key);
            },
            set: function (target, name, value) {
                that.resetScroll();
                return Reflect.set(target, name, value);
            }
        });
    };
    return scrollbar;
}());
