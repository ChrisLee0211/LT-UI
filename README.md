# slide-button
练习typescript顺便制作的一个滑块按钮，可以用移动端解锁、表单提交确认等场景

## 效果预览：
![IMAGE](https://github.com/ChrisLee0211/slide-button/blob/master/example01.gif)

## 开发日志：

### 2019.04.02:
- 初步完成滑块整体结构
- 完成左右边界判断

待完成功能：
- 右滑成功的加载动画；
- 成功or失败的回调函数；
- 考虑是否在滑动过程、滑动开头、滑动结束这几个阶段暴露钩子函数


### 2019.04.08:
- 完成右滑成功的加载动画
- 重构了整个HTML结构

待完成功能：
- 优化动画效果
- 添加提交失败的事件
- 成功or失败的回调函数；


### 2019.04.12:
- 完成了整体的滑动效果
- 提供了成功or失败的样式调整方法供使用
- 暴露了滑动成功后的loading钩子函数供使用

待完成功能：
- 打包压缩css，将图片base64处理
- 进一步优化逻辑，找出更多bug
- 考虑是否暴露点触、滑动、加载中三个生命周期的钩子

## 使用方法：
一、引入`js`、`css`文件，并且目前需要把图片文件也放到项目根目录下（后期会改进这个做法）  
二、根据以下示例，设置好相应的class类名和html结构：
```html
<div class="slide-wrap" id="slide-wrap">
        <div class="slide-bar" id="slide-bar">
            <span class="slide-text">请滑动以解锁</span> 
        </div>
        <div class="slide-block" id="slide-block"></div>
    </div>
    <script src="./js/index.js"></script>
    <script>
    let slide = new SlideButton(150,50,'请滑动登录')
    slide.init()
    </script>
```
三、可设置属性与方法  

属性：（实例化中传入的参数如:`let slide = new SlideButton(width,height,desc)`）

|    属性名  | 类型        |        描述 |
| ---------- | -----------| ----------- |
| width      |    number  | 整个滑动条的宽度 |
| height     |     number | 整个滑动条的高度 |
| desc       |     string | 滑动条内文本内容 |

方法：可通过实例调用,用于改变组件样式以符合当前状态  

| 方法 | 传入参数 | 返回参数 |   描述      |
| ----------  | -----------| ----------- | ----------- |
| init() | 无 | 无 | 用于初始化组件 |
| isPass() | 无 | 无 | 用于加载成功时显示成功的样式 |
| isFail() | 无  | 无 | 用于加载失败时显示失败的样式，并重置组件 |

钩子：（供使用者在指定的生命周期触发的事件）

|    钩子名称  | 参数        |        描述 |
| ---------- | -----------| ----------- |
| loading      |    无  | 当滑块成功滑到最右并松手时触发 |