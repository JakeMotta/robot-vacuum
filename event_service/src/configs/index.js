module.exports = {
    PORT: 3000,
    serviceName: "Event Service",
    dbUrl: process.env.DB_URL,

    // Would typically do this via TypeScript types
    jobStatus: {
        TO_DO: "TO_DO",
        IN_PROGRESS: "IN_PROGRESS",
        DONE: "DONE"
    }
}