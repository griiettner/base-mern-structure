/**
 * Load confurations to be used across all tasks.
 * If you have your own way to set your workflow, here is the place
 * you should change. Avoid changes within gulpfile.js, unless you
 * know exactly what you are doing.
 * @name Default COnfiguration
 * @export Object
 */

const config = {};

config.metadata = {};
config.metadata.siteName = 'Mern Record';
config.metadata.prefix = 'MR';
config.metadata.localStorageName = `${config.metadata.prefix}_Metadata`;

/** ****************************************
 * Configuration base Path settings        *
 ***************************************** */
config.path = {};
config.path.base = process.cwd();
config.path.server = `${config.path.base}/server`;
config.path.models = `${config.path.server}/models`;
config.path.routes = `${config.path.server}/routes`;
config.path.client = `${config.path.base}/client`;
config.path.source = `${config.path.client}/src`;
config.path.build = `${config.path.client}/public`;

/** ****************************************
 * Configuration settings for Database     *
 ***************************************** */
/**
 * Start Database Config Object.
 * @name Database Configuration
 * @returns Object
 */
config.database = {};
config.database.type = 'mongodb';
config.database.driver = 'mongoose';
config.database.dbname = 'mern_shopping';
config.database.uri = `${config.database.type}://127.0.0.1/${config.database.dbname}`;

config.apiUrl = 'http://127.0.0.1:5000/api';

module.exports = { config };
