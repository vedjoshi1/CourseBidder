#!/bin/bash

# List of dependencies
dependencies=(
  "axios@^0.24.0"
  "bcryptjs@^2.4.3"
  "cookie-parser@^1.4.6"
  "express@^4.17.1"
  "framer-motion@^6.3.0"
  "helmet@^4.6.0"
  "mongoose@^6.0.13"
  "next@latest"
  "react@^18.2.0"
  "react-dom@^18.2.0"
)

# Install dependencies
npm install "${dependencies[@]}"
npm install mongodb