import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getTransaction } from "../api/transaction";
import { Table } from "react-bootstrap";
import { ProviderContext } from "../JSONRPCProvider";

const TransactionPage = () => {
  const [txInfo, setTxInfo] = useState();
  const [loading, setLoading] = useState(true);
  const { provider } = useContext(ProviderContext);

  const { txHash } = useParams();
  useEffect(() => {
    setLoading(true);
    getTransaction(provider.url, txHash)
      .then((data) => {
        setTxInfo(data);
      })
      .finally(() => setLoading(false));
  }, [txHash, provider.url]);

  return loading ? (
    <div>Loading...</div>
  ) : txInfo ? (
    <Table bordered>
      <thead>
        <tr>
          <td colSpan="2">Transaction</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Tx Hash</td>
          <td>{txInfo.hash}</td>
        </tr>
        <tr>
          <td>Block Number</td>
          <td>
            <Link to={`/block/${txInfo.blockNumber}`}>
              {txInfo.blockNumber}
            </Link>
          </td>
        </tr>
        <tr>
          <td>Confirmations</td>
          <td>{txInfo.confirmations}</td>
        </tr>
        <tr>
          <td>From</td>
          <td>
            <Link to={`/address/${txInfo.from}`}>{txInfo.from}</Link>
          </td>
        </tr>
        <tr>
          <td>To</td>
          <td>
            <Link to={`/address/${txInfo.to}`}>{txInfo.to}</Link>
          </td>
        </tr>
        <tr>
          <td>Value</td>
          <td>{`${parseInt(txInfo.value._hex, 16)} wei (${
            parseInt(txInfo.value._hex, 16) / 10 ** 18
          } eth)`}</td>
        </tr>
      </tbody>
    </Table>
  ) : (
    <div>Tx not found</div>
  );
};

export default TransactionPage;
