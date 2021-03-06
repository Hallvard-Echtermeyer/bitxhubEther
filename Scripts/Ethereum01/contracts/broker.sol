pragma solidity >=0.5.6;

contract Broker {
    // Only the contract in the whitelist can invoke the Broker for interchain operations.
    mapping(address => int64) whiteList;
    address[] contracts;
    address[] admins;

    event throwEvent(
        uint64 index,
        address to,
        address fid,
        string tid,
        string funcs,
        string args,
        string argscb,
        string argsrb
    );
    event LogInterchainData(bool status, string data);
    event LogInterchainStatus(bool status);

    address[] outChains;
    address[] inChains;
    address[] callbackChains;

    mapping(address => uint64) outCounter; // mapping from contract address to out event last index
    mapping(address => mapping(uint64 => uint256)) outMessages;
    mapping(address => uint64) inCounter;
    mapping(address => mapping(uint64 => uint256)) inMessages;
    mapping(address => uint64) callbackCounter;
    mapping(address => mapping(uint64 => string)) invokeError;
    mapping(address => mapping(uint64 => string)) callbackError;

    //Self implemented event for seeing what functions get called
    event Logger(string message);

    event Timer(string where, uint256 time);

    uint256 public count;

    //Simple functions to check that we get contact with the script
    function increment() external {
        emit Logger("the increment() function was called");
        count += 1;
    }

    // Authority control. Contracts need to be registered.
    modifier onlyWhiteList() {
        emit Logger("something happened WhiteList");
        require(whiteList[msg.sender] == 1, "Invoker are not in white list");
        _;
    }

    // Authority control. Only the administrator can audit the contract
    modifier onlyAdmin() {
        emit Logger("something happened only Admin");
        bool flag = false;
        for (uint256 i = 0; i < admins.length; i++) {
            if (msg.sender == admins[i]) {
                flag = true;
            }
        }
        if (flag) {
            revert();
        }
        _;
    }

    function initialize() public {
        emit Logger("something happened initialize");
        for (uint256 i = 0; i < inChains.length; i++) {
            inCounter[inChains[i]] = 0;
        }
        for (uint256 i = 0; i < outChains.length; i++) {
            outCounter[outChains[i]] = 0;
        }
        for (uint256 i = 0; i < callbackChains.length; i++) {
            callbackCounter[callbackChains[i]] = 0;
        }
        for (uint256 i = 0; i < contracts.length; i++) {
            whiteList[contracts[i]] = 0;
        }
        delete outChains;
        delete inChains;
        delete callbackChains;
    }

    // 0: auditting  1: approved  -1: refused
    function register(address addr) public {
        emit Logger("something happened register");
        whiteList[addr] = 1; //set register value to 1, so i can register data_swapper and transfer
    }

    function audit(address addr, int64 status) public returns (bool) {
        emit Logger("something happened audit ");
        if (status != -1 && status != 0 && status != 1) {
            return false;
        }
        whiteList[addr] = status;
        // Only approved contracts can be recorded
        if (status == 1) {
            contracts.push(addr);
        }
        return true;
    }

    function invokeInterchain(
        address srcChainID,
        uint64 index,
        address destAddr,
        bool req,
        bytes calldata bizCallData
    ) external payable {
        emit Logger("something happened invokeInterChain");
        require(whiteList[destAddr] == 1);
        invokeIndexUpdate(srcChainID, index, req, "");

        assembly {
            let ptr := mload(0x40)

            // ??????bizCallData???calldata????????????
            calldatacopy(ptr, 132, 32)
            let off := mload(ptr)

            // ??????bizCallData?????????
            calldatacopy(ptr, add(4, off), 32)
            let datasize := mload(ptr)

            // ???bizCallData?????????copy???ptr???????????????
            calldatacopy(ptr, add(36, off), datasize)

            // ??????????????????
            let result := call(
                gas(),
                destAddr,
                callvalue(),
                ptr,
                datasize,
                0,
                0
            )
            let size := returndatasize()
            returndatacopy(ptr, 0, size)

            switch result
            case 0 {
                revert(ptr, size)
            }
            default {
                log0(ptr, size)
                return(ptr, size)
            }
        }
    }

    function invokeIndexUpdate(
        address srcChainID,
        uint64 index,
        bool req,
        string memory err
    ) private {
        emit Timer("invokeIndexUpdate", block.timestamp);
        if (req) {
            require(inCounter[srcChainID] + 1 == index);
            markInCounter(srcChainID);
            if (
                keccak256(abi.encodePacked(err)) !=
                keccak256(abi.encodePacked(""))
            ) {
                invokeError[srcChainID][index] = err;
            }
        } else {
            // invoke callback or rollback
            require(callbackCounter[srcChainID] + 1 == index);
            markCallbackCounter(srcChainID, index);
            if (
                keccak256(abi.encodePacked(err)) !=
                keccak256(abi.encodePacked(""))
            ) {
                callbackError[srcChainID][index] = err;
            }
        }
    }

    function invokeIndexUpdateWithError(
        address srcChainID,
        uint64 index,
        bool req,
        string memory err
    ) public {
        emit Logger("something happened invokeIndexUpdateWithError");
        invokeIndexUpdate(srcChainID, index, req, err);
    }

    function emitInterchainEvent(
        address destChainID,
        string memory destAddr,
        string memory funcs,
        string memory args,
        string memory argscb,
        string memory argsrb
    ) public onlyWhiteList {
        emit Timer("emitInterchainEvent", block.timestamp);
        // Record the order of interchain contract which has been started.
        outCounter[destChainID]++;
        if (outCounter[destChainID] == 1) {
            outChains.push(destChainID);
        }
        outMessages[destChainID][outCounter[destChainID]] = block.number;

        // Throw interchain event for listening of plugin.
        emit throwEvent(
            outCounter[destChainID],
            destChainID,
            msg.sender,
            destAddr,
            funcs,
            args,
            argscb,
            argsrb
        );
    }

    // The helper functions that help document Meta information.
    function markCallbackCounter(address from, uint64 index) private {
        emit Timer("markCallbackCounter", block.timestamp);

        if (callbackCounter[from] == 0) {
            callbackChains.push(from);
        }
        callbackCounter[from] = index;
        inMessages[from][callbackCounter[from]] = block.number;
    }

    function markInCounter(address from) private {
        emit Logger("something happened markInCounter");
        inCounter[from]++;
        if (inCounter[from] == 1) {
            inChains.push(from);
        }

        inMessages[from][inCounter[from]] = block.number;
    }

    // The helper functions that help plugin query.
    function getOuterMeta()
        public
        view
        returns (address[] memory, uint64[] memory)
    {
        uint64[] memory indices = new uint64[](outChains.length);
        for (uint64 i = 0; i < outChains.length; i++) {
            indices[i] = outCounter[outChains[i]];
        }

        return (outChains, indices);
    }

    function getOutMessage(address to, uint64 idx)
        public
        view
        returns (uint256)
    {
        return outMessages[to][idx];
    }

    function getInMessage(address from, uint64 idx)
        public
        view
        returns (uint256)
    {
        return inMessages[from][idx];
    }

    function getInnerMeta()
        public
        view
        returns (address[] memory, uint64[] memory)
    {
        uint64[] memory indices = new uint64[](inChains.length);
        for (uint256 i = 0; i < inChains.length; i++) {
            indices[i] = inCounter[inChains[i]];
        }

        return (inChains, indices);
    }

    function getCallbackMeta()
        public
        view
        returns (address[] memory, uint64[] memory)
    {
        uint64[] memory indices = new uint64[](callbackChains.length);
        for (uint64 i = 0; i < callbackChains.length; i++) {
            indices[i] = callbackCounter[callbackChains[i]];
        }

        return (callbackChains, indices);
    }

    function _indexOf(
        string memory _base,
        string memory _value,
        uint256 _offset
    ) internal pure returns (int256) {
        bytes memory _baseBytes = bytes(_base);
        bytes memory _valueBytes = bytes(_value);

        assert(_valueBytes.length == 1);

        for (uint256 i = _offset; i < _baseBytes.length; i++) {
            if (_baseBytes[i] == _valueBytes[0]) {
                return int256(i);
            }
        }

        return -1;
    }
}
