/* 账号登录页面 */
window.Login = {
    data() {
            return {
                login: {
                    email: '',
                    password: ''
                },
            }
        },
    methods: {
        /* 登录 */
        onLogin(e) {
            AV.User.logIn(this.login.email, this.login.password).then((user) => {
                user = user.toJSON()
                this.$emit('login', user)
                window.location.reload()
            }, (error) => {
                if (error.code === 211) {
                    alert('邮箱不存在')
                } else if (error.code === 210) {
                    alert('用户名和密码不匹配')
                }
            })
        },
        onClickSignUp() {
            this.$emit('goToSignUp')
        },
    },
    template: `
    <div class="login" v-cloak>
        <div class="loginDiv">
            <div class="header">
                <h2>账号登陆</h2>
                <router-link to="/">关闭</router-link>
            </div>
            <form class="loginForm" @submit.prevent="onLogin">
                <div class="email">
                    <label>
                        <div>
                            <i class="iconfont icon-user"></i>
                        </div>
                    </label>
                    <input placeholder="邮箱" type="text" v-model="login.email">
                </div>
                <div class="password">
                    <label>
                        <div>
                            <i class="iconfont icon-password"></i>
                        </div>
                    </label>
                    <input placeholder="密码" type="password" v-model="login.password">
                </div>
                <button type="submit">登陆</button>
            </form>
            <div class="footer">
                <label>还没有账号？点击 -> </label>
                <router-link to="/signUp">注册</router-link>
            </div>
        </div>
    </div>
    `
}

/* 注册组件 */
Vue.component('login', Login)
