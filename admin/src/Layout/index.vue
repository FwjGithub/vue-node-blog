<template>
    <div class="home">
        <el-container>
            <el-aside width="200px">
                <Aside />
            </el-aside>
            <el-container>
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Aside from "./Aside.vue";
export default {
    name: "Layout",
    components: {
        Aside,
    },
};
</script>

<style>
.el-aside {
    background-color: #d3dce6;
    color: #333;
    height: 100vh;
}

.el-main {
    background-color: #e9eef3;
    color: #333;
    height: 100vh;
    overflow: scroll;
    box-sizing: border-box;
    padding: 50px;
}
</style>
