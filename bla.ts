 import {
  Account,
  Connection,
  Keypair,
  PublicKey
} from "@solana/web3.js";
import { NodeWallet } from "@project-serum/common"; //TODO remove this; kek
import fs from 'fs'
import {
  Fanout,
  FanoutClient,
  MembershipModel,
} from "../packages/sdk/src";
setTimeout(async function(){
  const connection = new Connection("https://solana--mainnet.datahub.figment.io/apikey/24c64e276fc5db6ff73da2f59bac40f2", "confirmed");
  let authorityWallet: Keypair;
  let fanoutSdk: FanoutClient;
    authorityWallet = Keypair.fromSecretKey((new Uint8Array(JSON.parse((await fs.readFileSync('/Users/jarettdunn/.config/solana/id.json')).toString()))));
    //await airdrop(connection, authorityWallet.publicKey, LAMPORTS_PER_SOL * 10);
    fanoutSdk = new FanoutClient(
      connection,
      new NodeWallet(new Account(new Uint8Array(JSON.parse((await fs.readFileSync('/Users/jarettdunn/.config/solana/id.json')).toString()))))
    );

    const { fanout: nfts } = await fanoutSdk.initializeFanout({
        totalShares: 5000, //250? idk?, // aust says we can like update or change now? nice
        name: `staccNfts`,
        membershipModel: MembershipModel.NFT,
      });
    //  let nfts = new PublicKey("883jFGyUQMZesuYpptujUuhD3KccNckpboj3937tBd9F")
      const nftFo = await fanoutSdk.fetch<Fanout>(nfts, Fanout);
      let [holdingAccount2, _] = await FanoutClient.nativeAccount(nfts)
      console.log('nft fanout: ' + nfts.toBase58())
      console.log('nft fanout sol hodling account: ' + holdingAccount2.toBase58())
      console.log('lol')
      console.log(nftFo)

      })