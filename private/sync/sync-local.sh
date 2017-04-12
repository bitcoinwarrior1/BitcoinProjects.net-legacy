#!/bin/bash
export GOOGLE_APPLICATION_CREDENTIALS=client-id.json
./sync.py "$@"
