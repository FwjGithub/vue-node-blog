<!--评论模块-->
<template>
    <div class="comment-container">
        <!-- <div class="position">首页 > 留言板</div> -->
        <el-breadcrumb class="position" separator-class="el-icon-arrow-right" >
            <el-breadcrumb-item :to="{ path: '/' }" > <i class="el-icon-location-outline"></i> 首页</el-breadcrumb-item>
            <el-breadcrumb-item>留言版</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="new-comment">
            <el-input
                type="textarea"
                :rows="3"
                ref="textarea"
                placeholder="留下你的建议吧.."
                v-model="newComment"
            >
            </el-input>
            <div class="commentsTotal">
                <p>
                    <i class="iconfont el-icon-chat-round"></i>
                    <span v-if="commentsTotal">
                        共 {{ commentsTotal }} 条 留 言
                    </span>
                    <span v-else> 暂 无 留 言 </span>
                </p>
                <el-button
                    class="send-msg"
                    type="primary"
                    size="small"
                    @click="handleNewComment"
                    >点击留言</el-button
                >
            </div>
        </div>
        <div class="comment" v-for="item in comments">
            <div class="info">
                <img
                    class="avatar"
                    :src="item.fromAvatar"
                    width="36"
                    height="36"
                />
                <div class="right">
                    <div class="name">{{ item.fromName }}</div>
                    <div class="date">{{ item.date }}</div>
                </div>
            </div>
            <div class="content">{{ item.content }}</div>
            <div class="control">
                <!-- <span
                    class="like"
                    :class="{ active: item.isLike }"
                    @click="likeClick(item)"
                >
                    <i class="iconfont el-icon-star-on"></i>
                    <span class="like-num">{{
                        item.likeNum > 0 ? item.likeNum + "人赞" : "赞"
                    }}</span>
                </span> -->
                <span class="comment-reply" @click="showCommentInput(item)">
                    <i class="iconfont el-icon-s-comment"></i>
                    <span>回复</span>
                </span>
            </div>
            <div class="reply">
                <div class="item" v-for="reply in item.reply">
                    <div class="reply-content">
                        <span class="from-name">{{ reply.fromName }}</span
                        ><span>: </span>
                        <span
                            class="to-name"
                            v-if="reply.toName !== reply.fromName"
                            >@{{ reply.toName }}</span
                        >
                        <span class="to-name" v-else></span>
                        <span> {{ reply.content }} </span>
                    </div>
                    <div class="reply-bottom">
                        <span>{{ reply.date }}</span>
                        <span
                            class="reply-text"
                            @click="showCommentInput(item, reply)"
                        >
                            <i class="iconfont el-icon-s-comment"></i>
                            <span>回复</span>
                        </span>
                    </div>
                </div>
                <div
                    class="write-reply"
                    v-if="item.reply.length > 0"
                    @click="showCommentInput(item)"
                >
                    <i class="el-icon-edit"></i>
                    <span class="add-comment">补充一下</span>
                </div>
                <transition name="fade">
                    <div class="input-wrapper" v-if="showItemId === item._id">
                        <el-input
                            class="gray-bg-input"
                            v-model="replyComment"
                            type="textarea"
                            :rows="3"
                            autofocus
                            :placeholder="replyHolder"
                        >
                        </el-input>
                        <div class="btn-control">
                            <span class="cancel" @click="cancel">取消</span>
                            <el-button
                                class="confirm"
                                type="primary"
                                size="small"
                                @click="commitReply"
                                >发表</el-button
                            >
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <el-pagination
            :page-size="searchCondition.limit"
            layout="prev, pager, next, jumper"
            :total="commentsTotal"
            :current-page="searchCondition.page"
            @current-change="handleChange"
            @prev-click="handleChange"
            @next-click="handleChange"
        ></el-pagination>
    </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
