import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Lock", function () {
    async function deployGroth16VerifierFixture() {
        const [owner, otherAccount] = await hre.ethers.getSigners();

        const Groth16VerifierFactrory = await hre.ethers.getContractFactory("Groth16Verifier");
        const verifier = await Groth16VerifierFactrory.deploy();

        return { verifier, owner, otherAccount };
    }

    describe("Test Verify Proof", function () {
        it("Should Proof verification passed", async function () {
            const { verifier } = await loadFixture(deployGroth16VerifierFixture);

            const _pA: [BigNumberish, BigNumberish] = [
                "0x0c725c2255a1a9e17b55063858c5369609f462e111142fbf94b3bc60911482b6",
                "0x2574100ff17e4eab2b592b81fcced763bd48f2baf383c9516e5500e5b4caf3bd"
            ];

            const _pB: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]] = [
                [
                    "0x279611a814f9c605622d9f4143b80e72c7c9465454b06b7d25c679bdd026baaa",
                    "0x2c976e6eb2302ee0ff4f9cb7cb39948fd2ad4026d0e67de5b07bff5b493f424e"
                ],
                [
                    "0x2205a98bc10e1c759b766f026fab4dc74ae49926cdbdbcc57047a588910bd6a1",
                    "0x12b21d2cfa96b3a24644ac774e3f0fa774d14f4b45621cc5946ed775f381fad7"
                ]
            ];

            const _pC: [BigNumberish, BigNumberish] = [
                "0x11cc47e1a2adba6158b9348d8155d70c62d1bf77c3d553596131731029298e2b",
                "0x15673105ddeaa520cdb9b49f0efb9c6134144dc248de6c48bca70da65987ade9"
            ];

            const _pubSignals: [BigNumberish] = [
                "0x0000000000000000000000000000000000000000000000000000000000000021"
            ];

            await verifier.verifyProof(_pA, _pB, _pC, _pubSignals).then((result) => {
                expect(result).to.equal(true);
            });
        });
    });
});
