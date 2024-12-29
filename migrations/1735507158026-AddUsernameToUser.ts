import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddUsernameToUser1735507158026 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'username',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.query(`UPDATE users
                             SET username = 'default_username'
                             WHERE username IS NULL`);

    await queryRunner.changeColumn(
      'users',
      'username',
      new TableColumn({
        name: 'username',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'username');
  }
}
