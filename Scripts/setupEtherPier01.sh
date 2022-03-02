cd ../EthereumSetup/EtherPier01


export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$(pwd)
./pier --repo=pier01 init

cd pier01
mkdir plugins 
mkdir ether 

cd ../BitXhubRelay/Ethereum/pier-client-ethereum/build/
cp eth-client ../../../../EthereumSetup/EtherPier01/pier01/plugins
cd ../
cp -r config ../../../EthereumSetup/EtherPier01/pier01/ether

cd ../../../Scripts/