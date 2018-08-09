/* 邮箱注册页面 */
window.SignUp = {
    data() {
            return {
                signUp: {
                    email: '',
                    password: ''
                },
            }
        },
    methods: {
        /* 注册 */
        onSignUp(e) {
            const user = new AV.User()
            this.$emit('signUp')
            user.signUp().then((user) => {
                alert('注册成功')
                user = user.toJSON()
                this.currentUser.objectId = user.objectId
                this.currentUser.email = user.email
                this.signUpVisible = false
            }, (error) => {
                alert(error.rawMessage)
            })
        },
        onClickLogin(e) {
            this.$emit('goToLogin')
        },
    },
    template: `
    <div class="signUp" v-cloak>
        <div class="signUpDiv">
            <div class="header">
                <h2>邮箱注册</h2>
                <router-link to="/">关闭</router-link>
            </div>
            <form class="signUpForm" @submit.prevent="onSignUp">
                <div class="inputField">
                    <label>邮箱</label>
                    <input type="text" v-model="signUp.email" placeholder="请输入你的邮箱地址">
                </div>
                <div class="inputField">
                    <label>设置密码</label>
                    <input type="password" v-model="signUp.password" placeholder="密码">
                </div>
                <button type="submit" class="signUpButton">注册</button>
            </form>
            <div class="footer">
                <label>已有账号 -> 返回</label>
                <router-link to="/login">登录</router-link>
            </div>
        </div>
    </div>
    `
}

/* 注册组件 */
Vue.component('sign-up', SignUp)
