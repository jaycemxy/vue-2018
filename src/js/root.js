const routes = [
    {path: '/', component: window.App},
    {path: '/login', component: window.Login},
    {path: '/signUp', component: window.SignUp},
]

const router = new VueRouter({
    routes: routes
})

const root = new Vue ({
    router,
    data(){
        return {
            currentUser: {}
        }
    }
}).$mount('#root')


// let app = new Vue({
//     el: '#app',
//     /* 监听当前Id变化展示相应的resume */
//     watch: {
//         'currentUser.objectId': function (newValue, oldValue) {
//             if (newValue) {
//                 this.getResume(this.currentUser).then((resume)=> this.resume = resume)
//             }
//         }
//     },
// })


// // 获取当前用户
// let currentUser = AV.User.current()
// if (currentUser) {
//     app.currentUser = currentUser.toJSON()
//     app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
//     console.log('currentId: ' + app.currentUser.objectId)
//     app.getResume(app.currentUser).then(resume => {
//         app.resume = resume
//     })
// }

// // 获取预览用户Id
// let search = location.search
// let regex = /user_id=([^&]+)/
// let matches = search.match(regex)
// let userId
// if(matches){
//     userId = matches[1]
//     app.mode = 'preview'
//     console.log('previewId: ' + userId)
//     app.getResume({objectId: userId}).then(resume => {
//         app.previewResume = resume
//     })
// }
