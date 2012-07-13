# RV-REDIRECT

A stateless app to handle all my domain redirects.

## Introduction

This application handles all incoming requests by looking at the database for a matching domain. If a domain is matched, it will send the user agent to the `redirect_uri` with a 301.

The app is hosted on heroku, the mysql credentials are set via environment variables. When you add the ClearDB Add-on to your heroku app, it will set the environment variable on production to use your database. For more info see [Setting up config vars](https://devcenter.heroku.com/articles/config-vars#setting_up_config_vars_for_a_deployed_application). All db credentials are stored in `process.env.CLEARDB_DATABASE_URL`. I used MySQL because ClearDB gives you several free backup strategies.

## How does it work?

You need to add a domain to the Heroku app to be able to redirect it. Using the [Heroku toolbelt](https://toolbelt.heroku.com/) you can do `heroku domains:add mydomain.com` to have Heroku point that domain to your app. Domains are managed via a MySQL table.

    -------------------------------------------------
    |     host      |         redirect_uri          |
    -------------------------------------------------
    |  mydomain.com | myotherdomain.com/landingpage |
    |  myapp.net    | myappgallery.com/myapp        |
    -------------------------------------------------

You can find an SQL dump in `rv-redirect_domains.sql`. I manage this table via [Sequel Pro](http://www.sequelpro.com/), there is no admin interface yet.

### DNS

Currently I'm setting up my domains with three A records pointing to:

- `174.129.212.2`
- `75.101.145.87`
- `75.101.163.44`

This is highly discouraged as it introduces a single point of failure on my side whenever Heroku decides to route their traffic differently. Read more about setting up custom domains here:

- [Avoid naked domains and DNS A records](https://devcenter.heroku.com/articles/avoiding-naked-domains-dns-arecords) 
- [Custom domains](https://devcenter.heroku.com/articles/custom-domains)

I will update this section once I find a setup that is more reliable.


## Install

### Requirements

- [Node](http://nodejs.org/) 0.4.7 (install via [nvm](https://github.com/creationix/nvm/))
- [npm](http://npmjs.org/) 1.0.x
- [Heroku toolbelt](https://toolbelt.heroku.com/)

Create an Heroku app and get yourself familiar with the requirements for running [Node on Heroku](https://devcenter.heroku.com/articles/nodejs). Run `$ npm install` to setup [node-mysql](https://github.com/felixge/node-mysql). Start the app using [Foreman](https://github.com/ddollar/foreman), which is bundled with the [Heroku toolbelt](https://toolbelt.heroku.com/).

Add the db addon: `$ heroku addons:add cleardb:ignite`. Run `$ heroku config` to get your credentials so you can connect your local environment to it. Connect to the database with your favorite MySQL tool and import the [sql structure](https://github.com/roelven/rv-redirect/blob/master/rv-redirect_domains.sql). When starting the app, export the environment variable to be sure foreman picks it up:

    $ CLEARDB_DATABASE_URL="mysql://USERNAME:PASSWORD@HOST/DATABASE" foreman start

## Deploying

1. `$ git push heroku master`
2. `$ heroku ps:scale web=1`
3. Profit!

### Logs

To see the app in action once it's in production, run:

    $ heroku logs -p web.1 --tail

Whenever a domain is recognized and redirected, the app will print it to the logs.

## Todo

- Refactor
- Add a counter per domain



