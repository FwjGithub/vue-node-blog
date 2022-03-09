<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
    methods: {
        async init() {
            const userId = localStorage.getItem("userId");
            if(!userId) {
                this.$route.path != "/" && this.$router.push('/')
                console.log("App..用户状态：未登录")
                return;
            }
            // const {data} = await this.$ajax.get('/api/user/' + userId)
            // if(!data.code) {
            //     console.log("App..用户状态：已登录获取用户信息失败")
            //     return
            // }
            // localStorage.setItem("isAdmin", data.data.isAdmin )
            // localStorage.setItem("isSuper", data.data.isSuperAdmin )
            
        }
    },
    mounted() {
        this.init();
    },
}
</script>
<style>
html,
body{
    margin: 0;
    font-size: 14px;
}

a{
    color: #3c3c3c;
}

#app{
    height: 100vh;
    width: 100%;
    /* overflow: hidden; */
}
.mb-20{
    margin-bottom: 20px;
}
</style>
