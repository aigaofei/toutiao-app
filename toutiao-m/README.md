# toutiao-m
## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
```
### Lints and fixes files
```
npm run lint
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# 项目新得：
## 1- 在axios的配置文件中，不能用this.$store.state.user 获取数据，【去掉this 也不能获取并且会报错，因为this是undefined】，【不带this则会提醒 后面的东西存在不合理】
## 2- 如何解决axios里获取vuex数据：
## 用 import store from '@/store/index.js'  导入
## 再用 const {user} = store.state  将目标值解构出来使用
## 3- axios 里配置请求拦截器：
##   3-1：如果路径中有特定标识-代表权限的-要判断权限再配置token
##   3-2：如果要访问有权限的请求-无明显标识-要判断有user && user.token 这样并集条件后加 token
##   3-3：如果不用配置token，最后一定要 return config，否则报错
## 4- axios里的 config 里有baseURL 和 url 两个路径参数，【前者是全局基础路径，非path非当前页面路径】，
##   【后者是即将请求的路径，非path非当前页面路径】
## 5- 注意：所以--axios里的 config 配置，不论【请求】还是【响应】都针对发的请求，不是当前页面的路径
## 6- 以下这样的报错都是axios请求发送配置有误导致，【请求发送失败导致】
![Image text]('@/images/axios配置请求错误报告.jpg')
## 7- 在vant 库里列表下拉加载中，方法里有load 的方法，它是网页进入自动触发的，相当于created 里的方法，所以在load里直接 异步 async ... await...数据方法请求就可以
## 8- 在vant 库里list 的上滑加载出错时不能用它里面的出错的事件方法fetchSomeThing().catch(() => { 。。。})，因为编译器会报错，显示【fetchSomeThing() 】 没有定义，所以在try..catch (err) { 这里来修改让 this.error = true } 即可完成【出错点击继续加载】
## 9- homeArticleList.vue组件里 ---->  9-1 关于Vh 单位动态使用时，less语法中不能用 650/6.67Vh 这样写宽高度，不会起作用，---要写成 96vh 这样的固定值，才会起作用，
##    9-2 Vh是调试窗口宽高 1/100 vh/vw 的动态单位使用
##    9-3 在组件里将上拉加载更多的子组件设定成固定高度和overflow-y : auto 时，优点是： 1-会让子组件不同选项请求各自内容时，各自滚动后位置会被记录，不会互相影响  2-子组件的滚动条上限也会停在子组件范围内，不会窜到父组件范围  
## 10- 关于vant插件里上拉加载更多，判断是否数据全部加载完毕，要判断每次请求的数量，把它放到if里，else放如果有就数据累加的逻辑，这样可以避免没有数据仍请求，就会报错的麻烦
## 11- 处理抓取其它网站图片时，遇到对方网站做了防盗链处理--所以我方请求图片失败----的处理
##     解决方法：Referer是请求头Header的一部分内容，它会在【请求发送时在Request Header里携带 referer的属性】，如果发送不携带，对方服务器就不知道了，就可以给到图片资源，
##    如给 <a> / <image> / <link> / <iframe> / <script> 等标签内加一个属性--->  <img src='' referrerPolicy="no-referrer" >即可去掉并请求资源
##     方法2：  也可以给html 页面头中添加此属性，表示此页面里所有的请求不携带
##    <meta name="referrer" content="no-referrer">
##   【注意】：强防盗链时---此方法有时是不行的
## 12- 在子组件中如果申请获使用了【全局过滤器、全局指令】等类似工具，（提示： vue是可以在每个组件里都可导入并使用的）--【最后还要将此工具所在的组件--导入到 main.js 文件里】，这才完成了全局挂载的操作
## 13- 子级和父级互相传值都是在【父级里的子级身上操作】--> [ <son :a='b' @c="d" ></son> ]   2:  【子级组件身上可以同时接收多个来自自己内部的---子向父传的事件绑定操作】--->[ <son @a="b" @c="d" @many="some"> ]   ====>  一定要注意这里
## 14- 关于循环数组内部是多个对象的数组，要求是：A是全部内容
##     B有A中的5个元素， C中要放A 中除B里-以外的内容进来，【B + C = A】这个意思， 
### 14-1： 频道列表的案例
###   第一种方法：  const boxC = []
###    this.A.forEach(itemA => { 
###    const box =  this.B.find( itemB => { return itemA.name === item.B } ) 
###     if(!box) boxC.push(itemA) })
###    box本身是找到的值为true的值，【取反】则为想要的结果
### 14-2：
###   第二种方法：
###   const boxA = this.A.filter(itemA => { return !this.B.find( itemB => return itemB.name === itemA.name ) })
###   这样就得到了结果----filter过滤的结果会自动保存在一个新数组里，本身也有遍历全部内容的功能，查找符合条件的结果
##  15- 计算属性computed 是动态响应式的---是可以缓存的
##  16- 开发前准备： 1-梳理开发内容先后的顺序  2-检查开发给到的资源是否齐全  3-做每一项内容开发【都要跟上作用过程注释】  4-开发每一个模块功能都要先按次序预演推理功能逻辑【包括紧随其后的测试】  5-代码要随其逻辑功能大脑要同时出现-写完看着代码推演一遍再运行  6-模糊的api及时查，每一个功能逻辑走不通或是方法不对，实在走不出来就换其他思路，迂回解决--已实现功能为主  7-做好的功能要有笔纸记录     【以上都是省时之举】
##  17- Set虽然可以数组去重，但是它只能一次性去重数组里同级的所有内容，其下的子级都要解构出来成为同级才能去重 2-却不能--在数组里不停的一个一个加添的情况去重，因为Set会不停的 将每个当成子元素保存，形成很多嵌套
##  18- props里的数据如果是普通类型，则不允许对其直接修改操作，如赋值-增-删-改-查，因为它不会改变父组件的数据，2-如果是复杂类型-->则可以对其【增-删-改-查】-->但不能用=赋值这种方式修改  ====》一般也不会这么用，偶尔
##  19- 

