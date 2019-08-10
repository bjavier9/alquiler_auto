require('dotenv').config();

/**
 * Michael-Sembello Maniac
Just a steel town girl on a Saturday night
Lookin' for the fight of her life
In the real-time world no one sees her at all
They all say she's crazy
Locking rhythms to the beat of her heart
Changing woman into life
She has danced into the danger zone
When a dancer becomes a dance
 * 
 * 
 */

let CONFIG = {}

CONFIG.app = process.env.APP || 'dev';
CONFIG.port = process.env.PORT || '3000';

CONFIG.db_dialect = process.env.DB_DIALECT || 'mysql';
CONFIG.db_host = process.env.DB_HOST || 'localhost';
CONFIG.db_port = process.env.DB_PORT || '3306';
CONFIG.db_name = process.env.DB_NAME || 'name';
CONFIG.db_user = process.env.DB_USER || 'root';
CONFIG.db_password = process.env.DB_PASSWORD || '';
CONFIG.jwt_encryption = process.env.JWT_KEY || 'okey tienes q agregar el key en el .env';
CONFIG.jwt_expiration = process.env.JWT_EXP || '10000';

module.exports = CONFIG;