import { ApiPromise, WsProvider } from '@polkadot/api';

const KUSAMA_ENDPONT = 'wss://kusama-rpc.polkadot.io/';
const POLKADOT_ENDPOINT = 'wss://rpc.polkadot.io/';
let URL_TEMPLATE = `https://polkascan.io/polkadot/block`;
const INTRO = 'CLI: Polkadot Block Watcher';

// default
let WS_PROVIDER = new WsProvider(POLKADOT_ENDPOINT);

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}   

const main = async () => {
  console.log(INTRO);
  await sleep(500);
  const myArgs = process.argv.slice(2);

  // console.log(myArgs);
  switch (myArgs[0]) {
    case 'polkadot':
      WS_PROVIDER = new WsProvider(POLKADOT_ENDPOINT);
      URL_TEMPLATE = `https://polkascan.io/polkadot/block`;
      break;
    case 'kusama':
      WS_PROVIDER = new WsProvider(KUSAMA_ENDPONT);
      URL_TEMPLATE = `https://polkascan.io/kusama/block`;
      break;
  }

  const api = await ApiPromise.create({ provider: WS_PROVIDER }).then(api =>{
    global.polkadot_api = api;
    api.rpc.chain.subscribeNewHeads((header) => {
      console.log(`Hash: ${header.hash}`);
      console.log(`Block Number: ${header.number}`);
      console.log(`PolkaScan URL: ${URL_TEMPLATE}/${header.number.toNumber()}`)
    });
  });
}

main();