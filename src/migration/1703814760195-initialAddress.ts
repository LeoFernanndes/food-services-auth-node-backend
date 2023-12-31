import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialAddress1703814760195 implements MigrationInterface {
    name = 'InitialAddress1703814760195';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE address_type AS ENUM('street', 'avenue');
            CREATE TYPE housing_type AS ENUM('house', 'apartment');
            CREATE TABLE "address" (
               "id" VARCHAR PRIMARY KEY NOT NULL,
               "created" TIMESTAMP DEFAULT now(),
               "updated" TIMESTAMP DEFAULT now(),
               "address_type" address_type,
               "address" VARCHAR,
               "number" INT,
               "number_complement" VARCHAR,
               "housing_type" VARCHAR,
               "zip_code" VARCHAR,
               "city" VARCHAR,
               "state" VARCHAR,
               "country" VARCHAR,
               "address_complement" VARCHAR
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "address"`);
    }
}