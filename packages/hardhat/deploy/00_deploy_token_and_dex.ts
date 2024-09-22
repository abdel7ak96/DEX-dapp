import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract, parseEther } from "ethers";

const deployContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const [, deployer] = await hre.getUnnamedAccounts();
  const { deploy } = hre.deployments;

  // 1. Deploy token contract
  console.log("📄 Deploying EncodeToken contract");
  const { address: tokenAddress } = await deploy("EncodeToken", {
    from: deployer,
    args: [deployer],
    log: true,
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const tokenContract = await hre.ethers.getContract<Contract>("EncodeToken", deployer);

  // 2. Mint 100 ENC to deployer
  console.log("🌿 Minting a 100 ENC to deployer account...");
  await tokenContract.mint(deployer, parseEther("100"));

  // 3. Deploy decentralized exchange token
  console.log("📄 Deploying DEX contract...");
  const { address: dexAddress } = await deploy("DEX", {
    from: deployer,
    args: [tokenAddress, "DEX Token", "DEX"],
    log: true,
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const dexContract = await hre.ethers.getContract<Contract>("DEX", deployer);

  // 4. Allow DEX contract to spend 100 ETH
  console.log("✅ Approving 100 ENC for spending by DEX contract");
  await tokenContract.approve(dexAddress, parseEther("100"));

  // 5. Add Liquidity to DEX contract
  console.log("🚰 Adding Liquidity to DEX contract");
  await dexContract.addLiquidity(parseEther("100"), { value: parseEther("100") });
};

export default deployContracts;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags EncodeToken
deployContracts.tags = ["EncodeToken"];
