<template>
    <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
    >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
export default {
    props: {
        cb: {
            type: Function,
            default: () => {},
        },
    },
    data() {
        return {
            imageUrl: "",
        };
    },
    methods: {
        handleAvatarSuccess(res, file) {
            let reader = new FileReader(); //html5读文件
            reader.readAsDataURL(file.raw);
            reader.onload = () => {
                this.imageUrl = reader.result;
                // console.log(this.imageUrl);
                this.cb(this.imageUrl);
            };
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
    },
};
</script>

<style>
.avatar-uploader {
    height: 100px;
    line-height: 100px;
    box-sizing: border-box;
    border-radius: 6px;
    background: #ffeeff;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    width: 100px;
}
.avatar {
    width: 100px;
    height: 100px;
    display: block;
}
</style>
