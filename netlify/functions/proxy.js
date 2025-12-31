// simple proxy for fetching arbitrary URL passed as ?url=...
// NOTE: restrict this in production (e.g. allowlist your sheet URL only).
const fetch = require('node-fetch');

exports.handler = async function(event) {
  const url = (event.queryStringParameters && event.queryStringParameters.url) || '';
  if (!url) {
    return { statusCode: 400, body: 'Missing url param' };
  }

  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'netlify-proxy' } });
    const text = await res.text();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
      body: text
    };
  } catch (err) {
    return { statusCode: 502, body: 'Proxy fetch failed: ' + err.message };
  }
};
