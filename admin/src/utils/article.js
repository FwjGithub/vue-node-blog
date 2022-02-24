/**
 * 
 * @param {vue的this} $vm 
 * @param {文章对象} article 
 */
function checkArticleNull($vm, article){
    if(!article.content || !article.html ||!article.title ||!article.poster || !article.tags.length) {
        $vm.$message({
            type: "warning",
            message: "请确认是否各部分已经完成"
        })
        console.log("此时的文章对象,", article)
        return false
    }
    return true
}

export default {
    checkArticleNull
}