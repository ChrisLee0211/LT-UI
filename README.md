这个仓库主要用来收藏一些自己平日心血来潮写的小组件，算是个人的组件库吧。


## 目录
### 一、表单类组件：
* [1.滑块按钮](#slide-button)
* [2.输入框](#input)

### 二、通用类组件：
* [1.滚动条](#scroll-bar)



# slide-button
练习typescript顺便制作的一个滑块按钮，可以用移动端解锁、表单提交确认等场景

## 效果预览：
![IMAGE](https://github.com/ChrisLee0211/LT-UI/blob/master/preview/example01.gif)

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


### 2019.04.24:
- 修复自定义宽度和高度后显示不正确的bug；

待完成功能：
- 根据传入的宽度和高度，自动修改组件内icon的大小和位置；
- 探索迁移到vue上的方式
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


# input
一个文本提示动态的input框

## 效果预览：
![IMAGE](https://github.com/ChrisLee0211/LT-UI/blob/master/preview/example02.gif)

## 开发日志：

### 2019.06.29:
- 初步完成输入框整体布局；
- 完成样式设置

待完成功能：
- 添加交互功能；
- 完善性能以及提高可扩展性

### 2019.06.30:
- 添加了密码输入类型的判定；
- 完成交互操作

待完成功能：
- 考虑暴露事件钩子；

### 2019.07.02:
- 添加了事件暴露钩子函数

## 使用方法：
一、引入`js`、`css`文件  
二、根据以下示例使用：
```html
<body>
    <lt-input id="input"></lt-input>
    <lt-input id="pwd"></lt-input>
    <script src="./js/index.js"></script>
    <script>
    let LT_input = new Input(180,30,'input','请输入用户名')
    let LT_pwd = new Input(180,30,'pwd','请输入密码','password')
    </script>
</body>
```
三、可设置属性与方法  

属性：（实例化中传入的参数如:`let input = new Input(width,height,id,placeholder,type)`）

|    属性名  | 类型        |        描述 |
| ---------- | -----------| ----------- |
| width      |    number  | 整个输入框的宽度 |
| height     |     number | 整个输入框的高度 |
| id       |     string | 该组件的id值 |
| placeholder      |     string | 该输入框的提示 |
| type       |     string | 非必须参数，当type为"password"时，输入框为密码密文模式 |

钩子：（供使用者在指定的生命周期触发的事件）

|    钩子名称  | 回调参数        |        描述 |
| ---------- | -----------| ----------- |
| focus      |    value(当前输入文本)  | 输入框获取焦点时触发 |
| blur      |    value(当前输入文本)  | 输入框失去焦点时触发 |
| change      |    value(当前输入文本)  | 输入框内容改变时触发 |



# scroll-bar
一个淡入淡出，自定义样式的滚动条

## 效果预览：
![IMAGE](https://github.com/ChrisLee0211/LT-UI/blob/master/preview/example03.gif)

## 开发日志：

### 2019.07.08:
- 构建组件整体布局；

待完成功能：
- 编写初始化样式；
- 确定预期交互效果

### 2019.07.15
- 初始化组件各部分参数；
- 增加判断是否osx safari浏览器以获取适当的原生浏览器滚动条宽度
- 编写基本样式

待完成功能：
- 绑定事件进行基本的显示与消失

### 2019.08.25
- 完成滚动块、滚动条的显示逻辑
- 增加淡入淡出效果

待完成功能：
- 点击滚动条页面自动定位到相应位置
- 监测内容变化来更新自己的滚动块高度
- 暴露钩子用于开发如：下拉至底部

### 2019.09.13
- 完成暴露钩子：下拉至底部
- 通过proxy双向绑定内容，实现监测内容变化实时更新滚动条高高度

待完成功能：
- 实现手动拖拽情况下的滚动条逻辑
- 拖拽情况下的下拉加载功能

### 2019.10.08
- 完成手动拖拽交互效果

待完成功能：
- 拖拽情况下的下拉加载
- 拖拽情况下的鼠标超出滚动条边界的处理逻辑

### 2019.10.27
- 完成拖拽情况下所有逻辑

待完成功能：
- 抽离逻辑，重新规范结构以便维护
- 开发vue和react版本
- 开发横向滚动模式

## 使用方法：
一、引入`js`、`css`文件  
二、根据以下示例使用：
```html
<body>
<!--  必须设置外部元素包裹且外部元素需有确切的宽高才可以生成滚动条    -->
    <div class="main" > 
        <LT-scroll id="scroll">
            <p  >今晚大陆送活动哦冬季送到惊悚的浓雾饿哦我玩弄是董事局董事的浓</p>
            <p  style="background:grey">asdljasdaksdjas</p>
            <p  style="background:white">asdljasdaksdjas</p>
            <p  >asdljasdaksdjas</p>
            <p  style="background:grey">asdljasdaksdjas</p>
            <p  style="background:white">asdljasdaksdjas</p>
            <p  >asdljasdaksdjas</p>
        </LT-scroll>
    </div>
    <script>
        
     let scroll_bar = new scrollbar('scroll',{
         loadMore:true,
         pullOffset:20
     });
        //这里演示的是下拉加载功能
     scroll_bar.pull = function getdata(dom){
         let addtext = `<p  >asdljasdaksdjas</p>
            <p  style="background:green">asdljasdaksdjas</p>
            <p  style="background:green">asdljasdaksdjas</p>`
        let div = document.createElement('div');
        div.innerHTML = addtext;
        dom.appendChild(div)
        // console.log(content.innnerHTML)
     }
     
     </script>
</body>

```

三、可设置属性与方法  

属性：（实例化中传入的参数如:`let scroll_bar = new scrollbar(id,options)`)

|    属性名  | 类型        |        描述 |
| ---------- | -----------| ----------- |
| id      |    string  | 初始化滚动条元素的id |
| options     |     object | 额外配置项：目前支持loadMore:true/false（是否支持下拉加载更多）、pullOffset:0(下拉至底部多少距离时出发加载函数) |

钩子：（供使用者在指定的生命周期触发的事件）

|    钩子名称  | 回调参数        |        描述 |
| ---------- | -----------| ----------- |
| pull      |    HTMLELement(被滚动条包裹的dom元素)  | 下拉加载时要触发的函数逻辑 |
