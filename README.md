# RV-REDIRECT

A stateless PHP app to handle all my redirects.

### To do what?

This application handles all incoming requests by looking at the database for a matching domain. If a domain is matched, it will send the user agent to the `redirect_uri` with a 301.

The app is hosted on heroku, the mysql credentials are set via environment variables. When you add the ClearDB Add-on to your heroku app, it will set the environment variable on production to use your database. For more info see [Setting up config vars](https://devcenter.heroku.com/articles/config-vars#setting_up_config_vars_for_a_deployed_application).

### Table structure:

    CREATE TABLE `domains` (
      `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
      `host` varchar(255) NOT NULL DEFAULT '',
      `redirect_uri` varchar(255) NOT NULL DEFAULT '',
      PRIMARY KEY (`id`)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

