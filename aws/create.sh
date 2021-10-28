#!/bin/bash

aws cloudformation create-stack --stack-name plantao-admin-front --template-body file://./front.yaml \
    --profile=plantao
aws cloudformation wait stack-create-complete --stack-name plantao-admin-front --profile=plantao
