<template>
    <div>
        <el-dialog
            title="请使用管理员账号登录"
            :visible.sync="visible"
            center
            :before-close="handleClose"
            :modal-append-to-body="false"
        >
            <el-form :model="form">
                <el-form-item label="账号：" :label-width="formLabelWidth">
                    <el-input
                        placeholder="请输入账号"
                        v-model="form.username"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="密码：" :label-width="formLabelWidth">
                    <el-input
                        show-password
                        placeholder="请输入密码"
                        v-model="form.password"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="handleLogin">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "Login",
    props: {
        isShowing: Boolean,
        handleClose: Function,
    },
    computed: {
        visible: {
            get() {
                return this.isShowing;
            },
            set(isShow) {
                // this.handleClose(isShow)
                return this.isShowing;
            },
        },
    },
    methods: {
        async handleLogin() {
            // console.log("表单信息", this.form);
            if (!this.form.username) {
                this.$message({
                    type: "warning",
                    message: "请输入昵称",
                });
                return;
            } else if (!this.form.password) {
                this.$message({
                    type: "warning",
                    message: "请输入密码",
                });
                return;
            }
            const formData = {
                username: this.form.username,
                password: this.$md5(this.form.password),
            };
            const { data } = await this.$ajax.post("/api/user/login", formData);

            if (!data.code) {
                this.$message({
                    type: "warning",
                    message: data.err,
                });
                return;
            }
            
            if (!data.data.isAdmin) {
                this.$message({
                    type: "warning",
                    message: "登录失败，普通用户无法登录后台~"
                });
                console.log("user:", data.data)
                return
            }
            this.$message({
                type: "success",
                message: "登录成功，欢迎管理员" + data.data.username,
            });
            this.handleClose(data.data);
        },
    },
    data() {
        return {
            // visible: this.isShowing,
            form: {
                username: "",
                password: "",
            },
            formLabelWidth: "70px",
        };
    },
    mounted() {
        // console.log("挂载diolog", this.visible, this.isShowing);
    },
};
</script>

<style></style>
