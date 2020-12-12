module.exports = {
    Host: "localhost",
    USER: "rizal",
    PASSWORD: "0000",
    DB: "pendaftaran",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle:10000
    }
};