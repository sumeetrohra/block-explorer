import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getAddressData } from "../api/address";
import { ProviderContext } from "../JSONRPCProvider";

const AddressPage = () => {
  const { pubAddress } = useParams();
  const [accountInfo, setAccountInfo] = useState();
  const [loading, setLoading] = useState(true);
  const { provider } = useContext(ProviderContext);

  useEffect(() => {
    setLoading(true);
    getAddressData(provider.url, pubAddress)
      .then((data) => setAccountInfo(data))
      .finally(() => setLoading(false));
  }, [pubAddress, provider.url]);

  return loading ? (
    <div>Loading...</div>
  ) : accountInfo ? (
    <div>
      <h5>Address: {pubAddress}</h5>
      <p>Balance: {accountInfo.balance}</p>
      {accountInfo.hasCode ? <p>Type: Contract</p> : <p>Type: EOA</p>}
    </div>
  ) : (
    <div>Account not Found</div>
  );
};

export default AddressPage;
