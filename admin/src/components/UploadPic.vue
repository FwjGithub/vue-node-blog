<template>
    <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :on-change="handleChange"
        :auto-upload='false'
    >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
import axios from "axios";
export default {
    props: {
        cb: {
            type: Function,
            default: () => {},
        },
        poster: {
            type: String,
            default: () => "",
        },
    },
    data() {
        return {
            gotImg: ""
        }
    },
    computed: {
        imageUrl: {
            get() {
                return this.poster || this.gotImg;
            },
            set(img) {
                console.log("setter:", img);

                return this.gotImg || this.poster ;
            },
        },
    },
    methods: {
        handleChange(file) {
            let reader = new FileReader(); //html5读文件
            reader.readAsDataURL(file.raw);
            reader.onload = () => {
                this.gotImg = reader.result;
                // console.log(this.imageUrl);
                this.cb(this.imageUrl);
            };
        }
    }
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
