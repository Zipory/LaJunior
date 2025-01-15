class AppConfig{
}

class DevelopmentConfig extends AppConfig{
    public host = 'localhost';

    public username = 'root';

    public password = '123456';

    public database = 'nextJuni';

    public port = 4000;

    public siteUrl = 'http://localhost:3000';

    public databasePort = 3306;

    public isProduction = false;
}

class ProductionConfig extends AppConfig{
    public host = process.env.HOST || 'localhost';

    public username = process.env.MYSQL_USER;

    public password = process.env.MYSQL_PASSWORD;

    public database = process.env.MYSQL_DATABASE;

    public databasePort = process.env.MYSQL_PORT;

    public port = process.env.SERVER_PORT;

    public siteUrl = process.env.SITE_URL;

   
    public isProduction = true;
}

const appConfig = (process.env.NODE_ENV === 'production') ? new ProductionConfig() : new DevelopmentConfig();

export default appConfig;