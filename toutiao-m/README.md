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
##  16-1- 开发过程中先查结果，先查报错信息，再查逻辑渲染顺序---【执行先后-有无异步--有无请求畅通....】
##  17- Set虽然可以数组去重，但是它只能一次性去重数组里同级的所有内容，其下的子级都要解构出来成为同级才能去重 2-却不能--在数组里不停的一个一个加添的情况去重，因为Set会不停的 将每个当成子元素保存，形成很多嵌套
##  18- props里的数据如果是普通类型，则不允许对其直接修改操作，如赋值-增-删-改-查，因为它不会改变父组件的数据，2-如果是复杂类型-->则可以对其【增-删-改-查】-->但不能用=赋值这种方式修改  ====》一般也不会这么用，偶尔
##  19- 路由里直接输访问路径时id 都是【红色或黑色是字符串型】-----而页面点击按钮跳转得到的路径里id值是 【绿色数字型】
##  20- 对于路由路径里的id值是 超大值时，1种方法：可以用this.$route.query.id 或是 this.$route.params.id 获得，可得到超大值的原值 -------  2种方法： 但是如果用props 属性获取它，会被改变，因为JS里有2的53正负范围限制，---这时得用 bigInt 方法，此时类型样式是Object ------ 【计算机传递的都是二进制 与 一般的json数据】 -----  【第三方包 --json-bigint】
### 21- // JSONBig 可以处理数据中超出 JavaScript 安全整数范围的问题
### console.log(JSONBig.parse(jsonStr))  把 JSON 格式的字符串转为 JavaScript 对象
###  使用的时候需要把 BigNumber 类型的数据转为字符串来使用
### console.log(JSONBig.parse(jsonStr).art_id.toString()) 
### console.log(JSONBig.stringify(JSONBig.parse(jsonStr))) // 把 JavaScript 对象 转为 JSON 格式的字符串转
## 22- 子传数据给父---@A="B=$event"  ---直接赋值
###     也可以用 v-module=“dataInfo”  代替父与子互传数据，但dataInfo 是共同使用的中间名称（事件名与属性名）-----  使用
###  model: {
###    prop: 'checked',
###    event: 'change'
###  },
###  props: {
###    checked: Boolean
###  },
###  -----下面是使用$event 接收子级的数据
###  v-on:input="$emit('input', $event.target.value)"
###  -----下面是使用冒号类似【别名方法】发送给父级的数据
###  this.$emit('update:title', newTitle)  表示title既是属性名又做子级传给父级的事件名被传值----和 v-model 一样
###  接收：
###  <text-document
###    v-bind:title="doc.title"
###    v-on:update:title="doc.title = $event"></text-document>
###  为了方便起见，我们为这种模式提供一个【缩写】，即 .sync 修饰符：
###  <text-document v-bind:title.sync="doc.title"></text-document>
###   ----------------------------------
###   用一个对象同时【设置多个 prop 】的时候，也可以将这个 .sync 修饰符和 v-bind 配合使用：
###   <text-document v-bind.sync="doc"></text-document>
###   ----------------------------------
##  23-  有时组件里发送请求时数据得到是 undefined---但数据明明返回成功 --- 【1-注意请求渲染的组件是否是异步的 2-它们或许有 v-if 等条件判断导致】----解决就是：在它们组件加载成功的范围内，来渲染要得到数据的组件，这里案例是：底部的
![Image text]('@/images/组件获取数据时为undefined是因为渲染组件-先后顺序-造成得不到-也可用第二方法监听解决--但前法更合理22年08月16日1235_1.jpg')
##  24-当url里的id值发请求前发现它值超出最大范围时--会自动修改和自动转码，前者可用json-bigint 插件处理，后者-自动转码是由于axios自动将参数是对象的改为[key=value]的格式，所以对超大值url转码，结果导致---id值--不准确，处理方法：传参时就给它--手动转为字符串格式---this.sourceId.toString(),即可处理此现象--这是简单高效法，在【请求拦截处】也可用【正则替换】处理【url地址值】---较麻烦--不一定成功--
##  25- 关于父组件某个数据--要【多次】传给【多个非直接】后代子组件使用，方法：用vue提供的--依赖注入--父级：provide:function(){return {articleId: this.articleId}} --- 与props 同级位置
##  各个子级使用接收：与props同级---inject:{articleId:{type:[Number, String, Object], default: null}} 使用类似props
##  上面这种注入依赖----只限于个别少量地方使用---多处推介vuex-更整洁合理
###   ----------------重点------------------
##  26-下面介绍的是【上传图片】
###  这里是获取上传图片的基本信息【大小-名字-类型-上传时间】--但没有此图片路径---可以结合H5新语法也能得到路径
###  const userImageInfo = this.$refs.userInfo.files[0]
###  console.log(userImageInfo)
###  下面是获取图片blob 格式 内容--【base64格式】--可以在发送请求头里看到---vant里面也提供了文件上传--和这里效果一样
###  const data = window.URL.createObjectURL###  
###  console.log(data) --blob:http://localhost:8080/444f1dca-a08a-4b9e-ac0d-c5869912ca7c
###  将blob 放到【 img :src=data 】就能展示出图片
###   ------------------重点----------------
###  这里是处理上传完毕后--将元素的【值value】清空---不是清空this.$refs.userInfo.files[0] = '', 否则报错，清空的原因是避免下次修改其它图片打不开选择文档
###  this.$refs.userInfo.value = ''
###  console.log(this.$refs.userInfo.files[0])---undefined
###   ----------------------------------
###  图片裁切器---cropperjs插件，纯原生代码，前端都可以用
第一步: npm i cropper
第二步：导入css 和 js 文件
import 'cropper/dist/cropper.css'
import Cropper from 'cropperjs/dist/cropper.min.js'
第三步：创建实例
先将 img 元素放到 div 元素里，再将img的宽设为100%，和display:block  即可，最后在mounted 生命周期里写下面几行即可
const image = this.$refs.image
    const cropper = new Cropper(image, {
      aspectRatio: 16 / 9,
      crop (event) {
        console.log(event.detail.x)
      }
    })
    console.log(cropper)
上面几步是操作显示图片在设备上成功完成裁切工具的实现---但不是裁切完成----加上--下面两种方式---是裁切后的选择
下面逻辑写到页面确定提交的方法里： 【详情见cropperjs的GitHub已收藏】
1-后端裁切时：只将数据传上去即可---this.cropper.getData()它会得到裁切的数据
2-前端裁切时：
      getCroppedCanvas 方法--不兼容低版本pc端
      const blob = this.userImage
      this.cropper.getCroppedCanvas().toBlob(async blob => {
        const formData = new FormData()
        formData.append('photo', blob)
        console.log(blob)
        // 调用上传接口：
        // const { data } = await updateUserImage(formData)
        // console.log(data) // 返回的就是裁切后的图片地址
###   ----------------------------------