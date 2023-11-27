#!/bin/bash

# Install Node.js packages
npm install express path helmet cookie-parser mongoose bcryptjs concurrently

# Install MongoDB (For Ubuntu 20.04, adjust for other distributions)
sudo apt update
sudo apt install -y mongodb



echo "Installation complete. Make sure to start your MongoDB server before running your application."
