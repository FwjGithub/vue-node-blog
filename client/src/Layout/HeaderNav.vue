<template>
    <div class="nav">
        <div class="user">
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
                    >重新登录</el-button
                >
            </div>
            <div v-else>
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
        <el-menu
            :default-active="curRoute"
            class="el-menu-demo"
            mode="horizontal"
            router
        >
            <el-menu-item index="/"> 首页 </el-menu-item>
            <el-menu-item index="/Other"> 拓展页面 </el-menu-item>
            <el-menu-item index="/MessageBoard"> 留言板 </el-menu-item>
            <el-menu-item index="/About"> 关于 </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import Login from "../components/Login";
import Register from "../components/Register";
export default {
    name: "HeaderNav",
    components: {
        Login,
        Register,
    },
    data() {
        return {
            username: "",
            circleUrl:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            isShowLogin: false,
            isShowRegister: false,
        };
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
    methods: {
        handleLogin() {
            this.isShowLogin = true;
        },
        handleRegister() {
            this.isShowRegister = true;
        },
        handleExit() {
            localStorage.removeItem('username');
            localStorage.removeItem('userId');
            this.username = false
        },
        handleClose(user) {
            if (user && user.username) {
                this.username = user.username;
                localStorage.setItem('username', user.username)
                localStorage.setItem('userId', user._id)
                this.curRoute != "/" && this.$router.go(0);  
                console.log("执行了if", user.username)
            }

            this.isShowLogin = false;
            this.isShowRegister = false;
        },
    },
    mounted() {
        this.curRoute = this.$route.path;
        this.username = localStorage.getItem('username')
        console.log(this.curRoute, this.username);
    },
};
</script>

<style>
.nav {
    display: flex;
    width: 80vw;
    justify-content: space-between;
    margin: 0 auto;
    height: 8vh;
    line-height: 8vh;
}
.username {
    margin: 0 20px;
    font-weight: 500;
}
.avatar {
    vertical-align: middle;
}
.el-menu {
    height: 8vh !important;
}
</style>
