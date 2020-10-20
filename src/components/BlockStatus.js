import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Box, Card, CardContent, CircularProgress, Typography, Link } from '@material-ui/core';
import {ApiPromise, WsProvider } from '@polkadot/api';

const wsProvider = new WsProvider('wss://rpc.polkadot.io')

function BlockStatus() {
  const [latestBlockHeader, setLatestBlockHeader] = useState({});

  useEffect(() =>{
    ApiPromise.create({ provider: wsProvider }).then(api =>{
      global.polkadot_api = api;
      api.rpc.chain.subscribeNewHeads((header) => {
        setLatestBlockHeader(header);
      });
    });
  }, []);

  return (
    <div>
        <Box display="flex"> 
        <Box m="auto">
            <Typography variant="h3" component="h3" color="main" >
              Polkadot Block Watcher
            </Typography>
          </Box>
        </Box>
        <Card variant="outlined">
          <CardContent>
                <Typography variant="h3" >
                  latest block number:  {latestBlockHeader.number ? 
                    <span style={{marginLeft: 12}} 
                    >#{latestBlockHeader.number.toNumber()}</span>:
                    <CircularProgress size={20} style={{marginLeft: 10, marginTop: 8}}  />
                  }
                </Typography>
                <Typography >
                  latest block hash: {latestBlockHeader.hash ? 
                      <Link 
                        color = "main"
                        target="_blank"
                        href={`https://polkascan.io/polkadot/block/${latestBlockHeader.number.toNumber()}`}>
                    <span style={{marginLeft: 12}}>{latestBlockHeader.hash.toString()}</span></Link>:
                    <CircularProgress size={18}  style={{marginLeft: 10, marginTop: 8}} />
                  }
                </Typography>
          </CardContent>
        </Card>
      </div>
  );
}

export default BlockStatus;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<BlockStatus />, wrapper) : false;