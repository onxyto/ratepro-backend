import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { faker } from '@faker-js/faker';

export class RateproDbInit1718454631340 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const uuid_ossp_extension = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  `;

    await queryRunner.query(uuid_ossp_extension);

    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'ean',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'image_url',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'storage_type',
            type: 'varchar',
          },
          {
            name: 'rating',
            type: 'bigint',
          },
          {
            name: 'recommended',
            type: 'boolean',
          },
          {
            name: 'deleted',
            type: 'boolean',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'nutritions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'quantity',
            type: 'decimal', // Change to decimal here
            precision: 5, // Adjust precision as needed (total digits)
            scale: 2, // Adjust scale as needed (decimal places)
          },
          {
            name: 'symbol',
            type: 'varchar',
          },
          {
            name: 'rating',
            type: 'varchar',
          },
          {
            name: 'deleted',
            type: 'boolean',
          },
          {
            name: 'product_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'nutritions',
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'ingredients',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'risk_rate',
            type: 'bigint',
          },
          {
            name: 'health_risk',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'scientific_sources',
            type: 'varchar',
          },
          {
            name: 'deleted',
            type: 'boolean',
          },
          {
            name: 'product_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'ingredients',
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'fullname',
            type: 'varchar',
          },
          {
            name: 'login',
            type: 'varchar',
          },
          {
            name: 'role',
            type: 'varchar',
          },
          {
            name: 'deleted',
            type: 'boolean',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'history_products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'product_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );
    const createUserHistoryForeignKey = `
        ALTER TABLE history_products
        ADD CONSTRAINT fk_user_history_id
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE SET NULL;
      `;

    const createProductHistoryForeignKey = `
        ALTER TABLE history_products
        ADD CONSTRAINT fk_product_history_id
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE SET NULL;
      `;

    // Create foreign keys after table creation
    await queryRunner.query(createUserHistoryForeignKey);
    await queryRunner.query(createProductHistoryForeignKey);

    await queryRunner.createTable(
      new Table({
        name: 'favorite_products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'product_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );
    const createUserFavoriteForeignKey = `
        ALTER TABLE favorite_products
        ADD CONSTRAINT fk_user_favorite_id
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE SET NULL;
      `;

    const createProductFavoriteForeignKey = `
        ALTER TABLE favorite_products
        ADD CONSTRAINT fk_product_favorite_id
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE SET NULL;
      `;

    // Create foreign keys after table creation
    await queryRunner.query(createUserFavoriteForeignKey);
    await queryRunner.query(createProductFavoriteForeignKey);

    await queryRunner.createTable(
      new Table({
        name: 'blacklist_products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'product_id',
            type: 'uuid',
          },
          {
            name: 'comment',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );
    const createUserBlackListForeignKey = `
        ALTER TABLE blacklist_products
        ADD CONSTRAINT fk_user_black_list_id
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE SET NULL;
      `;

    const createProductBlackListForeignKey = `
        ALTER TABLE blacklist_products
        ADD CONSTRAINT fk_product_black_list_id
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE SET NULL;
      `;

    // Create foreign keys after table creation
    await queryRunner.query(createUserBlackListForeignKey);
    await queryRunner.query(createProductBlackListForeignKey);

    // INSERT DUMP DATA
    // PRODUCTS

    async function insertProducts() {
      const insertPromises = [];
      for (let i = 0; i < 10; i++) {
        const product = {
          ean: faker.number.int(), // Generate random EAN
          name: faker.commerce.productName(),
          title: faker.commerce.productDescription(),
          type: 'FOOD',
          image_url:
            'https://elmercado.ma/wp-content/uploads/2023/12/Lindt-Excellence-Dark-85-Cocoa-100g.png',
          description: faker.commerce.productDescription(),
          storage_type: faker.commerce.productDescription(),
          rating: Math.floor(Math.random() * 101), // Random rating between 0 and 100 (adjust if needed)
          recommended: faker.datatype.boolean(),
          deleted: false,
        };

        insertPromises.push(
          queryRunner.query(
            `INSERT INTO products (ean, name, title, type, image_url, rating, recommended, deleted, description, storage_type)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
            [
              product.ean,
              product.name,
              product.title,
              product.type,
              product.image_url,
              product.rating,
              product.recommended,
              product.deleted,
              product.description,
              product.storage_type,
            ],
          ),
        );
      }

      await Promise.all(insertPromises);
    }

    await insertProducts();

    //NUTRITIONS
    const nutritionData = [
      {
        name: 'Protein',
        quantity: 10,
        symbol: 'g',
        rating: 4,
        deleted: false,
        product_id: null, // Replace with actual product ID
      },
      {
        name: 'Carbohydrates',
        quantity: 25,
        symbol: 'g',
        rating: 3,
        deleted: false,
        product_id: null, // Replace with actual product ID
      },
      {
        name: 'Fat',
        quantity: 5,
        symbol: 'g',
        rating: 2,
        deleted: false,
        product_id: null, // Replace with actual product ID
      },
      // Add more nutrition data objects here, including data for other product IDs
      {
        name: 'Vitamin C',
        quantity: 20,
        symbol: 'mg',
        rating: 5,
        deleted: false,
        product_id: null, // Replace with actual product ID (different product)
      },
      {
        name: 'Calcium',
        quantity: 150,
        symbol: 'mg',
        rating: 4,
        deleted: false,
        product_id: null, // Replace with actual product ID (different product)
      },
      // ... and so on
    ];

    async function insertNutritions() {
      const insertPromises = nutritionData.map((nutrition) => {
        return queryRunner.query(
          `INSERT INTO nutritions (name, quantity, symbol, rating, deleted, product_id)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            nutrition.name,
            nutrition.quantity,
            nutrition.symbol,
            nutrition.rating,
            nutrition.deleted,
            nutrition.product_id,
          ],
        );
      });

      await Promise.all(insertPromises);
    }

    await insertNutritions();

    // INGREDIENTS
    const ingredientData = [
      {
        name: 'Sugar',
        risk_rate: 3,
        health_risk: 'Increased risk of obesity and diabetes',
        description: 'A simple carbohydrate that provides energy but lacks essential nutrients.',
        scientific_sources:
          'https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/sugar/added-sugar',
        deleted: false,
        product_id: null, // Replace with actual product ID
      },
      {
        name: 'Sodium',
        risk_rate: 2,
        health_risk: 'High blood pressure and heart disease',
        description:
          'A mineral found in salt, essential in small amounts but excessive intake can be harmful.',
        scientific_sources: 'https://www.cdc.gov/salt/health-risks.htm',
        deleted: false,
        product_id: null, // Replace with actual product ID
      },
      {
        name: 'Saturated Fat',
        risk_rate: 4,
        health_risk: 'Increased risk of heart disease and stroke',
        description: 'A type of fat found in animal products and some processed foods.',
        scientific_sources:
          'https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/saturated-fat/art-20045656',
        deleted: false,
        product_id: null, // Replace with actual product ID (different product)
      },
      // Add more ingredient data objects here, including data for other product IDs
      {
        name: 'Whole Wheat Flour',
        risk_rate: 1,
        health_risk: 'Low risk, good source of fiber and nutrients',
        description:
          'A type of flour made from the entire wheat grain, containing more fiber and nutrients than refined flour.',
        scientific_sources: 'https://www.healthline.com/nutrition/whole-wheat-flour',
        deleted: false,
        product_id: null, // Replace with actual product ID (different product)
      },
      {
        name: 'Fruits',
        risk_rate: 0,
        health_risk: 'No significant health risks, rich in vitamins and antioxidants',
        description: 'A group of plant foods containing essential nutrients, vitamins, and fiber.',
        scientific_sources: 'https://www.cdc.gov/nutrition/everyone/healthy_eating/fruits.html',
        deleted: false,
        product_id: null, // Replace with actual product ID (different product)
      },
      // ... and so on
    ];

    async function insertIngredients() {
      const insertPromises = ingredientData.map((ingredient) => {
        return queryRunner.query(
          `INSERT INTO ingredients (name, risk_rate, health_risk, description, scientific_sources, deleted, product_id)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            ingredient.name,
            ingredient.risk_rate,
            ingredient.health_risk,
            ingredient.description,
            ingredient.scientific_sources,
            ingredient.deleted,
            ingredient.product_id,
          ],
        );
      });

      await Promise.all(insertPromises);
    }

    await insertIngredients();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('blacklist_products');
    await queryRunner.dropTable('favorite_products');
    await queryRunner.dropTable('history_products');
    await queryRunner.dropTable('users');
    await queryRunner.dropTable('ingredients');
    await queryRunner.dropTable('nutritions');
    await queryRunner.dropTable('products');
  }
}
