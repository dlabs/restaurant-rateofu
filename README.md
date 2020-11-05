Don't panic and always carry a towel.


In order to run this project follow these steps: 


1. Run the composer install command from the shell in the project root directory

```
composer install
``` 

2. Copy the **.env.example_** file and create a new **.env** file in the root directory

3. Make sure you write the correct database configuration

4. Run the following command to generate a new APP_KEY in the .env file, which is important for encryption/decryption

```
php artisan key:generate  
```

5. Populate the database with testing user and restaurant data

```
php artisan migrate:fresh --seed
```

6. Now run the project with 

```
php artisan serve
```

7. The project should be available at **localhost:8000**
