let app = new Vue({
    el: '#app',
    data: {
        editingName: false,
        loginVisible: false,
        signUpVisible: false,
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
        /* 注册 */
        onLogin(e){
            console.log(this.login)
             AV.User.logIn(this.login.email, this.login.password).then(function (user) {
                 console.log(user)
             }, function (error) {
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
        /* 登录 */
        onSignUp(e){
            const user = new AV.User()
            user.setUsername(this.signUp.email)
            user.setPassword(this.signUp.password)
            user.setEmail(this.signUp.email)
            user.signUp().then(function (User) {
                console.log(user)
            }, function (error) {})
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
            let {id} = AV.User.current()
            let user = AV.Object.createWithoutData('User', id)
            user.set('resume', this.resume)
            user.save()
        }
    }
})
