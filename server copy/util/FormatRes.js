module.exports = function(status, msg, data){
    return JSON.stringify({
        status,
        msg,
        data
    });
}