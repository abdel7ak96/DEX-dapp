This project was created by Pitycake and Abdel7ak96.



To do: Explaining our use case

**Deployment script**

This Solidity deployment script creates a simple decentralized exchange (DEX) that allows users to:

    Add Liquidity: Users can deposit both ETH and ENC(EncodeToken) into the contract. In return, they receive "liquidity tokens," which represent their share of the pool.

    Remove Liquidity: Users can withdraw their share of ETH and ENC tokens from the liquidity pool by returning the liquidity tokens they received earlier.

    Swap Tokens:
        Users can swap ETH for ENC.
        Users can also swap the ENC back to ETH.

Key Features:

    The contract keeps track of how much ETH and tokens it holds.
    Liquidity providers can add and remove their share of the pool at any time.
    Swapping tokens is based on the pool's current reserves, ensuring fair trades.

The contract operates under the control of its creator and interacts with ENC.

**DEX (Decentralized Exchange) Smart Contract**

This  smart contract is the underlying basis for our simple decentralized exchange (DEX) where users can add liquidity, remove liquidity, and swap between ETH and ENC. It leverages the ERC20 standard from OpenZeppelin to manage the token interactions.

Features:

    Liquidity Management
        Users can add liquidity by depositing ETH and ENC.
        Users can remove liquidity, receiving a proportional amount of ETH and ERC20 tokens based on their share of the liquidity pool.

    Token Swapping
        Allows swapping of ETH for an ERC20 token.
        Allows swapping of ERC20 tokens for ETH.
        Includes an algorithm for determining the optimal amount of tokens or ETH to be swapped, based on the liquidity reserves.

    Fee Calculation
        By default, the contract calculates a fee (optional or customizable) for token swaps.

**EncodeToken (ERC20 Token Contract)**

The EncodeToken is a simple ERC20 token contract based on OpenZeppelin's implementation. It includes features for token minting, ownership control, and permit functionality. The token is designed to be managed by an owner, who can mint tokens to specified addresses.

Features:

    ERC20 Standard Token
        Implements the standard ERC20 token functionality (name, symbol, transfer, balance, etc.).
        The token is named EncodeToken with the symbol ENC.

    Ownership (Ownable)
        Uses OpenZeppelin's Ownable pattern to restrict certain functions to the contract owner.
        The owner is set during contract deployment and can mint tokens.

    Token Minting
        The contract owner can mint new tokens, increasing the total supply.
        Only the owner is permitted to mint tokens.

    Permit
        Implements the ERC20 Permit standard, allowing gasless approvals.
        Users can approve token transfers via signatures rather than on-chain transactions, reducing gas fees.


To do: explaining the frontend
