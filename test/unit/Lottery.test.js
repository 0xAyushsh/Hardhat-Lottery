const { assert } = require("chai");
const { network, getNamedAccounts, deployments, ethers } = require("hardhat");
const {
  developmentChains,
  networkConfig,
} = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Lottery", function () {
      let lottery, vrfCoordinatorV2Mock;

      beforeEach(async function () {
        const { deployer } = await getNamedAccounts();
        await deployments.fixture(["mocks", "lottery"]);
        lottery = await ethers.getContract("Lottery", deployer);
        vrfCoordinatorV2Mock = await ethers.getContract(
          "VRFCoordinatorV2Mock",
          deployer
        );
      });

      describe("constructor", async function () {
        it("initializes the lottery correctly", async function () {
          const lotteryState = await lottery.getInterval();
          assert.equal(
            lotteryState.toString(),
            networkConfig[network.config.chainId]["interval"]
          );
        });
      });
    });
