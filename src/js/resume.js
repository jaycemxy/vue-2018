Vue.component('resume', {
    props: ['mode', 'displayResume'],
    data(){
        return {}
    },
    methods: {
        /* 增加技能 */
        addSkill() {
            this.resume.skills.push({
                name: '请填写技能名称',
                description: '请填写技能描述'
            })
        },
        /* 移除技能 */
        removeSkill(index) {
            this.resume.skills.splice(index, 1)
        },
        /* 增加项目 */
        addProject() {
            this.resume.projects.push({
                name: '项目名称',
                link: '预览链接',
                description: '项目描述'
            })
        },
        /* 移除项目 */
        removeProject(index) {
            this.resume.projects.splice(index, 1)
        },
    },
    template: `
    <div class="resume">
        <!-- 个人信息模块 -->
        <section class="profile">
            <h1>个人信息</h1>
            <p class="profile">
                <editable-span :disabled="mode === 'preview'" :value="displayResume.name" @edit="onEdit('name',$event)"></editable-span>
                |
                <editable-span :disabled="mode === 'preview'" :value="displayResume.weChat" @edit="onEdit('weChat',$event)"></editable-span>
                |
                <editable-span :disabled="mode === 'preview'" :value="displayResume.phone" @edit="onEdit('phone',$event)"></editable-span>
                |
                <editable-span :disabled="mode === 'preview'" :value="displayResume.email" @edit="onEdit('email',$event)"></editable-span>
                |
                <editable-span :disabled="mode === 'preview'" :value="displayResume.github" @edit="onEdit('github',$event)"></editable-span>
            </p>
        </section>

        <!-- 技能模块 -->
        <section class="skills">
            <h2>技能</h2>
            <ul>
                <li v-for="skill,index in displayResume.skills">
                    <editable-span class="name" :disabled="mode === 'preview'" :value="skill.name" @edit="onEdit('skills['+index+'].name', $event)"></editable-span>
                    <div class="description">
                        <editable-span :disabled="mode === 'preview'" :value="skill.description" @edit="onEdit('skills['+index+'].description', $event)"></editable-span>
                    </div>
                    <span class="remove" @click="removeSkill(index)" v-if="index >= 2 && mode === 'edit'">x</span>
                </li>
                <li v-if="mode === 'edit'" class="add">
                    <span @click="addSkill">添加技能项</span>
                </li>
            </ul>
        </section>

        <!-- 项目模块 -->
        <section class="projects">
            <h2>项目经历</h2>
            <ol>
                <li v-for="project,index in displayResume.projects">
                    <header>
                        <div class="start">
                            <h3 class="name">
                                <editable-span :disabled="mode === 'preview'" :value="project.name" @edit="onEdit('projects['+index+'].name', $event)"></editable-span>
                            </h3>
                            <span class="link">
                                <editable-span :disabled="mode === 'preview'" :value="project.link" @edit="onEdit('projects['+index+'].link', $event)"></editable-span>
                            </span>
                        </div>
                        <span class="remove" @click="removeProject(index)" v-if="index >= 2 && mode === 'edit'">x</span>
                    </header>
                    <p class="description">
                        <editable-span :disabled="mode === 'preview'" :value="project.description" @edit="onEdit('projects['+index+'].description', $event)"></editable-span>
                    </p>
                </li>
                <li v-if="mode === 'edit'" class="add">
                    <span @click="addProject">添加项目</span>
                </li>
            </ol>
        </section>
    </div>
    `
})
