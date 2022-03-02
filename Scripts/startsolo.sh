
cd ../EthereumSetup/build_solo/

export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$(pwd)
./bitxhub --repo ./ start

cd ../../Scripts/