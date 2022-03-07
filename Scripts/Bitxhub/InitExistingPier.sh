cd ../../EthereumSetup/EtherPier$1

./pier --repo=pier$1 appchain register --name=ethereum --type=ether --consensusType POS --validators=pier$1/ether/config/ether.validators --desc="ethereum appchain for test" --version=1.0.0 


cd pier$1/RelayChain/

export LD_LIBRARY_PATH=$(pwd)
./bitxhub --repo ../../../build_solo client governance vote --id $2 --info approve --reason approve

./bitxhub --repo ../../../build_solo client governance proposals --type AppchainMgr

cd ../../

export LD_LIBRARY_PATH=$(pwd)

./pier --repo=pier$1 rule deploy --path=pier$1/ether/config/validating.wasm

./pier --repo=pier$1 start