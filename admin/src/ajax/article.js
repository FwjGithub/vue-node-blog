import axios from "axios";
import moment from "moment";

async function findByPage(condition) {
    const {data} =  await axios.get("/admin/article", {
        params: condition
    });
    if(!data.code) {
        console.warn(data.err)
    }
    // console.log("请求回来结构的data", data)
    data.data = data.data.map((art) => {
        art.cDate = moment(art.cDate).format("lll");
        return art;
    });
    // console.log("转换日期后data：",data)
    return data
}

export {
    findByPage
}