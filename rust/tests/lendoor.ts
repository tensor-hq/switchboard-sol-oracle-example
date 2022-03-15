import * as anchor from "@project-serum/anchor";
import {Program, Provider, Wallet} from "@project-serum/anchor";
import { Lendoor } from "../target/types/lendoor";
import {Connection, Keypair, PublicKey} from "@solana/web3.js";

describe("lendoor", () => {
  anchor.setProvider(anchor.Provider.env());

  // const program = anchor.workspace.Lendoor as Program<Lendoor>;

  const payer = Keypair.fromSecretKey(Uint8Array.from(require("/Users/ilmoi/.config/solana/play.json")));
  const provider = new Provider(new Connection("https://api.devnet.solana.com"), new Wallet(payer), {})
  const program = new Program<Lendoor>(require("../target/idl/lendoor.json"), "5eXF5XFaQSffW8JiCR2T5rPvuHjaMx5rjTvsgYmxQDvr", provider);

  console.log(program)

  it("Lends like a baws", async () => {
    const tx = await program.rpc.gimmeLoan(undefined, {
      accounts: {
        aggregator: new PublicKey("4SExTkRKKA8pxLZn78QiMfAernJma1BBtTc7KFJDFf4J")
      }
    });
    console.log("Your transaction signature", tx);

    //read logs at:
    //https://solscan.io/tx/56rKbk8H1MQihEWvXdo5isNSP7DGH2EgpfScFGPdWGT5BYRFC4ac4CYeLQvJud6cLcntqaisgPfk8zMbKB41L4rm?cluster=devnet
  });
});
