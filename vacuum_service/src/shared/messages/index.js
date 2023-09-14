module.exports = {
    SUCCESS: {
        code: 200,
        message: "Success",
        type: "SUCCESS",
        success: true,
    },
    FAILURE: {
        code: 200,
        message: "Failed",
        type: "FAILURE",
        success: false,
    },
    DATA_NOT_FOUND: {
        code: 200,
        message: "Data not found",
        type: "FAILURE",
        success: false,
    },
    INTERNAL_SERVER_ERROR: {
        code: 500,
        message: "Internal server error",
        type: "INTERNAL_SERVER_ERROR",
        success: false,
    },
}