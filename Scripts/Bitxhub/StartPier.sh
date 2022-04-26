#!/bin/bash

#First thing we need to do is delete the old version

cd ../../EthereumSetup/EtherPier$1/

rm -rf pier$1

export LD_LIBRARY_PATH=$(pwd)

./pier --repo=pier$1 init

cd pier$1

mkdir plugins
mkdir ether

rm -rf pier.toml

cd ../../../Scripts/Bitxhub/

cp eth-client ../../EthereumSetup/EtherPier$1/pier$1/plugins
cp -r config/ ../../EthereumSetup/EtherPier$1/pier$1/ether
cp -r RelayChain ../../EthereumSetup/EtherPier$1/pier$1


cd pier$1

cp pier.toml ../../../EthereumSetup/EtherPier$1/pier$1
cp account.key ../../../EthereumSetup/EtherPier$1/pier$1/ether/config
cp password ../../../EthereumSetup/EtherPier$1/pier$1/ether/config 
cp ethereum.toml ../../../EthereumSetup/EtherPier$1/pier$1/ether/config

#TODO Here we need to setup the new ChainIds ect 

cd ../../EthereumScripts

source script.sh $1

cd ../../EthereumSetup/EtherPier$1

export LD_LIBRARY_PATH=$(pwd)

./pier --repo=pier$1 appchain register --name=ethereum --type=ether --consensusType POS --validators=pier$1/ether/config/ether.validators --desc="ethereum appchain for test" --version=1.0.0 > ../../Scripts/Bitxhub/chainId.txt

cd ../../Scripts/EthereumScripts

node ChainId.js $1

cd ../Bitxhub

source InitPier.sh $1


./pier --repo=pier02 appchain register --name=ethereum --type=ether --consensusType POS --validators=pier02/ether/config/ether.validators --desc="ethereum appchain for test" --version=1.0.0