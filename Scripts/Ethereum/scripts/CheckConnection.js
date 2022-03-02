const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
//const MyContract = require('./build/contracts/MyContract.json');
const MyContract = require('../build/contracts/DataSwapper.json');
const BrokerContract = require('../build/contracts/Broker.json')



const address = '0xfBe29Cc66a5680Fbc0305f3A11369becc78AC945';
const privateKey = '3a733f78f96937987c4086ff380f19802e5b754e96db0fc215b9ee9e32d5007f';
const infuraUrl = 'https://rinkeby.infura.io/v3/43b36e4162f04775b91869b9fed5e5c8'; 

const init = async () =>{

    let SwapperAddress = '0x883D9e99364dd124bbdADe97f79784c6a6502EC6'
    let SecondSwapperAddress = '0x7646af479533eA64A02A62262F77A315a0bFCE77'
    let SecondTransferAddress = '0x89d30eC44ab705303DeF2d0cF7725A8F68CBacD5'
    let TransferAddress = '0xb07e829cee93F0fB68B47bA0b50A3cE3c750d597'

    PierID = '0x2De21c07EE0bCDfCe0598bEB446Cdbf83436AEFe'

    const provider = new Provider(privateKey, infuraUrl); 
    const web3 = new Web3(provider);
    const networkId = await web3.eth.net.getId();

    const testContract = new web3.eth.Contract(
        MyContract.abi,
        MyContract.networks[networkId].address
      );

    const broker = new web3.eth.Contract(
        BrokerContract.abi,
        BrokerContract.networks[networkId].address
    )
    
    const receipt = await testContract.methods.set("key", "value4").send({ from: address });
    console.log(await testContract.methods.getData("key").call());

    // await broker.methods.register(SwapperAddress).send({ from: address });
    // await broker.methods.register(SecondSwapperAddress).send({ from: address });
    // await broker.methods.register(SecondTransferAddress).send({ from: address });
    // await broker.methods.register(TransferAddress).send({ from: address });
    // console.log(await testContract.methods.getCount().call());
    // console.log(receipt)

    const second = await testContract.methods.get(PierID, SecondSwapperAddress, "key").send({from: address});
   
}

init()