let app = new Vue({
    el: '#app',
    data: {
        editingName: false,
        loginVisible: false,
        signUpVisible: false,
        currentUser: {
            objectId: undefined,
            email: ''
        },
        resume: {
            name: 'yourName',
            weChat: 'weChatID',
            phone: '182xxxxxxxx',
            email: 'example@example.com',
            github: ' https://github.com/'
        },
        login: {
            email: '',
            password: ''
        },
        signUp: {
            email: '',
            password: ''
        },
    },
    methods: {
        onEdit(key, value) {
            this.resume[key] = value
        },
        /* 判断有没有获取到objectId来判断用户是否登录，从而显示或隐藏登出按钮 */
        hasLogin(){
            return !!this.currentUser.objectId
        },
        /* 登录 */
        onLogin(e){
            console.log(this.login)
             AV.User.logIn(this.login.email, this.login.password).then((user)=>{
                user = user.toJSON()
                this.currentUser.objectId = user.objectId
                this.currentUser.email = user.email
                this.loginVisible =false
             }, (error)=>{
                if(error.code === 211){
                    alert('邮箱不存在')
                }else if(error.code === 210){
                    alert('用户名和密码不匹配')
                }
             })
        },
        /* 登出 */
        onLogout(e){
            AV.User.logOut()
            alert('注销成功')
            window.location.reload()
        },
        /* 注册 */
        onSignUp(e){
            const user = new AV.User()
            user.setUsername(this.signUp.email)
            user.setPassword(this.signUp.password)
            user.setEmail(this.signUp.email)
            user.signUp().then((user) => {
                alert('注册成功')
                user = user.toJSON()
                this.currentUser.objectId = user.objectId
                this.currentUser.email = user.email
                this.signUpVisible = false
            }, (error)=> {
                alert(error.rawMessage)
            })
        },
        /* 点击保存按钮 */
        onClickSave(){
            let currentUser = AV.User.current()
            if(!currentUser){
                this.loginVisible = true
            }else{
                this.saveResume()
            }
        },
        /* 保存用户数据到leanCloud */
        saveResume(){
            let {objectId} = AV.User.current().toJSON()
            let user = AV.Object.createWithoutData('User', objectId)
            user.set('resume', this.resume)
            user.save().then(()=>{
                alert('信息保存成功')
            }, ()=> {
                alert('信息保存失败')
            })
        },
        /* 从leanCloud获取用户之前编辑过的数据到本地 */
        getResume(){
            var query = new AV.Query('User');
            query.get(this.currentUser.objectId).then((user)=> {
                let resume = user.toJSON().resume
                this.resume = resume
            }, (error)=> {
                // 异常处理
            });
        }
    }
})

let currentUser = AV.User.current()
if(currentUser){
    app.currentUser = currentUser.toJSON()
    app.getResume()
}
