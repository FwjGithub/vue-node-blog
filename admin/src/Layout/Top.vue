<template>
    <div class="user">
        <div class="blog-title">
            杰克个人博客管理后台
        </div>
        <div>
            <div v-if="username">
                <el-avatar
                    class="avatar"
                    size="medium"
                    :src="circleUrl"
                ></el-avatar>
                <span class="username">{{ username }}</span>
                <el-button
                    class="exit-btn"
                    type="danger"
                    @click="handleExit"
                    size="mini"
                    >退出登录</el-button
                >
            </div>
            <div v-else>
                <span class="please-login">
                    你好,请登录
                </span>
                <el-button @click="handleLogin" type="success" size="mini"
                    >登录</el-button
                >
                <el-button @click="handleRegister" type="primary" size="mini"
                    >注册</el-button
                >
            </div>
            <login :isShowing="isShowLogin" :handleClose="handleClose"></login>
            <register
                :isShowing="isShowRegister"
                :handleClose="handleClose"
            ></register>
        </div>
    </div>
</template>

<script>
import Login from "../components/Login";
import Register from "../components/Register";
export default {
    data() {
        return {
            username: "",
            userId: "",
            isShowLogin: false,
            isShowRegister: false,
            circleUrl:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        };
    },
    components: {
        Register,
        Login,
    },
    methods: {
        async init() {
            this.curRoute = this.$route.path;
            this.username = localStorage.getItem("admin_username");
            this.userId = localStorage.getItem("admin_uesrId");
        },
        handleLogin() {
            this.isShowLogin = true;
        },
        handleRegister() {
            this.isShowRegister = true;
        },
        handleExit() {
            localStorage.removeItem("admin_username");
            localStorage.removeItem("admin_userId");
            localStorage.removeItem("isAdmin");
            localStorage.removeItem("isSuper");
            this.username = false;
            this.$router.go(0);
            // this.$route.path != "/" && this.$router.push("/");
        },
        handleClose(user) {
            if (user && user.username) {
                this.username = user.username;
                localStorage.setItem("admin_username", user.username);
                localStorage.setItem("admin_userId", user._id);
                user.isAdmin && localStorage.setItem("isAdmin", 1);
                user.isSuperAdmin && localStorage.setItem("isSuper", 1);
                this.$router.go(0);
                console.log("执行了if", user.username);
                // this.$route.path != "/" && this.$router.push("/");
            }
            this.isShowLogin = false;
            this.isShowRegister = false;
        },
    },
    computed: {
        curRoute: {
            get() {
                return this.$route.path;
            },
            set() {
                return this.$route.path;
            },
        },
    },
    mounted() {
        this.init();
    },
};
</script>

<style scoped>
.user {
    display: flex;
    width: calc(100vw-200px);
    box-sizing: border-box;
    padding: 0 1vw;
    justify-content: space-between;
    margin: 0 auto;
    height: 8vh;
    line-height: 8vh;
    /* background: rgba(255, 255, 255, 0.3); */
}
.username {
    margin: 0 20px;
    font-weight: 500;
    color: #3c3c3c;
}
.blog-title{
    font-size: 18px;
    font-weight: 500;
}
.please-login {
    font-size: 14px;
    font-weight: 500;
    margin-right: 2vw;
    color: rgb(102, 97, 97);
}
.avatar {
    vertical-align: middle;
}
.el-menu {
    height: 8vh !important;
}
</style>
