var app = new Vue({
    el: '#app',
    data: {
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
        }
    }
})
