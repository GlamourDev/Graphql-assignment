# Graphql-assignment

For database I used docker to set up localhost. I ran following command docker run -p 3306:3306 --name nodejs-mysql -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=userapp -d mysql:8.0

Use npm run migrate and npm run seed inside "server" folder accordingly to get data into SQL DB.