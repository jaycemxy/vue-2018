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
        }
    },
    methods: {
        onEdit(key, value) {
            this.resume[key] = value
        },
        onClickSave(){
            let currentUser = AV.User.current()
            if(!currentUser){
                this.loginVisible = true
            }else{
                this.saveResume()
            }
            //   let User = AV.Object.extend('User')
            //   let user = new User()
            //   user.set('resume', this.resume)
            //   user.save().then(function () {
            //   }, function (error) {
            //   });
        },
        saveResume(){}
    }
})
