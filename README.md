# vue-2018
## 给resume添加一个名为editable-span的组件
- 通过Vue.component全局注册一个组件，第一个参数是组件名(建议字母全小写且必须包含一个连字符)
```
Vue.component('my-component-name', { /* ... */ })
```

- 组件的data必须是一个函数
- 每个组件必须只有一个根元素，像这个项目中这样三个元素被包含在一个span的根元素下面
```
<span class="editableSpan">
    <span v-show="!editing">{{value}}</span>
    <input v-show="editing" type="text" v-bind:value="value" @input="triggerEdit">
    <button @click="editing = !editing">edit</button>
</span>
```

## 验证用户（邮箱）是否存在
在methods中有一个onLogin方法，当你填入的邮箱不存在时，error.code === 211
![alt text](https://i.loli.net/2018/08/06/5b6856e2bc2f3.png)

当你填入的邮箱名与密码不匹配时，error.code === 210
![alt text](https://i.loli.net/2018/08/06/5b6856e9bd28f.png)

当输入的邮箱和密码都正确时，leancloud会将用户信息储存在sessionID中
![alt text](https://i.loli.net/2018/08/06/5b68595c6d9f7.png)

AV对象通过响应头将sessionID传给JS，JS又会将sessionID存入localStorage从而模拟了cookie
![alt text](https://i.loli.net/2018/08/06/5b685ad4c987b.png)
## 使用v-cloak指令
当页面初始加载时，会发现注册登录页面闪现，虽然它们一开始默认visible是false的，但由于css的加载比JS要快，所以它们的样式已经加载完成会突然出现一下，随后JS才会将它们隐藏

v-cloak指令隐藏一个一开始不希望它出现的元素

1、在该元素身上添加v-cloak

2、在CSS中添加一个默认隐藏的属性，像下面这样：
```
div[v-cloak]{
    display: none;
}
```

3、CSS先加载后该元素被隐藏，随后JS加载，会删掉元素的v-cloak指令，一开始隐藏的元素又显示出来
## 获取currentUser遇到问题
问题描述：在登录过后想要拿到当前用户的ID和email时，发现我们无法获得currentUser的这些属性，这是因为vue在深入响应式原理中讲到它不能检测到对象属性的添加或删除，我们必须在data中声明currentUser的ID和email属性
![alt text](https://i.loli.net/2018/08/07/5b6921b512fa7.jpg)

在Vue文档中的解释：
![alt text](https://i.loli.net/2018/08/07/5b69212d5a6fa.png)
## 组件通信
儿子向上发出事件通知爸爸，在该子组件中methods下的$emit前面需要加this，而在template中$emit前面不需要加this
![alt text](https://i.loli.net/2018/08/08/5b6a8cde2d92b.jpg)
