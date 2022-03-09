<template>
    <div class="home">
        <el-container>
            <el-aside width="200px">
                <Aside />
            </el-aside>
            <el-container>
                <el-header>
                    <Top />
                </el-header>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Aside from "./Aside.vue";
import Top from "./Top.vue";
export default {
    name: "Layout",
    components: {
        Aside,
        Top,
    },
};
</script>

<style>
.el-container {
    height: 100vh;
    width: 100%;
}
.el-aside {
    /* background-color: #d3dce6; */
    color: #333;
    height: 100vh;
    overflow: scroll;
}
.el-header {
    background: rgba(255, 255, 255, 0.3)!important;
    box-shadow: 1px 0px 1px gray;
}
.el-main {
    background-color: #e9eef3;
    color: #333;
    height: 100vh;
    overflow: scroll;
    box-sizing: border-box;
}
</style>
