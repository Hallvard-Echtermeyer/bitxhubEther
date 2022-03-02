export LD_LIBRARY_PATH=$(pwd)

./pier --repo=pier02 appchain register --name=ethereum --type=ether --consensusType POS --validators=pier02/ether/config/ether.validators --desc="ethereum appchain for test" --version=1.0.0

0x2De21c07EE0bCDfCe0598bEB446Cdbf83436AEFe-0

cd pier02/RelayChain

export LD_LIBRARY_PATH=$(pwd)
./bitxhub --repo ../../../build_solo client governance vote --id 0x2De21c07EE0bCDfCe0598bEB446Cdbf83436AEFe-0 --info approve --reason approve

./bitxhub --repo ../../../build_solo client governance proposals --type AppchainMgr

cd ../../

export LD_LIBRARY_PATH=$(pwd)

./pier --repo=pier02 rule deploy --path=pier02/ether/config/validating.wasm

./pier --repo=pier02 start
