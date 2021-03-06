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
    let TransferAddress = '0x12B0A3550bfcfD3fEd54b11E91d1271f89fca628'
    let SwapperAddress = '0x8FcDa6B15a45402D7b9650A420925CbEcB258dF8'
    
    let SecondTransferAddress = '0x21d1939340C396f95b91f4Ae37271d402592EabA'
    let SecondSwapperAddress = '0x42dE462cFb9557D82C2d3A7E82c858DA3E941716'
    let SecondChainID = '0x2159e8Eb8591eC4cdbbe041999D3C22053f2Ede5'
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
    

    // const receipt02 = await dataSwapper02.methods.set("key9", "value09").send({ from: address });
    // const receipt03 = await dataSwapper02.methods.set("key10", "value10").send({ from: address });
    // const receipt04 = await dataSwapper02.methods.set("key11", "value11").send({ from: address });
    // const receipt05 = await dataSwapper02.methods.set("key12", "value12").send({ from: address });
    // const receipt06 = await dataSwapper02.methods.set("key13", "value013").send({ from: address });
    


    // await broker01.methods.register(SwapperAddress).send({ from: address });
    // await broker01.methods.register(TransferAddress).send({ from: address });
    // // await broker01.methods.register(SecondSwapperAddress).send({ from: address });
    // // await broker01.methods.register(SecondTransferAddress).send({ from: address });

    // // await broker02.methods.register(SwapperAddress).send({ from: address });
    // // await broker02.methods.register(TransferAddress).send({ from: address });
    // await broker02.methods.register(SecondSwapperAddress).send({ from: address });
    // await broker02.methods.register(SecondTransferAddress).send({ from: address });



    const second = await dataSwapper01.methods.get(SecondChainID, SecondSwapperAddress, "key12").send({from: address});

    // console.log(await dataSwapper01.methods.getData("key").call());
    // console.log(await dataSwapper01.methods.getData("key2").call());
    // console.log(await dataSwapper01.methods.getData("key3").call());
  
   
}

init()