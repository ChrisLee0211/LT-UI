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

### 2019.04.14:
- 进一步封装，隐藏dom结构细节。
- 现在引用组件只需3行代码即可，类ElementUI在Vue上的体验
- 为类名、组件方法设置好自定义前缀(lt)，为以后组件系列化做铺垫(下一步尝试制作更多移动端的组件)

待完成功能：
- 打包压缩css，将图片base64处理
- 解决同一页面创建多个组件但只有第一个生效的bug
- 释放滑动前、滑动中的生命周期钩子函数供使用

### 2019.04.16:
- 增加传入id值作为区分，解决一个页面创建多个组件时只有一个组件生效的bug。
- 修复调用`isPass()`后滑块依然能滑动的bug

待完成功能：
- 打包压缩css，将图片base64处理
- 释放滑动前、滑动中的生命周期钩子函数供使用

### 2019.04.22:
- 优化结构，去除用图片作为素材，减少整体体积；
- 改为依赖awesome-font作为素材以来，使用cdn压缩体积；

待完成功能：
- 改善靠id识别示例的方式；
- 组件内探索是否能够用随机分配id的办法来识别每一个组件，并且尝试把所有属性和方法绑定到dom上。
- 组件内逻辑进一步优化，减少对dom的操作

## 使用方法：
一、引入`js`、`css`文件  
二、根据以下示例使用：
```html
<body>
    <lt-slide-button id="LT"></lt-slide-button>
    <script src="./js/index.js"></script>
    <script>
    let slide = new SlideButton(150,50,'请滑动登录','LT')
    slide.init() //实例化该组件，之后只需要在自己的表单验证逻辑中使用loading()的钩子，配合isPass()和isFail()来判断成功或失败即可
    </script>
</body>
```
三、可设置属性与方法  

属性：（实例化中传入的参数如:`let slide = new SlideButton(width,height,desc,id)`）

|    属性名  | 类型        |        描述 |
| ---------- | -----------| ----------- |
| width      |    number  | 整个滑动条的宽度 |
| height     |     number | 整个滑动条的高度 |
| desc       |     string | 滑动条内文本内容 |
| id       |     string | 该组件的id值 |

方法：可通过实例调用,用于改变组件样式以符合当前状态  

| 方法 | 传入参数 | 返回参数 |   描述      |
| ----------  | -----------| ----------- | ----------- |
| init() | width、height、desc、id | 无 | 用于初始化组件 |
| isPass() | 无 | 无 | 用于加载成功时显示成功的样式 |
| isFail() | 无  | 无 | 用于加载失败时显示失败的样式，并重置组件 |

钩子：（供使用者在指定的生命周期触发的事件）

|    钩子名称  | 参数        |        描述 |
| ---------- | -----------| ----------- |
| loading      |    无  | 当滑块成功滑到最右并松手时触发 |
