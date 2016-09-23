// # Ghost Configuration
// Setup your Ghost install for various environments
// Documentation can be found at http://support.ghost.org/config/

var path = require('path'),
    config;

var coding_services = JSON.parse(process.env.VCAP_SERVICES);

var coding_application = JSON.parse(process.env.VCAP_APPLICATION);

config = {
    // ### Production
    // When running Ghost in the wild, use the production environment
    // Configure your URL and mail settings here
    production: {
        url: 'http://' + coding_application.application_uris[0],
        mail: {
			transport: 'SMTP',
			options: {
				service: 'Mailgun',
				auth: {
				user: 'postmaster@sandbox0745f20b166744b5ab71b77b7cf7b8ff.mailgun.org',
				pass: 'a28a3971e3efe00d117ef466cd039ebc'
				},
			},
		},
		database: {
            client: 'mysql',
            connection: {
                host     : coding_services.mysql[0].credentials.hostname, //输入数据库地址
                user     : coding_services.mysql[0].credentials.username, //输入数据库用户
                password : coding_services.mysql[0].credentials.password, //输入你的 MySQL 密码
                database : coding_services.mysql[0].credentials.name, //输入数据库名称
                charset  : 'utf8'
            },
			dubug: false,
        },

        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '0.0.0.0',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: process.env.VCAP_APP_PORT || 3000,
        },
        
        
        fileStorage: false
        
        
    },

    // ### Development **(default)**
    development: {
        // The url to use when providing links to the site, E.g. in RSS and email.
        // Change this to your Ghost blogs published URL.
        url: 'http://localhost:2368',

        // Example mail config
        // Visit http://support.ghost.org/mail for instructions
        // ```
        //  mail: {
        //      transport: 'SMTP',
        //      options: {
        //          service: 'Mailgun',
        //          auth: {
        //              user: '', // mailgun username
        //              pass: ''  // mailgun password
        //          }
        //      }
        //  },
        // ```

        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-dev.db')
            },
            debug: false
        },
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '127.0.0.1',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '2368'
        },
        paths: {
            contentPath: path.join(__dirname, '/content/')
        }
    },

    // **Developers only need to edit below here**

    // ### Testing
    // Used when developing Ghost to run tests and check the health of Ghost
    // Uses a different port number
    testing: {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-test.db')
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    },

    // ### Testing MySQL
    // Used by Travis - Automated testing run through GitHub
    'testing-mysql': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'mysql',
            connection: {
                host     : '127.0.0.1',
                user     : 'root',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    },

    // ### Testing pg
    // Used by Travis - Automated testing run through GitHub
    'testing-pg': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'pg',
            connection: {
                host     : '127.0.0.1',
                user     : 'postgres',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    }
};

// Export config
module.exports = config;
