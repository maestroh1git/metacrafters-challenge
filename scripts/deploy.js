// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const campaignGoal = 3;
  const tokenName = "Raise Money Token"
  const tokenSymbol = "RM"
  const initialTokenSupply = 100

  const FundToken = await hre.ethers.getContractFactory("CrowdFundToken");
  const fundToken = await FundToken.deploy(tokenName, tokenSymbol, initialTokenSupply);
  await fundToken.deployed();
  console.log(
    `Crowdfunding Token deployed to ${fundToken.address}`
  );

  const CFC = await hre.ethers.getContractFactory("CrowdfundingCampaign");
  const cfc = await CFC.deploy(fundToken.address, campaignGoal);
  await cfc.deployed();

  console.log(
    `Crowdfunding Campaign with campaign goal of ${campaignGoal} ${tokenSymbol}tokens, deployed to ${cfc.address}`
  );
  // console.log( await cfc.functions.fundingGoal())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
