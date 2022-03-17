import * as anchor from "@project-serum/anchor";
import {AggregatorAccount, SBV2_DEVNET_PID} from "@switchboard-xyz/switchboard-v2";
import { Big } from "big.js";
import {Connection, Keypair, PublicKey} from "@solana/web3.js";

export const PROGRAM_ID = SBV2_DEVNET_PID;

/**
 * Attempts to load Anchor IDL on-chain and falls back to local JSON if not found
 */
export async function loadAnchor(authority: Keypair): Promise<anchor.Program> {
  if (!PROGRAM_ID) {
    throw new Error("failed to provide PID environment variable");
  }
  const connection = new Connection("https://api.devnet.solana.com", { commitment: "confirmed" });
  const programId = new anchor.web3.PublicKey(PROGRAM_ID);

  const wallet = new anchor.Wallet(authority);

  // get provider
  const provider = new anchor.Provider(connection, wallet, {
    commitment: "processed",
    preflightCommitment: "processed",
  });

  // get idl
  const anchorIdl = await anchor.Program.fetchIdl(programId, provider);
  if (!anchorIdl) {
    throw new Error(`failed to read idl for ${programId}`);
  }
  return new anchor.Program(anchorIdl, programId, provider);
}


const play = async () => {
  const kp = Keypair.fromSecretKey(Uint8Array.from(require('/Users/ilmoi/.config/solana/play.json')));
  const prog = await loadAnchor(kp);

  //TODO replace the aggregator key with your own
  const aggregatorAccount = new AggregatorAccount({program: prog, publicKey: new PublicKey("8VD9EJ4njJfH1o2X2a8HLrx93Qa5noNGYt3qhyzcVZ1S")});
  const result: Big = await aggregatorAccount.getLatestValue() as Big;

  console.log(result.toNumber());
}

play()

