import arcjet, { tokenBucket } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["userId"],
  rules: [
    tokenBucket({
      mode: "LIVE",
      refillRate: 30, // Increase from 10 to 30
      interval: 60, // Decrease from 3600 to 60 seconds
      capacity: 30, // Increase from 10 to 30
    }),
  ],
});

export default aj;
