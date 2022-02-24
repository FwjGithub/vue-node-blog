<template>
    <div>
        <el-dialog
            title="进行注册，请确认密码"
            :visible.sync="visible"
            center
            :before-close="handleClose"
            :modal-append-to-body="false"
        >
            <el-form :model="form">
                <el-form-item label="用户昵称：" :label-width="formLabelWidth">
                    <el-input
                        placeholder="请填写账号.."
                        v-model="form.username"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="用户密码：" :label-width="formLabelWidth">
                    <el-input
                        placeholder="请填写密码.."
                        show-password
                        v-model="form.password"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" :label-width="formLabelWidth">
                    <el-input
                        placeholder="请再次确认密码.."
                        show-password
                        v-model="form.passwordAgain"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="handleRegister"
                    >确 定</el-button
                >
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
        async handleRegister() {
            if (!this.form.username) {
                this.$message({
                    type: "warning",
                    message: "请填写昵称",
                });
                return;
            } else if (!this.form.password || !this.form.passwordAgain) {
                this.$message({
                    type: "warning",
                    message: "请填写及确认密码",
                });
                return;
            } else if (this.form.password !== this.form.passwordAgain) {
                this.$message({
                    type: "warning",
                    message: "两次填写密码不一致",
                });
                return;
            }
            // console.log("表单信息", this.form);
            const formData = {
                username: this.form.username,
                password: this.$md5(this.form.password),
                passwordAgain: this.$md5(this.form.passwordAgain),
            };
            const { data } = await this.$ajax.post(
                "/api/user/register",
                formData
            );
            console.log("登录返回结果：", data);
            if (!data.code) {
                this.$message({
                    type: "warning",
                    message: data.err,
                });
                return;
            }
            this.$message({
                type: "success",
                message: "注册成功，请登录",
            });
            this.form = {}
            this.handleClose();
        },
    },
    data() {
        return {
            // visible: this.isShowing,
            form: {
                name: "",
                password: "",
                passwordAgain: "",
            },
            formLabelWidth: "90px",
        };
    },
    mounted() {
        // console.log("挂载diolog", this.visible, this.isShowing);
    },
};
</script>

<style></style>
