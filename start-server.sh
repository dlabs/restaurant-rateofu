#!/bin/bash

# Create tables
python -m src.cmd.create_db_tables

# Insert default records
python -m src.cmd.insert_records

# Start server
uvicorn src.http:app --proxy-headers --host 0.0.0.0 --port 8083 --workers 1