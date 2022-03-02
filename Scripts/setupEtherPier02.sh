cd ../EthereumSetup/EtherPier02


export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$(pwd)
./pier --repo=pier02 init

cd pier02
mkdir plugins 
mkdir ether 

sleep 5

cd ../BitXhubRelay/Ethereum/pier-client-ethereum/build/
cp eth-client ../../../../EthereumSetup/EtherPier02/pier02/plugins
cd ../
cp -r config ../../../EthereumSetup/EtherPier02/pier02/ether

cd ../../../Scripts/