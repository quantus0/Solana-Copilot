import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SolanaCopilot } from "../target/types/solana_copilot";

describe("solana-copilot", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.SolanaCopilot as Program<SolanaCopilot>;

  it("Creates an agent", async () => {
    const agent = anchor.web3.Keypair.generate();
    const tx = await program.methods
      .createAgent("Buy NFTs under 2 SOL")
      .accounts({
        agent: agent.publicKey,
        owner: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([agent])
      .rpc();
    console.log("Transaction signature", tx);
  });
});