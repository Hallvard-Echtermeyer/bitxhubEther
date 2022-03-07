cd ../../EthereumSetup/EtherPier$1/pier$1/RelayChain/

export LD_LIBRARY_PATH=$(pwd)
./bitxhub --repo ../../../build_solo client governance vote --id 0x190F798885FF6b32Bc44137d1841E0a9cCbC65f4-0 --info approve --reason approve

./bitxhub --repo ../../../build_solo client governance proposals --type AppchainMgr

cd ../../

export LD_LIBRARY_PATH=$(pwd)

./pier --repo=pier$1 rule deploy --path=pier$1/ether/config/validating.wasm

./pier --repo=pier$1 start
