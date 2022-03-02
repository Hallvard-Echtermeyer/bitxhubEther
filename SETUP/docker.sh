sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository  "deb [arch=amd64] https://download.docker.com/linux/ubuntu  $(lsb_release -cs) stable"
sudo apt-get update

sleep 2

sudo apt-get update
sudo apt-get -y install docker-ce

sleep 4
sudo docker run hello-world


sudo usermod -aG docker ${USER}


sudo curl -L https://github.com/docker/compose/releases/download/1.17.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

echo "Below it should show Docker version and Docker-compose version"
docker-compose --version
docker --version

sudo chmod 666 /var/run/docker.sock