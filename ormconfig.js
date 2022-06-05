const config = [
  {
    type: 'postgres',
    host: process.env.POSTGRES_DB_HOST,
    port: +process.env.POSTGRES_DB_PORT,
    username: process.env.POSTGRES_DB_USERNAME,
    password: process.env.POSTGRES_DB_PASSWORD,
    database: process.env.POSTGRES_DB_DATABASE,
    logging: true,
    synchronize: false,
    migrationsRun: false,
    entities: [
      './src/infra/db/postgres/**/*.entity.ts'
    ],
    migrations: [
      './src/infra/db/postgres/migrations/*.ts'
    ],
    cli: {
      migrationsDir: './src/infra/db/postgres/migrations'
    }
  }
]

module.exports = config