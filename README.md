# Ecommerce-The-back
  by Oswaldo O. Felix Thompson
  ![Github license](https://img.shields.io/badge/license-MIT-blue.svg)
  ## Table Of Contents
  * [Description](#description)
  * [Dependencies](#dependencies)
  * [Features](#features)
  * [API-Endpoints](#api-endpoints)
  * [Video](#video)
  * [Usage](#usage)
  * [Contact-Me](#contact-me)
  * [License](#license)

  https://opensource.org/licenses/MIT
  ## Description
  This is the backend applications for an Ecommerce project. It provides a RESTful API for managing products, categories, and tags.
  ## Dependencies
  dotenv, express, mysql2, Sequelize
  ## Features
  Products: The api allows you to perform CRUD operations (Create, Read, Update, Delete) on products. Each product has properties like name, price, stock and destroy.
  Categories: You can manage categories through the API. Categories are used to group products and provide better organization.
  Tags: The applocation supports tags, which can be assigned to products to describe their characteristics or attributed. Tags can be associated with multiple products.
  Relationships: The API establishes relationships between products, categories, and tags using foreignkey constraint sand association methods provided by Sequelize.
  Validation and Error Handling: The backend includes validation for request papyloads and error handling for handling various scenarios, such as invalid requests or database errors.
  ## API-Endpoints
  Products: `/api/products`
  Categories: `/api/categories`
  Tags: `/api/tags`
  ## Video
  [Untitled_ Jul 10, 2023 5_35 PM.webm](https://github.com/SuperFeeeelix/Ecommerce-The-back/assets/127154412/a346988a-413f-402f-9fe6-2ccaa5c5021b)

  
  ## Usage
  Node.js, Express.js, and Sequelize as the ORM for interacting with the MySql database
  1. Install the necessary dependencies by running `npm install`
  2. configure the database connection by providing the required environment variables in a `.env` file
  3. Run database migrations and seeders by executing `npm run seed` to create and populate the required database tables.
  4. Start the server by running `npm run start`

  Once the server is running, you can use a tool like insomia or postman to interact with the API endpoints.
  ## Contact-Me
  * Name - Oswaldo O. Felix Thompson
  * Email - oswaldo_felix@outlook.com
  * Github - [superfeeeelix](https://github.com/superfeeeelix/)

  ## License
      
      Licensed under the MIT license
