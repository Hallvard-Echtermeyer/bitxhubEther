#!/bin/bash


if [ -z $SUDO_USER ]
then
    echo "===== Script need to be executed with sudo ===="
    echo "Change directory to 'setup'"
    echo "Usage: sudo ./caserver.sh"
    exit 0
fi

#source ./to_absolute_path.sh

echo "=======Set up go lang======"

# Get the version 1.13 from google
wget https://dl.google.com/go/go1.17.6.linux-amd64.tar.gz
act='ttyout="*"'
tar -xf go1.17.6.linux-amd64.tar.gz --checkpoint --checkpoint-action=$act -C /usr/local 
rm go1.17.6.linux-amd64.tar.gz

echo "export GOROOT=/usr/local/go" >> ~/.bashrc
echo "export GOPATH=/home/hallvard/go" >> ~/.bashrc
echo "export PATH=$PATH:/usr/local/go/bin:/home/hallvard/go/bin" >> ~/.bashrc
