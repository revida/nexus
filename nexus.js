const fetch = require('node-fetch');

const url = 'https://metamask-sdk.api.cx.metamask.io/evt';

const payload255 = {
  id: "5f6f7021-92ef-4a19-88a6-205006a291e9",
  event: "sdk_rpc_request",
  sdkVersion: "0.30.1",
  url: "https://app.nexus.xyz",
  title: "Nexus",
  dappId: "app.nexus.xyz",
  platform: "web-desktop",
  source: "dynamic-labs",
  method: "eth_chainId",
  from: "extension"
};

const payload260 = {
  id: "5f6f7021-92ef-4a19-88a6-205006a291e9",
  event: "sdk_rpc_request_done",
  sdkVersion: "0.30.1",
  url: "https://app.nexus.xyz",
  title: "Nexus",
  dappId: "app.nexus.xyz",
  platform: "web-desktop",
  source: "dynamic-labs",
  method: "eth_chainId",
  from: "extension"
};

const headers = {
  'accept': 'application/json',
  'accept-encoding': 'gzip, deflate, br, zstd',
  'accept-language': 'en-US,en;q=0.9',
  'content-type': 'application/json',
  'origin': 'https://app.nexus.xyz',
  'priority': 'u=1, i',
  'referer': 'https://app.nexus.xyz/',
  'sec-ch-ua': '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'cross-site',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
};

async function sendPostRequest(payload) {
  const body = JSON.stringify(payload);
  const dynamicHeaders = {
    ...headers,
    'content-length': Buffer.byteLength(body).toString()
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: dynamicHeaders,
      body: body
    });

    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function sendRequestsBatch() {
  const payloads = [payload255, payload255, payload260, payload260];
  for (let i = 0; i < payloads.length; i++) {
    console.log(`Sending request ${i + 1}`);
    await sendPostRequest(payloads[i]);
  }
}

function startRequestLoop() {
  sendRequestsBatch();
  setInterval(() => {
    console.log("Starting new batch of 4 requests...");
    sendRequestsBatch();
  }, 60 * 1000);
}

startRequestLoop();
