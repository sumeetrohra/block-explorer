import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlock } from "../api/block";
import { Table } from "react-bootstrap";
import { convertUTCToDateTime } from "../utils/date";
import { ProviderContext } from "../JSONRPCProvider";

const BlockPage = () => {
  const [blockInfo, setBlockInfo] = useState();
  const [loading, setLoading] = useState(true);
  const { provider } = useContext(ProviderContext);

  const { blockNumber } = useParams();
  useEffect(() => {
    setLoading(true);
    getBlock(provider.url, blockNumber)
      .then((data) => {
        setBlockInfo(data);
      })
      .finally(() => setLoading(false));
  }, [blockNumber, provider.url]);

  return loading ? (
    <div>Loading data...</div>
  ) : blockInfo ? (
    <>
      <Table bordered>
        <thead>
          <tr>
            <td colSpan="2">Overview</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Block height</td>
            <td>{blockInfo.number}</td>
          </tr>
          <tr>
            <td>Difficulty</td>
            <td>{blockInfo.difficulty}</td>
          </tr>
          <tr>
            <td>Gas Limit</td>
            <td>{parseInt(blockInfo.gasLimit._hex)}</td>
          </tr>
          <tr>
            <td>Gas Used</td>
            <td>{`${parseInt(blockInfo.gasUsed._hex)} (${(
              (parseInt(blockInfo.gasUsed._hex) /
                parseInt(blockInfo.gasLimit._hex)) *
              100
            ).toFixed(2)}%)`}</td>
          </tr>
          <tr>
            <td>Mined By</td>
            <td>
              <Link to={`/address/${blockInfo.miner}`}>{blockInfo.miner}</Link>
            </td>
          </tr>
          <tr>
            <td>Timestamp</td>
            <td>{convertUTCToDateTime(blockInfo.timestamp)}</td>
          </tr>
          <tr>
            <td>Hash</td>
            <td>{blockInfo.hash}</td>
          </tr>
          <tr>
            <td>Parent Hash</td>
            <td>{blockInfo.parentHash}</td>
          </tr>
        </tbody>
      </Table>

      {blockInfo.transactions.length > 0 && (
        <>
          <h6>Transactions</h6>
          <Table bordered hover>
            <thead>
              <tr>
                <td>Transactions</td>
              </tr>
            </thead>
            <tbody>
              {blockInfo.transactions.map((tx) => (
                <tr key={tx.hash}>
                  <td>
                    <Link to={`/tx/${tx.hash}`}>{tx.hash}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  ) : (
    <div>Block not found</div>
  );
};

export default BlockPage;
