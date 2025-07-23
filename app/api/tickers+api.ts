// app/api/bitcoin-history/route.ts
import Constants from 'expo-constants';

export async function GET(req: Request): Promise<Response> {
  const apiKey = Constants.expoConfig?.extra?.coinApiKey;

  try {
    const response = await fetch(
      'https://api.coinpaprika.com/v1/tickers/btc-bitcoin/historical?start=2024-01-01&interval=1d',
      {
        // CoinPaprika public endpoints don't require headers.
        // Uncomment below only if needed.
        // headers: {
        //   Authorization: `Bearer ${apiKey}`,
        // },
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Failed to fetch BTC history:', error.message);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
