"use strict";
var SlideButton = /** @class */ (function () {
    function SlideButton(width, height, text) {
        this.text = '请滑动以解锁';
        this.isTouch = false;
        this.isSuccess = false;
        this.width = width;
        this.height = height;
        this.text = text;
    }
    // 初始化各个部分的样式和绑定事件
    SlideButton.prototype.init = function () {
        this.reset(); //重置样式
        this.slideEvent();
    };
    //重置样式
    SlideButton.prototype.reset = function () {
        var slide_wrap = document.querySelector('.slide-wrap');
        var slide_bar = document.querySelector('.slide-bar');
        var slide_block = document.querySelector('.slide-block');
        var slide_text = document.querySelector('.slide-text');
        // let slide_block_icon:any = document.querySelector('.slide-block-icon');
        slide_wrap.style.width = this.width + 'px';
        slide_wrap.style.height = this.height + 'px';
        slide_block.style.width = this.height + 'px';
        slide_block.style.lineHeight = this.height + 'px';
        slide_bar.style.lineHeight = this.height + 'px';
        slide_bar.style.fontSize = (this.height / 5) + 'px';
        slide_bar.style.textIndent = (this.height / 2) + "px";
        // slide_block_icon.style.marginTop = (this.height/4) + "px"
        // slide_block_icon.style.marginLeft = (this.height/4) + "px"
        slide_text.innerText = this.text;
    };
    // 绑定滑动事件
    SlideButton.prototype.slideEvent = function () {
        var self = this;
        var slide_max = self.width - self.height;
        var slide_block = document.querySelector('.slide-block');
        // 手势触碰滑块：改变滑块样式——初始化是否触碰布尔值、是否成功布尔值
        slide_block.addEventListener('touchstart', function () {
            slide_block.style.backgroundColor = "grey";
            self.isTouch = true;
            self.isSuccess = false;
        });
        // 手势滑动：计算左右边界
        slide_block.addEventListener('touchmove', function (e) {
            var curX = e.touches[0].pageX;
            if (self.isTouch == true) {
                e.target.style.left = (parseInt(curX) - self.height / 2) + "px";
                var lastMove = parseInt(e.target.style.left);
                console.log(lastMove);
                if (lastMove < 0) {
                    e.target.style.left = 0;
                }
                if (lastMove > slide_max) {
                    e.target.style.left = (self.width - self.height) + "px";
                }
            }
        });
        // 手势离开，判定是否到最右
        slide_block.addEventListener('touchend', function (e) {
            if (parseInt(e.target.style.left) >= slide_max) {
                self.isSuccess = true;
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
    SlideButton.prototype.success = function () {
    };
    return SlideButton;
}());