export default {
    components: {},
    data() {
        return {
            articleId: "",
            replyComment: "",
            replyHolder: "给博主提些建议...",
            showItemId: "",
            newComment: "",
            username: localStorage.getItem("username"),
            userId: localStorage.getItem("userId"),
            comments: [
                {
                    id: "comment0001", //主键id
                    date: "2018-07-05 08:30", //评论时间
                    articleId: "621768249314b139fc29886f", //文章的id
                    fromId: "errhefe232213", //评论者id
                    fromName: "犀利的评论家", //评论者昵称
                    fromAvatar:
                        "http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg", //评论者头像
                    likeNum: 3, //点赞人数
                    content: "非常靠谱的程序员", //评论内容
                    reply: [
                        //回复，或子评论
                        {
                            id: "34523244545", //主键id
                            commentId: "comment0001", //父评论id，即父亲的id
                            fromId: "observer223432", //评论者id
                            fromName: "夕阳红", //评论者昵称
                            fromAvatar:
                                "https://wx4.sinaimg.cn/mw690/69e273f8gy1ft1541dmb7j215o0qv7wh.jpg", //评论者头像
                            toId: "errhefe232213", //被评论者id
                            toName: "犀利的评论家", //被评论者昵称
                            toAvatar:
                                "http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg", //被评论者头像
                            content: "赞同，很靠谱，水平很高", //评论内容
                            date: "2018-07-05 08:35", //评论时间
                        },
                        {
                            id: "34523244545",
                            commentId: "comment0001",
                            fromId: "observer567422",
                            fromName: "清晨一缕阳光",
                            fromAvatar:
                                "http://imgsrc.baidu.com/imgad/pic/item/c2fdfc039245d688fcba1b80aec27d1ed21b245d.jpg",
                            toId: "observer223432",
                            toName: "夕阳红",
                            toAvatar:
                                "https://wx4.sinaimg.cn/mw690/69e273f8gy1ft1541dmb7j215o0qv7wh.jpg",
                            content: "大神一个！",
                            date: "2018-07-05 08:50",
                        },
                    ],
                },
                {
                    id: "comment00012", //主键id
                    date: "2018-07-05 08:30", //评论时间
                    articleId: "621768249314b139fc29886f", //文章的id
                    fromId: "errhefe232213", //评论者id
                    fromName: "犀利的评论家", //评论者昵称
                    fromAvatar:
                        "http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg", //评论者头像
                    likeNum: 3, //点赞人数
                    content: "非常靠谱的程序员", //评论内容
                    reply: [
                        //回复，或子评论
                        {
                            id: "345232445452", //主键id
                            commentId: "comment0001", //父评论id，即父亲的id
                            fromId: "observer223432", //评论者id
                            fromName: "夕阳红", //评论者昵称
                            fromAvatar:
                                "https://wx4.sinaimg.cn/mw690/69e273f8gy1ft1541dmb7j215o0qv7wh.jpg", //评论者头像
                            toId: "errhefe232213", //被评论者id
                            toName: "犀利的评论家", //被评论者昵称
                            toAvatar:
                                "http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg", //被评论者头像
                            content: "赞同，很靠谱，水平很高", //评论内容
                            date: "2018-07-05 08:35", //评论时间
                        },
                        {
                            id: "345232445452",
                            commentId: "comment0001",
                            fromId: "observer567422",
                            fromName: "清晨一缕阳光",
                            fromAvatar:
                                "http://imgsrc.baidu.com/imgad/pic/item/c2fdfc039245d688fcba1b80aec27d1ed21b245d.jpg",
                            toId: "observer223432",
                            toName: "夕阳红",
                            toAvatar:
                                "https://wx4.sinaimg.cn/mw690/69e273f8gy1ft1541dmb7j215o0qv7wh.jpg",
                            content: "大神一个！",
                            date: "2018-07-05 08:50",
                        },
                    ],
                },
                {
                    id: "comment0002",
                    date: "2018-07-05 08:30",
                    articleId: "621768249314b139fc29886f",
                    fromId: "errhefe232213",
                    fromName: "毒蛇郭德纲",
                    fromAvatar:
                        "http://ww1.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2q2p8pj30v90uzmzz.jpg",
                    likeNum: 0,
                    content: "从没见过这么优秀的人",
                    reply: [],
                },
            ],
            commentsTotal: 0,
            searchCondition: {
                page: 1, //当前页
                limit: 5, //每页
            },
        };
    },
    computed: {},
    methods: {
        /**
         * 点赞
         */
        likeClick(item) {
            if (item.isLike === null) {
                Vue.$set(item, "isLike", true);
                item.likeNum++;
            } else {
                if (item.isLike) {
                    item.likeNum--;
                } else {
                    item.likeNum++;
                }
                item.isLike = !item.isLike;
            }
        },

        /**
         * 点击取消按钮
         */
        cancel() {
            this.showItemId = "";
        },

        /**
         * 提交评论
         */
        async commitReply() {
            const replyData = {
                articleId: this.articleId,
                commentId: this.showItemId,
                reply: {
                    fromId: this.userId,
                    fromName: this.username,
                    content: this.replyComment,
                    toId: this.replyToId,
                    toName: this.replyToName,
                    date: Date.now(),
                },
            };
            const { data } = await this.$ajax.post(
                "/api/comment/reply",
                replyData
            );
            if (!data.data.ok) {
                this.$message("回复失败");
                console.error("回复失败原因：", data);
                return;
            }
            // console.log("fanhui :", data);
            this.init();
        },

        /**
         * 点击评论按钮显示输入框
         * item: 当前大评论
         * reply: 当前回复的评论
         */
        showCommentInput(item, reply) {
            console.log("huifu:", reply);
            if (reply) {
                this.replyHolder = "@" + reply.fromName + " ";
                this.replyToId = reply.fromId;
                this.replyToName = reply.fromName;
            } else {
                this.replyHolder = "@" + item.fromName + " ";
                this.replyToId = item.fromId;
                this.replyToName = item.fromName;
            }

            // this.inputComment = "@" + item.fromName + " ";
            this.showItemId = item._id;
        },

        async handleNewComment() {
            // console.log("新评论", this.newComment, "用户id", this.userId, "文章id", this.articleId);
            // return
            if(!localStorage.getItem("username")) {
                this.$message("请先登录~");
                return;
            }
            const commentData = {
                articleId: this.articleId,
                fromId: this.userId,
                fromName: this.username,
                content: this.newComment,
            };
            const { data } = await this.$ajax.post(
                "/api/comment/add",
                commentData
            );
            // console.log(data);

            if (!data.code) {
                this.$message("发表评论失败");
                return;
            }
            console.log(data);
            this.init();
        },
        async handleChange(cur) {
            // console.log("改变页数", cur)
            if(cur === -1) {
                this.searchCondition.page -= cur;
            }else {
                this.searchCondition.page = cur;
            }
            this.init();
        },
        async init() {
            (this.username = localStorage.getItem("username")),
                (this.userId = localStorage.getItem("userId")),
                // 查询评论
                (this.newComment = "");
            this.replyComment = "";
            this.articleId = "message_board";
            this.showItemId = ""; //回复评论框隐藏
            const { data: commentData } = await this.$ajax.get(
                "/api/comment/" + this.articleId,
                {
                    params: this.searchCondition
                }
            );
            // console.log("评论数据", result);
            // console.log(commentData)
            if (!commentData.code) {
                this.$message(commentData.err);
                return;
            }

            this.comments = commentData.data.data.map((item) => {
                item.date = moment(item.date).format("lll");
                item.reply.length &&
                    item.reply.forEach((re) => {
                        re.date = moment(re.date).format("lll");
                    });
                return item;
            });
            // console.log(this.comments)
            this.commentsTotal = commentData.data.count;

            // console.log("this.comments", this.comments);
        },
    },
    mounted() {
        this.init();
    },
};
</script>

