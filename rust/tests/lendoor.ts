import * as anchor from "@project-serum/anchor";
import {Program, Provider, Wallet} from "@project-serum/anchor";
import { Lendoor } from "../target/types/lendoor";
import {Connection, Keypair, PublicKey} from "@solana/web3.js";

describe("lendoor", () => {
  anchor.setProvider(anchor.Provider.env());

  const payer = Keypair.fromSecretKey(Uint8Array.from(require("/Users/ilmoi/.config/solana/play.json")));
  const provider = new Provider(new Connection("https://api.devnet.solana.com"), new Wallet(payer), {})
  const program = new Program<Lendoor>(require("../target/idl/lendoor.json"), "HX7h7LUQ61ztLgXg4Hh4fqnvuWSuf1vVoh7SMdtarpiU", provider);

  it("Lends like a baws", async () => {
    const tx = await program.rpc.gimmeLoan(undefined, {
      accounts: {
        //TODO replace the aggregator key with your own
        aggregator: new PublicKey("8VD9EJ4njJfH1o2X2a8HLrx93Qa5noNGYt3qhyzcVZ1S")
      }
    });
    console.log('SUCCESS!')
    console.log(`Go to this link and read the logs: https://solscan.io/tx/${tx}?cluster=devnet`);
  });
});
