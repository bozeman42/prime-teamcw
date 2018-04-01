# Cushman & Wakefield Marketing Application

An application that graphically displays real estate data through interactive maps and charts. The primary thing I would change for this application right now would be to re-work how the report date is selected. It currently gets the current date and tries to pull the report from the previous quarter. I would change it so that it gets the most recent data and bases the report on that so that the application will still work even if it is not fed new data.

## Built With

- AngularJS
- Express
- Node.js
- PostgreSQL
- Google Maps
- Google Analytics
- Mailchimp API
- Chart.js
- angular-file-upload
- fast-csv

## Getting Started

- Download or clone this repository
- Get a [Mailchimp API key](http://developer.mailchimp.com/documentation/mailchimp/)
- Get a [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key)
- Copy the `example.env` file and rename to `.env` add your [Mailchimp API key](http://developer.mailchimp.com/documentation/mailchimp/)

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)


### Installing

Steps to get the development environment running.
- Create a postgreSQL database with the name `teamcw`
- Set up database tables according to teamcw.sql file
- Run `npm install`
- Run `npm start` to start the server
- Navigate to [https://localhost:5000](https://localhost:5000)
- Default login is `superadmin` with password `teamcwadmin`
- If going to production, immediately set the superuser email, log out, and reset the password with the forgot password feature
- Log in with the superuser or admin account and navigate to the 'Upload Market Data' page and upload the property, dataset, and city csv files using your data or use the csv files in the test-data directory of this repository

## Documentation

- Here is this projects [scope document](https://docs.google.com/document/d/1FfKg5Itqu6kdVkCCw3OXBsRXonaJbQ-s_w922NXqDto/edit?usp=sharing)

### Completed Features

- [x] Display real estate market information 
- [x] Generate customized emails to send to CFOs and other potential clients
- [x] Track user behavior with Google Analytics

### Next Steps

- [ ] Remove time sensitivity of the application by getting most recent available report data instead of using the current date
- [ ] Ability to clear out old property data
- [ ] Add a time stamp to click-through tracking and the ability to delete click-through data
- [ ] Numerous other quality of life features

## Deployment

#### Heroku Prerequisite

1. Sign up for an account on [Heroku.com](https://www.heroku.com/)
2. Install Heroku CLI with these instructions [here](https://devcenter.heroku.com/articles/heroku-cli).
3. Authenticate by typing `heroku login` in Terminal or Command Prompt

#### Heroku Setup

> Note: Run the following commands from within your project folder.

1. In  terminal or command prompt, navigate to your project folder and type `heroku create`
2. Login in if prompted
3. Type `git remote -v` to ensure it added successfully
4. Type `git push heroku master`
5. Your website is now live! View it by running `heroku open`

#### Postgresql on Heroku

> Note: Make sure to have database set up with all tables locally first.

1. In terminal, type `heroku addons:create heroku-postgresql:hobby-dev` to set up Postgresql on your Heroku project
2. Next, type `heroku pg:push teamcw DATABASE_URL` to copy your teamcw database contents up to Heroku. 

## Authors

* Aaron Kvarnlov-Leverty
* David Beaudway
* Elvis Hang
* Xong Xiong
