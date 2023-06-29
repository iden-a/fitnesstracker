\echo 'Delete and recreate lifetracker db?'
\prompt 'Return for yes or control-C to cancel > ' answer

CREATE DATABASE lifetracker;
\connect lifetracker

\i lifetracker-schema.sql

