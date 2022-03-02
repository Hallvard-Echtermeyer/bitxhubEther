const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');

const MyContract = require('../build/contracts/Broker.json');



const address = '0xfBe29Cc66a5680Fbc0305f3A11369becc78AC945';
const privateKey = '3a733f78f96937987c4086ff380f19802e5b754e96db0fc215b9ee9e32d5007f';
const infuraUrl = 'wss://rinkeby.infura.io/ws/v3/731722c66a504aa6bcc25135f3dfc3f9'; 

async function init2(){
    var web3 = new Web3(new Web3.providers.WebsocketProvider(infuraUrl));
    const testContract = new web3.eth.Contract(MyContract.abi, "0xdF4F2A42e1d912674963Ff0eEDF8Ac1F30E0d46B");

    testContract.events.Logger()
    .on('data', function(event){
    console.log(`new event - transaction hash: ${event.transactionHash}`)
    console.log(`new event - sender: ${event.returnValues.message}`);
    //console.log(`new event - id: ${JSON.stringify(event)}`);
    //console.log(`new event - index: ${JSON.stringify(event.returnValues)}`);
    console.log()
    //console.log(`new event - location: ${web3.utils.hexToUtf8(event.returnValues.location)}`);
    }).on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
    console.log(`error`);
});
}

init2();