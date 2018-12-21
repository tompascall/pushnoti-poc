FROM mysql:5

ENV MYSQL_ROOT_PASSWORD 123
ENV MYSQL_DATABASE pn
ENV MYSQL_USER users_service
ENV MYSQL_PASSWORD 123
EXPOSE 3306

# ADD mysqld.cnf /etc/mysql/mysql.conf.d/mysqld.cnf
ADD setup.sql /docker-entrypoint-initdb.d
