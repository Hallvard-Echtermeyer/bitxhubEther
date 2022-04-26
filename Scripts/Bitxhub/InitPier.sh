cd ../../EthereumSetup/EtherPier$1/pier$1/RelayChain/

export LD_LIBRARY_PATH=$(pwd)
./bitxhub --repo ../../../build_solo client governance vote --id 0x0C0F90aE6E4ecd6EeB9614C0d4772944c0B31a28-0 --info approve --reason approve

./bitxhub --repo ../../../build_solo client governance proposals --type AppchainMgr

cd ../../

export LD_LIBRARY_PATH=$(pwd)

./pier --repo=pier$1 rule deploy --path=pier$1/ether/config/validating.wasm

./pier --repo=pier$1 start
