module.exports = {
    "type": "postgres",
    "host": "postgres-db",
    "port": 5432,
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DB,
    "synchronize": false,
    "entities": [
        "src/**/*.entity{.ts,.js}"
    ],
    "migrations": [
        "src/migration/**/*.ts"
    ],
    "cli": {
        "migrationsDir": "src/migration"
    }
};
