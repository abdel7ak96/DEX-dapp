**Introduction to DEX App**

Decentralised exchanges (DEX) empower users by providing a platform for swapping cryptocurrencies directly with one another. This section delves into the nature of DEX, its significance for ETH and ENC trading, and key features of our DEX app.

**What is a Decentralised Exchange?**

A decentralised exchange is a trading platform that operates without a central authority, allowing users to trade directly with one another. This model enhances privacy, reduces risks of hacking, and minimizes reliance on intermediaries, promoting a fair trading environment.

**Importance of Swapping ETH to ENC**

Swapping ETH to ENC offers users the flexibility to diversify their portfolios and access various blockchain projects. The ENC token which we created will prove to be very valuable in the future. This feature is crucial for investors seeking to capitalize on emerging tokens while mitigating the risks associated with centralized exchanges. The phrase Whenlambo has never been more relevant since the creation of the ENC token and the DEX exchange as created by Abdel and Pitycake.

**Overview of the DEX App's Features**

The DEX app includes features such as seamless swapping between ETH and ENC, a user-friendly interface built with scaffold-eth-2, and full integration with the deployed smart contract. These components ensure secure, efficient, and decentralized trading experiences for users.

You simply connect your wallet and swap the tokens as you see fit.

**Smart Contract Development**

We chose to develop two smart contracts. One for our coin ENC (EncodeToken.sol) and one for the exchange functionality(DEX.sol). The coin contract is pretty straight forward. It imports the functions from ERC2.sol, Ownable.sol and ERC20Permit.sol to make sure you can mint the tokens. The DEX.sol contract comes with a bit more functionalities.  

**Creating the Exchange Logic**

The exchange logic is essential for facilitating ETH to ENC and vice versa, efficiently handling trades and ensuring user trust by using the DEX.sol contract. Here is what we did.

Constructor
The constructor intializes with the token address, name, and symbol. Inherits from ERC20 and sets token.

getTokensInContract()
Returns the contract's balance of the specified token.

addLiquidity()
Adds ETH and tokens to the liquidity pool. Mints liquidity tokens based on reserves.

removeLiquidity()
Removes liquidity, burning liquidity tokens and returning ETH and tokens proportionally.

getAmountOfTokens()
Calculates how many tokens to receive based on input/output reserves and an optional fee.

swapEthTotoken()
Swaps ETH for tokens using the getAmountOfTokens() function.

swapTokenToEth()
Swaps tokens for ETH, transferring tokens in and sending ETH out based on reserves.

**Frontend Development in DEX App**

The frontend development of the DEX app is critical for user interaction, leveraging the powerful features of Scaffold-eth-2 to create an effective interface that seamlessly interacts with the smart contract back end.

**Overview of our frontend strategy**

The frontend strategy combines Wagmi Hooks and ethers.js to interact with Ethereum smart contracts efficiently. Here's the breakdown:

    Wagmi Hooks:
Used to manage wallet connections (useAccount) and fetch contract data (useScaffoldReadContract for reading and useScaffoldWriteContract for writing).
useWatchBalance tracks the DEX contract's balance.

    ethers.js:
Used for formatting and parsing values (formatEther, parseEther), helping with ETH/token conversions and contract interaction.

    React State and Hooks:
useState manages dynamic states like sellToken and buyToken.
useEffect ensures that the frontend reacts to changes in user inputs or token choices.

    Contract Interaction:
Handles swaps between ETH and tokens by calling the appropriate smart contract functions (swapEthToToken, swapTokenToEth) based on the user’s selected token.

This approach created a seamless user experience, integrating real-time balance updates, swap functionality, and contract calls.

**Building UI Components**

The UI uses buttons like the swap button, which triggers swaps between ETH and ENC tokens. It’s disabled if sellValue is empty or zero. When clicked, it checks the selected token (eth or enc). For ETH-to-token swaps, it calls swapEthTotoken using writeDexContractAsync, passing parseEther(sellValue). For token-to-ETH swaps, it first calls approve for token spending, then swapTokenToEth with the token amount. The toggle button (ArrowsUpDownIcon) switches between ETH and ENC, updating sellToken and buyToken states. These buttons drive contract interactions and update the state based on user input.

**Conclusion and Future Plans**

The DEX app successfully integrates a smart contract allowing seamless ETH to ENC swapping. The frontend, developed with scaffold-eth-2, effectively connects user actions to the contract, demonstrating a functional solution in the decentralised finance ecosystem.

**Future Enhancements for DEX App**

Planned enhancements include adding multi-coin support and integrating more advanced trading features. Additionally, improving user experience through interface updates and optimising transaction speeds are key goals.







