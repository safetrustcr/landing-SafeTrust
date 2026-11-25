import freighter from "@stellar/freighter-api";
import { useState } from "react";

type WalletStatus = "idle" | "connecting" | "connected" | "unavailable";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Could not connect to Freighter. Please try again.";
}

export default function useFreighter() {
  const [status, setStatus] = useState<WalletStatus>("idle");
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connect = async () => {
    if (status === "connecting" || status === "connected") return;

    setStatus("connecting");
    setError(null);

    try {
      const { isConnected, error: connectionError } = await freighter.isConnected();
      if (connectionError) {
        throw new Error(getErrorMessage(connectionError));
      }
      if (!isConnected) {
        setStatus("unavailable");
        return;
      }

      const { address: walletAddress, error: accessError } = await freighter.requestAccess();
      if (accessError) {
        throw new Error(getErrorMessage(accessError));
      }
      if (!walletAddress) {
        setError("Freighter did not return a wallet address. Please try again.");
        setStatus("idle");
        return;
      }

      setAddress(walletAddress);
      setStatus("connected");
    } catch (connectionFailure) {
      setError(getErrorMessage(connectionFailure));
      setStatus("idle");
    }
  };

  return { status, address, error, connect };
}
