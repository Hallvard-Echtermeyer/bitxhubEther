
function RemoveSpace(){

    let abiJSON  =[
      {
        "constant": false,
        "inputs": [
          {
            "name": "key",
            "type": "string"
          }
        ],
        "name": "getData",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "destChainID",
            "type": "address"
          },
          {
            "name": "destAddr",
            "type": "string"
          },
          {
            "name": "key",
            "type": "string"
          }
        ],
        "name": "get",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "key",
            "type": "string"
          },
          {
            "name": "value",
            "type": "string"
          }
        ],
        "name": "set",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "key",
            "type": "string"
          },
          {
            "name": "value",
            "type": "string"
          }
        ],
        "name": "interchainSet",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "key",
            "type": "string"
          }
        ],
        "name": "interchainGet",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          },
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
    let abiString = JSON.stringify(abiJSON)

    console.log(abiString)

}


RemoveSpace()