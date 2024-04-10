import { CandyPay } from "@candypay/checkout-sdk";
import type { NextApiHandler } from "next";

const sdk = new CandyPay({
  api_keys: {
    private_api_key: process.env.CANDYPAY_PRIVATE_API_KEY!,
    public_api_key: process.env.CANDYPAY_PUBLIC_API_KEY!,
  },
  network: "mainnet", // use 'mainnet' for prod and 'devnet' for dev environment
  config: {
    collect_shipping_address: true,
  },
});

const handler: NextApiHandler = async (req, res) => {
  try {
    const response = await sdk.session.create({
      success_url: "http://localhost:3000//success",
      cancel_url: "http://localhost:3000//cancel",
      // additional SPL tokens, SOL and USDC are the supported tokens by default
      tokens: [
        "dust",
        "samo",
        "bonk",
        "hnt",
        "isc",
        "prospera",
        "shdw",
        "usdt",
      ],
      items: [
        {
          name: "Solana Shades",
          // price in USD
          price: 0.1,
          image: "https://imgur.com/jqUaQ4z.png",
          quantity: 1,
          // optional product size parameter
          size: "9",
        },
        {
          name: "Solana Neck Gaiter",
          price: 18,
          image: "https://imgur.com/tF3MaTI.png",
          quantity: 2,
        },
      ],
      discounts: {
        collection_id: "B4x93Px5YYcQdpvEKmbPMWKGC5a8hytNqpitQFsEAjDx",
        discount: 0.2,
        name: "LILY NFT",
        image: "https://i.ibb.co/chtf9qc/2691.png",
      },
    });

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error creating session",
    });
  }
};

export default handler;
