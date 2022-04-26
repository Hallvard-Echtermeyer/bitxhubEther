const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const { performance } = require('perf_hooks');

const MyBroker01 = require('../build/contracts/Broker.json');
const MyBroker02 = require('../../Ethereum02/build/contracts/Broker.json');

const MySwapper01 = require('../build/contracts/DataSwapper.json');
const MySwapper02 = require('../../Ethereum02/build/contracts/DataSwapper.json')



const address = '0xfBe29Cc66a5680Fbc0305f3A11369becc78AC945';
const privateKey = '3a733f78f96937987c4086ff380f19802e5b754e96db0fc215b9ee9e32d5007f';
const infuraUrl = 'wss://rinkeby.infura.io/ws/v3/43b36e4162f04775b91869b9fed5e5c8'; 

async function init2(){

    var myArray = [];

    var web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/43b36e4162f04775b91869b9fed5e5c8'));
    const brokerContract01 = new web3.eth.Contract(MyBroker01.abi, "0xBE1d4b2D250a270f690e1721FC0b719E3392bFdA");
    const dataSwapperContract01 = new web3.eth.Contract(MySwapper01.abi, "0x35B11a84Fcf60f290ccF21Da2aCbF1f360EdEa67");

    const brokerContract02 = new web3.eth.Contract(MyBroker02.abi, "0x2C25595DF2657E088bC2bB40963d599ebB9Aad70");
    const dataSwapperContract02 = new web3.eth.Contract(MySwapper02.abi, "0xd5EC0CCd902fb984Cd4481274D80DabccEFBE16c");

    brokerContract01.events.Timer()
    .on('data', function(event){
    console.log(`new event - sender: ${event.returnValues.where} and time is ${event.returnValues.time}`);
    myArray.push(event.returnValues.time)
    var start = new Date().getTime();
    console.log(start)
    }).on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
    console.log(`error`);
    });

    dataSwapperContract01.events.Timer()
    .on('data', function(event){
        console.log(`new event - sender: ${event.returnValues.where} and time is ${event.returnValues.time}`);
        myArray.push(event.returnValues.time)
        var start = new Date().getTime();
        console.log(start)
    }).on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
    console.log(`error`);
    });


    brokerContract02.events.Timer()
    .on('data', function(event){
    console.log(`new event - sender: ${event.returnValues.where} and time is ${event.returnValues.time}`);
    myArray.push(event.returnValues.time)
    var start = new Date().getTime();
    console.log(start)
    }).on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
    console.log(`error`);
    });

    dataSwapperContract02.events.Timer()
    .on('data', function(event){
        console.log(`new event - sender: ${event.returnValues.where} and time is ${event.returnValues.time}`);
        myArray.push(event.returnValues.time)
        var start = new Date().getTime();
        console.log(start)
    }).on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
    console.log(`error`);
    });
}

init2();