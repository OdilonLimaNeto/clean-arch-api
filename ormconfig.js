const config = [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT || 5433,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    logging: true,
    synchronize: false,
    migrationsRun: false,
    entities: [
      './src/infra/db/postgres/**/entities/*-entity.ts'
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