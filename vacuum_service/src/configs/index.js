module.exports = {
    PORT: 4000,
    serviceName: "Status Service",
    dbUrl: process.env.DB_URL,

    // Would typically do this via TypeScript types
    vacuumStatus: {
        BUSY: "BUSY",
        IDLE: "IDLE"
    }
}