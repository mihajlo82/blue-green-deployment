Blue-Green Deployment with Node.js, AWS EC2, and GitHub Actions
Project Overview
This project demonstrates a fully automated Blue–Green Deployment strategy for a Node.js application using AWS EC2, Application Load Balancer (ALB), Target Groups, and GitHub Actions CI/CD.

Blue–Green Deployment ensures zero downtime, safe releases, and rapid rollback capability by maintaining two identical environments (Blue and Green) and switching user traffic seamlessly.

Key Features
Blue-Green Deployment: Two EC2 environments (Blue & Green) hosting the same Node.js app.
Automated CI/CD: GitHub Actions workflow detects the idle environment and deploys the latest code automatically.
Load Balancer Traffic Switch: AWS ALB listener automatically points to the updated environment after deployment.
Zero Downtime Releases: Users are never affected while new code is deployed.
Optional Health Checks: Ensures that only healthy environments receive traffic.
Dynamic Flip-Flop Logic: Alternates deployment between Blue and Green environments.
Architecture
  ┌───────────────────────────┐
  │       GitHub Actions      │
  │  (CI/CD workflow triggers)│
  └────────────┬────────────┘
               │
               ▼
   ┌─────────────────────────┐
   │   IDLE EC2 instance     │
   │   (Blue or Green)       │
   └────────────┬────────────┘
                │ Deploy new code
                ▼
   ┌─────────────────────────┐
   │      Node.js App        │
   │     Managed by PM2      │
   └────────────┬────────────┘
                │
                ▼
  ┌───────────────────────────┐
  │  AWS ALB / Target Groups  │
  │  Switch traffic dynamically│
  └───────────────────────────┘
Technologies Used
Node.js 18
AWS EC2 (Blue and Green environments)
AWS Application Load Balancer & Target Groups
GitHub Actions for CI/CD
PM2 for process management
AWS CLI for ALB traffic switching
Workflow / Deployment Process
1. GitHub Actions Trigger
Workflow triggers on push to:
main branch → Blue environment
dev branch → Green environment
2. Detect LIVE Environment
Script checks ALB listener’s current target group.
Determines which environment is idle (BLUE or GREEN).
Sets:
DEPLOY_TARGET → Target group ARN for idle environment.
TARGET_EC2 → EC2 instance IP for idle environment.
3. Deploy Code to IDLE EC2
Connects via SSH/SCP using appleboy/ssh-action and appleboy/scp-action.
Pulls latest code from GitHub.
Installs Node.js dependencies.
Starts or reloads the Node.js app with PM2.
4. Health Check (Optional)
Verifies that the app on the idle EC2 responds with HTTP 200.
Prevents traffic switch if the environment is unhealthy.
5. Switch ALB Traffic
Updates AWS ALB listener to point to the idle environment using aws elbv2 modify-listener.
Ensures zero downtime deployment.
6. Flip-Flop Deployment
Next deployment automatically switches to the other environment.
This ensures continuous alternating deployments between Blue and Green.
GitHub Actions Workflow (deploy.yml)
Highlights of the workflow:

Checkout repo and set up Node.js.
Configure AWS credentials via GitHub Secrets.
Detect idle environment and dynamically set DEPLOY_TARGET and TARGET_EC2.
Deploy code to EC2, reload app with PM2.
Optionally perform a health check.
Switch ALB traffic to updated environment.
AWS Setup
Create two EC2 instances (Blue and Green) in the same VPC.
Create two Target Groups (Blue and Green) pointing to respective EC2 instances.
Create an Application Load Balancer and attach both target groups.
Set up an ALB listener on port 80/443.
Configure security groups to allow SSH from GitHub Actions and traffic from ALB.
Optional: Assign Elastic IPs for consistent public access to EC2 instances.
Environment Variables
Variable	Purpose
BLUE_TG_ARN	ARN of Blue Target Group
GREEN_TG_ARN	ARN of Green Target Group
LISTENER_ARN	ARN of ALB Listener
BLUE_EC2_IP	Public IP of Blue EC2
GREEN_EC2_IP	Public IP of Green EC2
GitHub Secrets	EC2_SSH_KEY, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
How to Run / Test
Push code to dev or main branch.
GitHub Actions automatically deploys to idle EC2.
ALB listener switches traffic to the updated environment.
Users are routed seamlessly to the new version.
Why This Project Stands Out
Demonstrates advanced DevOps skills: CI/CD, automated deployment, load balancing.
Shows AWS infrastructure knowledge: EC2, ALB, Target Groups.
Implements real-world deployment strategy (Blue–Green) with zero downtime.
Fully automated flip-flop deployments with rollback-ready design.
Author
Mihajlo Dimitric – DevOps / Full Stack Developer#blue green deployment
