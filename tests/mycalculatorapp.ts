import * as  anchor from "@project-serum/anchor";
import assert from "assert"
describe("mycalculatorapp", () => {
  // Configure the client to use the local cluster.
  console.log("hello")
  let provider=anchor.AnchorProvider.local()
  anchor.setProvider(provider);
  let calculator=anchor.web3.Keypair.generate()
  let program=anchor.workspace.Mycalculatorapp

  it("Creates a Calculator", async () => {
    // Add your test here.
  await program.rpc.create("Welcome to Solana",{
    accounts:{
      calculator:calculator.publicKey,
      user:provider.wallet.publicKey,
      systemProgram:anchor.web3.SystemProgram.programId
    },
    signers:[calculator]
  })
  const account=await program.account.calculator.fetch(calculator.publicKey)
  assert.ok(account.greeting==="Welcome to Solana")
  });
  it("Adds two number",async()=>{
    await program.rpc.add(new anchor.BN(2),new anchor.BN(3),{
      accounts:{
        calculator:calculator.publicKey
      }
    })
    const account=await program.account.calculator.fetch(calculator.publicKey)
    assert.ok(account.result.eq(new anchor.BN(5)))
  })
});
