const config = {
    db: {
        /* don't expose password or any sensitive info, done only for demo */
        host: "localhost",
        port: "6033",
        user: "sampleapiuser",
        password: "sampleapipasswd",
        database: "sampleapi",
        connectTimeout: 60000
    },
    listPerPage: 10,
};

module.exports = config;