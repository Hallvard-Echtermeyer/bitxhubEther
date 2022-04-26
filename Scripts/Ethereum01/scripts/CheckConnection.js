const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
//const MyContract = require('./build/contracts/MyContract.json');
const DataSwapper01 = require('../build/contracts/DataSwapper.json');
const Broker01 = require('../build/contracts/Broker.json')

const DataSwapper02 = require('../../Ethereum02/build/contracts/DataSwapper.json')
const Broker02 = require('../../Ethereum02/build/contracts/Broker.json')





const address = '0xfBe29Cc66a5680Fbc0305f3A11369becc78AC945';
const privateKey = '3a733f78f96937987c4086ff380f19802e5b754e96db0fc215b9ee9e32d5007f';
const infuraUrl = 'https://rinkeby.infura.io/v3/43b36e4162f04775b91869b9fed5e5c8'; 

const infuraUrl02 = 'https://rinkeby.infura.io/v3/731722c66a504aa6bcc25135f3dfc3f9'

const init = async () =>{

    //----------------------------- All the contract addresses, needs to be gotten from SetupInfo.txt-----------------------------
    let TransferAddress = '0xEbf86066f32f9d186c37eb4f1615ea47bae62564'
    let SwapperAddress = '0x35B11a84Fcf60f290ccF21Da2aCbF1f360EdEa67'
    
    let SecondTransferAddress = '0xaBA83D962fC4c6324d56530d0A6532521db7f7e7'
    let SecondSwapperAddress = '0xd5EC0CCd902fb984Cd4481274D80DabccEFBE16c'
    let SecondChainID = '0x0C0F90aE6E4ecd6EeB9614C0d4772944c0B31a28'
    //-----------------------------------------------------------------------------------------------------------------
    
    //--------------------------------------------- Init contracts of Ethereum01
    const provider01 = new Provider(privateKey, infuraUrl); 
    const web3 = new Web3(provider01);
    const networkId = await web3.eth.net.getId();

    const dataSwapper01 = new web3.eth.Contract(
        DataSwapper01.abi,
        DataSwapper01.networks[networkId].address
      );

    const broker01 = new web3.eth.Contract(
        Broker01.abi,
        Broker01.networks[networkId].address
    )

    //--------------------------------------------------------------------------------------------

    //--------------------------------------- Init contracts of Ethereum02
    const provider02 = new Provider(privateKey, infuraUrl02); 
    const web302 = new Web3(provider02);
    const networkId02 = await web302.eth.net.getId();

    const dataSwapper02 = new web3.eth.Contract(
        DataSwapper02.abi,
        DataSwapper02.networks[networkId02].address
      );

    const broker02 = new web3.eth.Contract(
        Broker02.abi,
        Broker02.networks[networkId02].address
    )
    //---------------------------------------------------------------------------------

    //Set the data for K V pair on both 01 and 02
    // const receipt01 = await dataSwapper01.methods.set("key", "value01").send({ from: address });
    // console.log(await dataSwapper01.methods.getData("key").call());

    // const receipt02 = await dataSwapper02.methods.set("key3", "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA \
    // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA \
    // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA \
    // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA \
    // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA \
    // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA \
    // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA \
    // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA \
    // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA \
    // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA").send({ from: address });
    // const receipt03 = await dataSwapper02.methods.set("key3", "value03").send({ from: address });
    // // const receipt04 = await dataSwapper02.methods.set("key4", "value04").send({ from: address });
    // // const receipt05 = await dataSwapper02.methods.set("key5", "value05").send({ from: address });
    // // const receipt06 = await dataSwapper02.methods.set("key6", "value06").send({ from: address });
    // // const receipt07 = await dataSwapper02.methods.set("key7", "value07").send({ from: address });
    // // const receipt08 = await dataSwapper02.methods.set("key8", "value08").send({ from: address });
    // // const receipt09 = await dataSwapper02.methods.set("key9", "value09").send({ from: address });
    //console.log(await dataSwapper02.methods.getData("key3").call());


    // await broker01.methods.register(SwapperAddress).send({ from: address });
    // await broker01.methods.register(TransferAddress).send({ from: address });
    // // await broker01.methods.register(SecondSwapperAddress).send({ from: address });
    // // await broker01.methods.register(SecondTransferAddress).send({ from: address });

    // // await broker02.methods.register(SwapperAddress).send({ from: address });
    // // await broker02.methods.register(TransferAddress).send({ from: address });
    // await broker02.methods.register(SecondSwapperAddress).send({ from: address });
    // await broker02.methods.register(SecondTransferAddress).send({ from: address });



    // const second = await dataSwapper01.methods.get(SecondChainID, SecondSwapperAddress, "key2").send({from: address});
    const second2 = await dataSwapper01.methods.get(SecondChainID, SecondSwapperAddress, "key3").send({from: address});
    // const second3 = await dataSwapper01.methods.get(SecondChainID, SecondSwapperAddress, "key4").send({from: address});
    // const second4 = await dataSwapper01.methods.get(SecondChainID, SecondSwapperAddress, "key5").send({from: address});
    // const second5 = await dataSwapper01.methods.get(SecondChainID, SecondSwapperAddress, "key6").send({from: address});
    // const second6 = await dataSwapper01.methods.get(SecondChainID, SecondSwapperAddress, "key7").send({from: address});
    // const second7 = await dataSwapper01.methods.get(SecondChainID, SecondSwapperAddress, "key8").send({from: address});
    // const second8 = await dataSwapper01.methods.get(SecondChainID, SecondSwapperAddress, "key9").send({from: address});

    // console.log(await dataSwapper01.methods.getData("key").call());
    // console.log(await dataSwapper01.methods.getData("key2").call());
    // console.log(await dataSwapper01.methods.getData("key3").call());
  
   
}

init()