
import{ApiPromise,Keyring,WsProvider} from "@polkadot/api"
import "@polkadot/api-augment"
import { KeyringPair } from "@polkadot/keyring/types"

import type { FrameSystemAccountInfo } from "@polkadot/types/lookup"
import { waitReady } from "@polkadot/wasm-crypto"
import { ecdh } from "secp256k1"

const WEB_SOCKET="ws://127.0.0.1:9944"

const connect=async()=>{
    const wsProvider=new WsProvider(WEB_SOCKET);
    const api=await ApiPromise.create({provider:wsProvider,types:{}})
    await api.isReady;
    return api;

}


const getConst=async(api:ApiPromise)=>{
    const existentialDeposit=await api.consts.balances.existentialDeposit.toHuman();
    return existentialDeposit;

}

const getFreeBalance=async (api:ApiPromise,address:string)=>{
    const {data:{free,},}: FrameSystemAccountInfo=await api.query
    .system.account(address);
    return free;
}

const transfer=async(api: ApiPromise,alice:KeyringPair,bob:string,amount:number)=>{
    await api.tx.balances.transferKeepAlive(bob,amount)
    .signAndSend(alice,res=>{
        console.log('tx status: ${res.status}');
    });

}

const getMetadata =async(api:ApiPromise)=>{
    const metadata=await api.rpc.state.getMetadata();
    return metadata.toString();

}


const subscribe=async(api:ApiPromise,address:string)=>{
    await api.query.system.account(address,aliceInfo=>{
        const free=aliceInfo.data.free;
        console.log('free balance is:',free.toHuman());
    })

}

const subscribeEvent=async(api:ApiPromise)=>{
    await api.query.system.events(events=>{
        events.forEach(function(event){
            console.log('index',event['event']['index'].toHuman());
            console.log('data',event['event']['data'].toHuman());

        })
    })

}

const main=async()=>{

    const api=await connect();
    // const deposit=await getConst(api);
    const keyring=new Keyring({type:"sr25519"});
    const alice=keyring.addFromUri('//Alice');
    const bob=keyring.addFromUri('//Bob');

    await subscribe(api,alice.address);
    await subscribeEvent(api);

    // console.log("matedata  is",await getMetadata(api));

    const bob_balance=await getFreeBalance(api,alice.address);

    console.log("bob_balance balance is",bob_balance.toHuman());


    await transfer(api,alice,bob.address,10**10+1);
    await sleep(50000);
    const bob_balance_after_transfer=await getFreeBalance(api,bob.address);

    console.log("bob_balance_after_transfer is",bob_balance.toHuman());
    
    // console.log("deposit is",deposit);
    console.log("main function");

}

main()
.then(()=>{

    console.log("exits with sucess");
    process.exit(0);

})
.catch(
    err=>{
        console.log('error is',err);
        process.exit(1);

    }
)


function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}




