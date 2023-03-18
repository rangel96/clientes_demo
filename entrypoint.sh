#!/bin/bash

echo "*** Upgrading libraries... ***"
npm install --save

echo "*** Start app ***"
ng serve --port 80 --host 0.0.0.0 --disable-host-check


while true
do
  sleep 20
done
