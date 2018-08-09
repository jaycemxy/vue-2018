window.App = {
    template: `
    <div>
        <app-aside v-show="mode === 'edit'" :logout-visible="true" @logout="onLogout" @save="onClickSave"></app-aside>
        <main>
            <resume :mode="mode" :display-resume="displayResume"></resume>
        </main>
        <button class="exitPreview" @click="mode = 'edit'" v-if="mode === 'preview'">退出预览</button>
    </div>
    `,
    data() {
        return {
            editingName: false,
            loginVisible: false,
            signUpVisible: false,
            shareVisible: false,
            shareLink: '',
            previewUser: {
                objectId: undefined,
            },
            previewResume: {},
            currentUser: {
                objectId: undefined,
                email: ''
            },
            resume: {
                name: '姓名',
                weChat: 'weChatID',
                phone: '182xxxxxxxx',
                email: 'example@example.com',
                github: ' https://github.com/',
                skills: [
                    {name: '请填写技能名称', description: '请填写技能描述'},
                    {name: '请填写技能名称', description: '请填写技能描述'},
                    {name: '请填写技能名称', description: '请填写技能描述'},
                ],
                projects: [
                    {name:'项目名称', link:'预览链接', description: '项目描述'},
                    {name:'项目名称', link:'预览链接', description: '项目描述'},
                    {name:'项目名称', link:'预览链接', description: '项目描述'},
                ]
            },
            mode: 'edit'  //  'preview'
        }
    },
    methods: {
        /* 用户登录后再展示分享链接 */
        onShare(){
            if(this.hasLogin()) {
                this.shareVisible = true
            }else{
                alert('请先登录')
            }
        },
        /* 登录 */
        onLogin(user){
            this.currentUser.objectId = user.objectId
            this.currentUser.email = user.email
            this.loginVisible = false
        },
        /* 获取用户编辑内容 */
        onEdit(key, value) {
            let regex = /\[(\d+)\]/g
            key = key.replace(regex, (match, number)=> `.${number}`)
            keys = key.split('.')
            let result = this.resume
            for(let i=0; i<keys.length; i++){
                if(i === keys.length - 1){
                    result[keys[i]] = value
                }else{
                    result = result[keys[i]]
                }
            }
        },
        /* 判断有没有获取到objectId来判断用户是否登录，从而显示或隐藏登出按钮 */
        hasLogin(){
            return !!this.currentUser.objectId
        },
        /* 登出 */
        onLogout(e) {
            AV.User.logOut()
            alert('注销成功')
            window.location.reload()
        },
        /* 点击保存按钮 */
        onClickSave(){
            let currentUser = AV.User.current()
            if(!currentUser){
                this.$router.push('/login')
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
        getResume(user){
            var query = new AV.Query('User');
            return query.get(user.objectId).then((user)=> {
                let resume = user.toJSON().resume
                return resume
            }, (error)=> {
                // 异常处理
            });
        },
        /* 打印功能 */
        print(){
            window.print()
        }
    },
    /* 通过displayResume函数判断当前模式是编辑或预览，从而展示不同模式下的resume */
    computed: {
        displayResume(){
            return this.mode === 'preview' ? this.previewResume : this.resume
        }
    },
}

/* 注册组件 */
Vue.component = ('app', App)
