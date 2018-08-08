let app = new Vue({
    el: '#app',
    data: {
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
    },
    /* 通过displayResume函数判断当前模式是编辑或预览，从而展示不同模式下的resume */
    computed: {
        displayResume(){
            return this.mode === 'preview' ? this.previewResume : this.resume
        }
    },
    /* 监听当前Id变化展示相应的resume */
    watch: {
        'currentUser.objectId': function (newValue, oldValue) {
            if (newValue) {
                this.getResume(this.currentUser).then((resume)=> this.resume = resume)
            }
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
        getResume(user){
            var query = new AV.Query('User');
            return query.get(user.objectId).then((user)=> {
                let resume = user.toJSON().resume
                return resume
            }, (error)=> {
                // 异常处理
            });
        },
        /* 增加技能 */
        addSkill(){
            this.resume.skills.push({
                name: '请填写技能名称',
                description: '请填写技能描述'
            })
        },
        /* 移除技能 */
        removeSkill(index){
            this.resume.skills.splice(index, 1)
        },
        /* 增加项目 */
        addProject(){
            this.resume.projects.push({
                name: '项目名称',
                link: '预览链接',
                description: '项目描述'
            })
        },
        /* 移除项目 */
        removeProject(index){
            this.resume.projects.splice(index, 1)
        },
        /* 打印功能 */
        print(){
            window.print()
        }
    }
})


// 获取当前用户
let currentUser = AV.User.current()
if (currentUser) {
    app.currentUser = currentUser.toJSON()
    app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
    console.log('currentId: ' + app.currentUser.objectId)
    app.getResume(app.currentUser).then(resume => {
        app.resume = resume
    })
}

// 获取预览用户Id
let search = location.search
let regex = /user_id=([^&]+)/
let matches = search.match(regex)
let userId
if(matches){
    userId = matches[1]
    app.mode = 'preview'
    console.log('previewId: ' + userId)
    app.getResume({objectId: userId}).then(resume => {
        app.previewResume = resume
    })
}
