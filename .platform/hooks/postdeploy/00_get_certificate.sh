#!/usr/bin/env bash
# Place in .platform/hooks/postdeploy directory
sudo certbot -n -d ec2-52-0-132-180.compute-1.amazonaws.com --nginx --agree-tos --email kirajanegirl@gmail.com
