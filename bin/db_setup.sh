#!/usr/bin/env bash

./node_modules/.bin/sequelize db:create
./node_modules/.bin/sequelize db:migrate