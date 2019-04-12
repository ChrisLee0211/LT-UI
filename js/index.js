"use strict";
var SlideButton = /** @class */ (function () {
    function SlideButton(width, height, text) {
        this.text = '请滑动以解锁';
        this.isTouch = false;
        this.isSuccess = false;
        this.isEnd = false;
        this.width = width;
        this.height = height;
        this.text = text;
    }
    // 初始化各个部分的样式和绑定事件
    SlideButton.prototype.init = function () {
        this.reset(); //重置样式
        this.slideEvent(); //绑定滑动事件
    };
    //重置样式
    SlideButton.prototype.reset = function () {
        var slide_wrap = document.querySelector('#slide-wrap');
        var slide_bar = document.querySelector('#slide-bar');
        var slide_block = document.querySelector('#slide-block');
        var slide_text = document.querySelector('.slide-text');
        slide_bar.className = 'slide-bar';
        slide_block.className = 'slide-block';
        slide_text.className = 'slide-text';
        slide_wrap.style.width = this.width + 'px';
        slide_wrap.style.height = this.height + 'px';
        slide_block.style.width = this.height + 'px';
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
        var slide_block = document.querySelector('#slide-block');
        // 手势触碰滑块：改变滑块样式——初始化是否触碰布尔值、是否成功布尔值
        slide_block.addEventListener('touchstart', function () {
            slide_block.style.backgroundColor = "#f6f3f3";
            slide_block.style.transition = "left 0s linear";
            self.isTouch = true;
            self.isSuccess = false;
        });
        // 手势滑动：计算左右边界
        slide_block.addEventListener('touchmove', function (e) {
            var curX = e.touches[0].pageX;
            if (self.isTouch == true) {
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
            if (parseInt(e.target.style.left) >= slide_max) {
                self.isSuccess = true;
                slide_block.style.backgroundColor = "white";
                self.success();
            }
            else {
                e.target.style.color = "lightgreen";
                slide_block.style.backgroundColor = "white";
                e.target.style.left = 0;
            }
            self.isTouch = false;
        });
    };
    // 请求成功的方法
    SlideButton.prototype.isPass = function () {
        var slide_block = document.querySelector('#slide-block');
        slide_block.className = 'success';
        setTimeout(function () {
            slide_block.style.backgroundSize = "50%";
        }, 300);
    };
    // 请求失败的方法
    SlideButton.prototype.isFail = function () {
        var slide_bar = document.querySelector('#slide-bar');
        var slide_block = document.querySelector('#slide-block');
        var slide_text = document.querySelector('.slide-text');
        slide_block.className = 'fail';
        slide_block.style.backgroundSize = "50%";
        slide_block.classList.add('move');
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
        var slide_wrap = document.querySelector('#slide-wrap');
        var slide_bar = document.querySelector('#slide-bar');
        var slide_text = document.querySelector('.slide-text');
        var slide_block = document.querySelector('#slide-block');
        var slideWrap_width = slide_wrap.style.width;
        var slideBlock_width = slide_block.style.width;
        var slide_bar_length = parseInt(slideWrap_width);
        var slide_block_length = parseInt(slideBlock_width);
        slide_text.innerHTML = '';
        slide_block.style.left = (slide_bar_length / 2 - slide_block_length / 2) + 'px';
        slide_bar.classList.add("active");
        slide_block.className = 'loading';
        slide_block.style.transition = "left .5s linear";
        slide_block.classList.add("action");
        this.loading();
    };
    return SlideButton;
}());
