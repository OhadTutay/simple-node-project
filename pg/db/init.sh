#!/bin/bash
set -e
export PGPASSWORD="docker";
psql -v ON_ERROR_STOP=1 --username "docker" --dbname "postgres" <<-EOSQL
  CREATE SCHEMA IF NOT EXISTS test;
  COMMIT;
EOSQL