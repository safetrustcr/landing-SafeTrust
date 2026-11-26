import freighter from "@stellar/freighter-api";
import { useSyncExternalStore } from "react";

type WalletStatus = "idle" | "connecting" | "connected" | "unavailable";

interface WalletState {
  status: WalletStatus;
  address: string | null;
  error: string | null;
}

const initialState: WalletState = {
  status: "idle",
  address: null,
  error: null,
};

let walletState = initialState;
let walletWatcher: InstanceType<typeof freighter.WatchWalletChanges> | null = null;
let connectRequestPending = false;
const listeners = new Set<() => void>();

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }
  return "Could not connect to Freighter. Please try again.";
}

function updateWalletState(nextState: WalletState) {
  if (
    walletState.status === nextState.status &&
    walletState.address === nextState.address &&
    walletState.error === nextState.error
  ) {
    return;
  }

  walletState = connectRequestPending && nextState.status !== "connecting"
    ? { ...nextState, status: "connecting" }
    : nextState;
  listeners.forEach((listener) => listener());
}

async function refreshWallet() {
  try {
    const { isConnected, error: connectionError } = await freighter.isConnected();
    if (connectionError) {
      updateWalletState({
        status: "idle",
        address: null,
        error: getErrorMessage(connectionError),
      });
      return;
    }

    if (!isConnected) {
      updateWalletState({ status: "unavailable", address: null, error: null });
      return;
    }

    const { address, error: addressError } = await freighter.getAddress();
    if (addressError) {
      updateWalletState({
        status: "idle",
        address: null,
        error: getErrorMessage(addressError),
      });
      return;
    }

    updateWalletState({
      status: address ? "connected" : "idle",
      address: address || null,
      error: null,
    });
  } catch (refreshError) {
    updateWalletState({
      status: "idle",
      address: null,
      error: getErrorMessage(refreshError),
    });
  }
}

function startWalletMonitoring() {
  try {
    walletWatcher = new freighter.WatchWalletChanges();
    const { error } = walletWatcher.watch(({ address, error: watchError }) => {
      if (watchError) {
        updateWalletState({
          status: "idle",
          address: null,
          error: getErrorMessage(watchError),
        });
        return;
      }

      updateWalletState({
        status: address ? "connected" : "idle",
        address: address || null,
        error: null,
      });
    });

    if (error) {
      walletWatcher.stop();
      walletWatcher = null;
      updateWalletState({
        status: "idle",
        address: null,
        error: getErrorMessage(error),
      });
    }
  } catch (watchError) {
    walletWatcher?.stop();
    walletWatcher = null;
    updateWalletState({
      status: "idle",
      address: null,
      error: getErrorMessage(watchError),
    });
  }

  window.addEventListener("focus", refreshWallet);
  void refreshWallet();
}

function stopWalletMonitoring() {
  walletWatcher?.stop();
  walletWatcher = null;
  window.removeEventListener("focus", refreshWallet);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) startWalletMonitoring();

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) stopWalletMonitoring();
  };
}

function getSnapshot() {
  return walletState;
}

async function connect() {
  if (connectRequestPending) return;

  connectRequestPending = true;
  updateWalletState({ ...walletState, status: "connecting", error: null });

  try {
    const { isConnected, error: connectionError } = await freighter.isConnected();
    if (connectionError) {
      throw connectionError;
    }
    if (!isConnected) {
      connectRequestPending = false;
      updateWalletState({ status: "unavailable", address: null, error: null });
      return;
    }

    const { address, error: accessError } = await freighter.requestAccess();
    if (accessError) {
      throw accessError;
    }
    if (!address) {
      connectRequestPending = false;
      updateWalletState({
        status: "idle",
        address: null,
        error: "Freighter did not return a wallet address. Please try again.",
      });
      return;
    }

    connectRequestPending = false;
    updateWalletState({ status: "connected", address, error: null });
  } catch (connectionFailure) {
    connectRequestPending = false;
    updateWalletState({
      status: "idle",
      address: null,
      error: getErrorMessage(connectionFailure),
    });
  } finally {
    connectRequestPending = false;
  }
}

export default function useFreighter() {
  const state = useSyncExternalStore(subscribe, getSnapshot, () => initialState);
  return { ...state, connect };
}
