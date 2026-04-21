#!/bin/bash

# Define Variables
PROJECT_DIR=~/lms-project-demo
IP_ADDRESS="Enter you ip"

echo "------------------------------------------"
echo "🚀 Starting Automated LMS Deployment"
echo "------------------------------------------"

# 1. Update Frontend API IP automatically
echo "🔹 Step 1: Syncing API IP to $IP_ADDRESS..."
sed -i "s|const API_BASE = .*|const API_BASE = 'http://$IP_ADDRESS:8080/api';|" $PROJECT_DIR/client/src/api.js

# 2. Build Frontend
echo "🔹 Step 2: Building React Assets..."
cd $PROJECT_DIR/client
npm run build

# 3. Clean and Sync to Backend
echo "🔹 Step 3: Moving assets to Spring Boot..."
rm -rf $PROJECT_DIR/server/src/main/resources/static/*
cp -r $PROJECT_DIR/client/dist/* $PROJECT_DIR/server/src/main/resources/static/

# 4. Build Java Backend
echo "🔹 Step 4: Packaging JAR file (Maven)..."
cd $PROJECT_DIR/server
mvn clean package -DskipTests

# 5. Restart the Process
echo "🔹 Step 5: Restarting Java Application..."
pkill -f 'java -jar'
nohup java -jar target/lms-0.0.1-SNAPSHOT.jar > log.txt 2>&1 &

echo "------------------------------------------"
echo "✅ DEPLOYMENT SUCCESSFUL!"
echo "🔗 URL: http://$IP_ADDRESS:8080"
echo "------------------------------------------"