<style scoped lang="scss">
// @import "../../public/scss/index";
$color-main: #409eff;
$color-success: #67c23a;
$color-warning: #e6a23c;
$color-danger: #f56c6c;
$color-info: #909399;

$text-main: #303133;
$text-normal: #606266;
$text-minor: #909399; //次要文字
$text-placeholder: #c0c4cc;
$text-333: #333;

$border-first: #dcdfe6;
$border-second: #e4e7ed;
$border-third: #ebeef5;
$border-fourth: #f2f6fc;

$content-bg-color: #fff;

.comment-container {
    box-sizing: border-box;
    text-align: left;
    display: flex;
    flex-direction: column;
    .position {
        font-size: 20px;
        height: 6vh;
        line-height: 6vh;
        font-weight: 400!important;
    }
    .new-comment {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 2vh 0;
        // border-bottom: 1px solid rgba($color: #999, $alpha: 0.1);

        .commentsTotal {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            color: #808080;
            font-size: 18px;
            vertical-align: middle;
            padding: 2vh 0;
            margin-bottom: 1vh;
        }
    }

    .comment {
        display: flex;
        flex-direction: column;
        padding: 18px;
        border-bottom: 1px solid rgba($color: #123, $alpha: 0.1);
        background: #fff;

        .info {
            display: flex;
            align-items: center;
            .avatar {
                border-radius: 50%;
            }
            .right {
                display: flex;
                flex-direction: column;
                margin-left: 10px;
                .name {
                    font-size: 16px;
                    color: $text-main;
                    margin-bottom: 5px;
                    font-weight: 500;
                }
                .date {
                    font-size: 12px;
                    color: $text-minor;
                }
            }
        }
        .content {
            font-size: 16px;
            color: $text-main;
            line-height: 20px;
            padding: 10px 0;
        }
        .control {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: $text-minor;
            .like {
                display: flex;
                align-items: center;
                margin-right: 20px;
                cursor: pointer;
                &.active,
                &:hover {
                    color: $color-main;
                }
                .iconfont {
                    font-size: 14px;
                    margin-right: 5px;
                }
            }
            .comment-reply {
                display: flex;
                align-items: center;
                cursor: pointer;
                &:hover {
                    color: $text-333;
                }
                .iconfont {
                    font-size: 16px;
                    margin-right: 5px;
                }
            }
        }
        .reply {
            margin: 10px 0;
            border-left: 2px solid $border-first;
            .item {
                margin: 0 10px;
                padding: 10px 0;
                border-bottom: 1px dashed $border-third;
                .reply-content {
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    color: $text-main;
                    .from-name {
                        color: $color-main;
                    }
                    .to-name {
                        color: $color-main;
                        margin-left: 5px;
                        margin-right: 5px;
                    }
                }
                .reply-bottom {
                    display: flex;
                    align-items: center;
                    margin-top: 6px;
                    font-size: 12px;
                    color: $text-minor;
                    .reply-text {
                        display: flex;
                        align-items: center;
                        margin-left: 10px;
                        cursor: pointer;
                        &:hover {
                            color: $text-333;
                        }
                        .icon-comment {
                            margin-right: 5px;
                        }
                    }
                }
            }
            .write-reply {
                display: flex;
                align-items: center;
                font-size: 14px;
                color: $text-minor;
                padding: 10px;
                cursor: pointer;
                &:hover {
                    color: $text-main;
                }
                .el-icon-edit {
                    margin-right: 5px;
                }
            }
            .fade-enter-active,
            fade-leave-active {
                transition: opacity 0.5s;
            }
            .fade-enter,
            .fade-leave-to {
                opacity: 0;
            }
            .input-wrapper {
                padding: 10px;
                .gray-bg-input {
                    /*background-color: #67C23A;*/
                }
                .btn-control {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    padding-top: 10px;
                    .cancel {
                        font-size: 14px;
                        color: $text-normal;
                        margin-right: 20px;
                        cursor: pointer;
                        &:hover {
                            color: $text-333;
                        }
                    }
                    .confirm {
                        font-size: 14px;
                    }
                }
            }
        }
    }

    .el-pagination{
        margin-top: 1vh;
        align-self: flex-end;
    }
}
</style>
