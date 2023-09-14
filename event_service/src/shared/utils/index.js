module.exports = function () {
    return {
        consoleAtServerStart: (title, port) => {
            console.log("::::::::::::::::::::::::::: Server Status :::::::::::::::::::::::::::::::");
            console.log("Application name: %s", title);
            console.log("Started on: %s", new Date());
            console.log("Listening on port: %s", port);
        },
        parseHTTPResponse: (incomingData) => {
            if(incomingData?.data?.success) return incomingData?.data?.data;
            return incomingData?.data;
        },
        sendResponse: function (res, message, data, module) {
            const description = ""
                .concat(module ? module : "")
                .concat(" ")
                .concat(message.message)
                .toLowerCase()
                .trim();

            const responseMessage = {
                success: message.success,
                message: description.charAt(0).toUpperCase() + description.slice(1),
                type: message.type,
            };
            if (data) responseMessage.data = data;

            return res.status(message.code).json(responseMessage);
        },
    }
}