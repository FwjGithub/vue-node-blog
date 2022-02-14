var moment = require("moment");
module.exports.getNow = function(){
    return +(moment.utc());
}