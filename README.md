# Cushman & Wakefield Marketing Application

An application that graphically displays real estate data through interactive maps and charts.

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
- copy the `example.env` file and rename to `.env` add your [Mailchimp API key](http://developer.mailchimp.com/documentation/mailchimp/)

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

High level list of items completed.

- [x] Display real estate market information 
- [x] Generate customized emails to send to CFOs and other potential clients

### Next Steps

Features that you would like to add at some point in the future.

- [ ] Ability to clear out old property data
- [ ] Numerous quality of life features

## Deployment

Add additional notes about how to deploy this on a live system

## Authors

* Aaron Kvarnlov-Leverty
* David Beaudway
* Elvis Hang
* Xong Xiong


## Acknowledgments

* Hat tip to anyone who's code was used
