export LD_LIBRARY_PATH=$(pwd)

./pier --repo=pier01 appchain register --name=ethereum --type=ether --consensusType POS --validators=pier01/ether/config/ether.validators --desc="ethereum appchain for test" --version=1.0.0

0xcC40733440Afae94CebC55A25D498eD32961FC23-0

cd pier01/RelayChain

export LD_LIBRARY_PATH=$(pwd)
./bitxhub --repo ../../../build_solo client governance vote --id 0xcC40733440Afae94CebC55A25D498eD32961FC23-0 --info approve --reason approve

./bitxhub --repo ../../../build_solo client governance proposals --type AppchainMgr

cd ../../

export LD_LIBRARY_PATH=$(pwd)

./pier --repo=pier01 rule deploy --path=pier01/ether/config/validating.wasm

./pier --repo=pier01 start
