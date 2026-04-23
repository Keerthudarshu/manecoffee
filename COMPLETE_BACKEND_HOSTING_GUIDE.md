# 🚀 Complete Free Backend Hosting Guide

## Overview
This guide will help you deploy your Spring Boot backend for **FREE** using Render.com with a PostgreSQL database.

## 📋 Prerequisites
- ✅ GitHub repository with your Spring Boot project
- ✅ Render.com account (free tier)
- ✅ Basic understanding of environment variables

## 🗄️ File Structure on Your C: Drive
```
C:\Users\nishm\Mane Coffee\Neenu_Natural2-nishmithaNew\
├── backend/                    # Your Spring Boot application
│   ├── src/
│   ├── target/
│   ├── pom.xml                # Maven configuration
│   ├── build.sh               # Build script (fixes permissions)
│   ├── start.sh               # Startup script  
│   ├── render.yaml            # Render deployment config
│   └── mvnw                   # Maven wrapper
├── frontend/                   # Your React application
└── README.md
```

## 🛠️ Step-by-Step Deployment Process

### Step 1: Prepare Your Repository
1. **Commit all changes** to your GitHub repository:
   ```bash
   cd "C:\Users\nishm\Mane Coffee\Neenu_Natural2-nishmithaNew"
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

### Step 2: Deploy to Render.com

#### A. Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Connect your GitHub repository

#### B. Create PostgreSQL Database
1. In Render dashboard, click **"New +"**
2. Select **"PostgreSQL"**
3. Configure:
   - **Name**: `neenu-natural-db`
   - **Region**: Choose closest to you
   - **Plan**: **Free** (0$/month)
4. Click **"Create Database"**
5. **Wait 2-3 minutes** for database to be ready
6. **Save the connection details** (you'll need them)

#### C. Deploy Backend Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure deployment:

**Basic Settings:**
- **Name**: `neenu-natural-backend`
- **Region**: Same as database
- **Branch**: `main`
- **Root Directory**: `backend`

**Build & Deploy:**
- **Runtime**: `Java`
- **Build Command**: 
  ```bash
  chmod +x ./mvnw && ./mvnw clean package -DskipTests
  ```
- **Start Command**:
  ```bash
  java -Dserver.port=$PORT -jar target/Mane Coffee-0.0.1-SNAPSHOT.jar
  ```

**Plan:**
- **Instance Type**: `Free` (0$/month)

#### D. Configure Environment Variables
In the **Environment** section, add these variables:

```bash
SPRING_PROFILES_ACTIVE=prod
SPRING_DATASOURCE_URL=<Your PostgreSQL connection string>
SPRING_DATASOURCE_USERNAME=<Your PostgreSQL username>
SPRING_DATASOURCE_PASSWORD=<Your PostgreSQL password>
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_DATABASE_PLATFORM=org.hibernate.dialect.PostgreSQLDialect
```

**To get database connection details:**
1. Go to your PostgreSQL database in Render
2. Copy the **External Database URL**
3. It looks like: `postgres://username:password@hostname:port/database`

### Step 3: Deploy and Test

1. **Click "Create Web Service"**
2. **Wait 5-10 minutes** for initial deployment
3. **Monitor logs** for any errors
4. **Test your API**: Your backend will be available at:
   ```
   https://your-service-name.onrender.com
   ```
5. **Health check**: Visit:
   ```
   https://your-service-name.onrender.com/api/health
   ```

## 🔧 Configuration Files Explained

### 1. `render.yaml` (Render Configuration)
```yaml
services:
  - type: web
    name: neenu-natural-backend
    env: java
    buildCommand: "chmod +x ./mvnw && ./mvnw clean package -DskipTests"
    startCommand: "java -Dserver.port=$PORT -jar target/Mane Coffee-0.0.1-SNAPSHOT.jar"
```

### 2. `application-prod.properties` (Production Config)
- Uses PostgreSQL instead of MySQL
- Environment-based configuration
- Optimized logging for production

### 3. `build.sh` (Fixes Permission Issues)
```bash
#!/bin/bash
chmod +x ./mvnw
./mvnw clean package -DskipTests
```

## 🌐 Update Frontend Configuration

After backend deployment, update your frontend environment:

1. **Update Vercel Environment Variables**:
   ```bash
   VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
   ```

2. **Redeploy frontend** on Vercel

## 🐛 Troubleshooting Common Issues

### Issue 1: "Permission denied" for mvnw
**Solution**: Use the build script that sets execute permissions:
```bash
chmod +x ./mvnw && ./mvnw clean package -DskipTests
```

### Issue 2: Database Connection Failed
**Solutions**:
- ✅ Check environment variables are correctly set
- ✅ Ensure PostgreSQL database is running
- ✅ Verify connection string format
- ✅ Check database region matches service region

### Issue 3: Build Fails with Memory Issues
**Solution**: Use optimized JVM settings:
```bash
java -Xmx512m -Xms256m -jar target/Mane Coffee-0.0.1-SNAPSHOT.jar
```

### Issue 4: CORS Issues
**Solution**: Update `application-prod.properties`:
```properties
spring.web.cors.allowed-origins=https://your-frontend-domain.vercel.app
```

## 📊 Free Tier Limitations

### Render Free Tier:
- ✅ **750 hours/month** of runtime
- ✅ **512 MB RAM**
- ✅ **0.1 CPU**
- ❌ **Sleeps after 15 minutes** of inactivity
- ❌ **Cold starts** (30-60 seconds wake up)

### PostgreSQL Free Tier:
- ✅ **1 GB storage**
- ✅ **1 month data retention**
- ✅ **Automatic backups**
- ❌ **Limited connections**

## 🔄 Deployment Commands Summary

```bash
# 1. Navigate to project
cd "C:\Users\nishm\Mane Coffee\Neenu_Natural2-nishmithaNew"

# 2. Test build locally
cd backend
chmod +x ./mvnw
./mvnw clean package -DskipTests

# 3. Commit and push
git add .
git commit -m "Ready for Render deployment"
git push origin main

# 4. Deploy on Render.com (manual steps in web interface)
```

## ✅ Success Checklist

- [ ] GitHub repository updated with all configuration files
- [ ] PostgreSQL database created on Render
- [ ] Backend web service created and deployed
- [ ] Environment variables configured
- [ ] Health check endpoint responding
- [ ] Frontend updated with backend URL
- [ ] Full application flow tested

## 🎯 Next Steps After Deployment

1. **Monitor performance** using Render dashboard
2. **Set up monitoring** for uptime
3. **Configure domain name** (optional)
4. **Set up CI/CD** for automatic deployments
5. **Consider upgrading** to paid plan for better performance

## 💡 Cost Optimization Tips

1. **Use environment variables** for configuration
2. **Minimize build time** with optimized dependencies
3. **Use health checks** to prevent unnecessary restarts
4. **Monitor resource usage** in Render dashboard
5. **Consider hibernation** patterns for low-traffic periods

---

**🎉 Congratulations!** Your backend is now deployed for FREE on Render.com with a PostgreSQL database. Your application can handle real users and scale as needed!