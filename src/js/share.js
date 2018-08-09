/* 点击分享页面 */
window.Share = {
    props: ['shareLink'],
    template: `
    <div class="share" v-cloak>
        <div class="content">
            <h2>复制下面链接分享给小伙伴吧～</h2>
            <div class="link">{{ shareLink }}</div>
        </div>
    </div>
    `
}

Vue.component('share', Share)
