interface IGetPrice {
  from: string;
  to: string;
}

async function getData({ from, to }: IGetPrice) {
  const response = await fetch(
    `https://api.exchange.cryptomkt.com/api/3/public/price/rate?from=${from}&to=${to}`,
    {
      next: {
        revalidate: 5,
      },
    }
  );
  return response.json();
}

async function Dashboard() {
  const data = await getData({ from: 'USDC', to: 'ARS' });

  return <div>1 USDC = {Number.parseInt(data.USDC.price, 10)}</div>;
}

export default Dashboard;
