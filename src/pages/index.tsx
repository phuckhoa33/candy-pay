import type { NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const createSession = async () => {
    const response = await fetch("/api/create-session", {
      method: "POST",
    });
    const data = await response.json();

    router.push(data.payment_url);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        flexDirection: "column",
      }}
    >
      <img src="https://imgur.com/jqUaQ4z.png" alt="solana shades" />
      <p>Buy your Solana Shades</p>
      <button onClick={createSession}>Thanh toán</button>
    </div>
  );
};

export default Home;
