import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1690994674712 implements MigrationInterface {
  name = 'InitialMigration1690994674712';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "character_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL, "name" character varying NOT NULL, "planet" character varying, CONSTRAINT "UQ_2010a28ce45b9df4717e56ca035" UNIQUE ("name"), CONSTRAINT "PK_c91141888053ae9129aadba40c1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c91141888053ae9129aadba40c" ON "character_entity" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "episode_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9a1f822893b4d58ce85d88e7962" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9a1f822893b4d58ce85d88e796" ON "episode_entity" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "character_entity_episodes_episode_entity" ("characterEntityId" uuid NOT NULL, "episodeEntityId" uuid NOT NULL, CONSTRAINT "PK_8c9af007488984723c525418fb7" PRIMARY KEY ("characterEntityId", "episodeEntityId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_044cf1e1b3a7feca2af0442d0f" ON "character_entity_episodes_episode_entity" ("characterEntityId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9ff059c2437ebd53283ad7a0e4" ON "character_entity_episodes_episode_entity" ("episodeEntityId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "character_entity_episodes_episode_entity" ADD CONSTRAINT "FK_044cf1e1b3a7feca2af0442d0fc" FOREIGN KEY ("characterEntityId") REFERENCES "character_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "character_entity_episodes_episode_entity" ADD CONSTRAINT "FK_9ff059c2437ebd53283ad7a0e47" FOREIGN KEY ("episodeEntityId") REFERENCES "episode_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "character_entity_episodes_episode_entity" DROP CONSTRAINT "FK_9ff059c2437ebd53283ad7a0e47"`,
    );
    await queryRunner.query(
      `ALTER TABLE "character_entity_episodes_episode_entity" DROP CONSTRAINT "FK_044cf1e1b3a7feca2af0442d0fc"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9ff059c2437ebd53283ad7a0e4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_044cf1e1b3a7feca2af0442d0f"`,
    );
    await queryRunner.query(
      `DROP TABLE "character_entity_episodes_episode_entity"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9a1f822893b4d58ce85d88e796"`,
    );
    await queryRunner.query(`DROP TABLE "episode_entity"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c91141888053ae9129aadba40c"`,
    );
    await queryRunner.query(`DROP TABLE "character_entity"`);
  }
}
