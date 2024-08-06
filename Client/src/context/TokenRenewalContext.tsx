import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useRef,
} from "react";
import useRenewAccessToken from "../hooks/useRenewAccessToken";

type TTokenRenewalContext = {
  manageAccessTokenRenewal: () => Promise<boolean>;
};

const TokenRenewalContext = createContext<TTokenRenewalContext | null>(null);

interface TokenRenewalProviderProps {
  children: ReactNode;
}

/**accesstoken 재발급 관리 / 재발급 중복 요청 방지*/
const TokenRenewalProvider = ({ children }: TokenRenewalProviderProps) => {
  const tokenRenewalPromiseRef = useRef<Promise<boolean> | null>(null);
  const renewAccessToken = useRenewAccessToken();

  const manageAccessTokenRenewal = useCallback(async () => {
    if (!tokenRenewalPromiseRef.current) {
      tokenRenewalPromiseRef.current = renewAccessToken();
    }

    const isTokenRenewed = await tokenRenewalPromiseRef.current;
    tokenRenewalPromiseRef.current = null;
    return isTokenRenewed;
  }, [renewAccessToken]);

  return (
    <TokenRenewalContext.Provider value={{ manageAccessTokenRenewal }}>
      {children}
    </TokenRenewalContext.Provider>
  );
};

const useTokenRenewalContext = () => {
  const context = useContext(TokenRenewalContext);
  if (!context) {
    throw "useTokenRenewalContext must be used within a TokenRenewalProvider";
  }
  return context;
};

export { TokenRenewalProvider, useTokenRenewalContext };
