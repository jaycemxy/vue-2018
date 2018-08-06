# vue-2018
## 验证用户（邮箱）是否存在
在methods中有一个onLogin方法，当你填入的邮箱不存在时，error.code === 211
![alt text](https://i.loli.net/2018/08/06/5b6856e2bc2f3.png)

当你填入的邮箱名与密码不匹配时，error.code === 210
![alt text](https://i.loli.net/2018/08/06/5b6856e9bd28f.png)

当输入的邮箱和密码都正确时，leancloud会将用户信息储存在sessionID中
![alt text](https://i.loli.net/2018/08/06/5b68595c6d9f7.png)

AV对象通过响应头将sessionID传给JS，JS又会将sessionID存入localStorage从而模拟了cookie
![alt text](https://i.loli.net/2018/08/06/5b685ad4c987b.png)
