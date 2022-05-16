/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import { getBlock } from "../api/block";
import { Table } from "react-bootstrap";
import { convertUTCToDateTime } from "../utils/date";
import { Link } from "react-router-dom";
import { ProviderContext } from "../JSONRPCProvider";
import { ethers } from "ethers";

const HomePage = () => {
  const [blocks, setBlocks] = useState([]);
  const { provider } = useContext(ProviderContext);

  useEffect(() => {
    const ethProvider = new ethers.providers.JsonRpcProvider(provider.url);
    ethProvider.on("block", (blockNumber) => {
      getBlock(provider.url, blockNumber).then((data) =>
        setBlocks((prevBlocks) => [data, ...prevBlocks])
      );
    });

    return () => ethProvider.removeAllListeners();
  }, [provider.url]);

  useEffect(() => {
    setBlocks([]);
  }, [provider.url]);

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>Bk no.</th>
          <th>Bk time</th>
          <th>Number of txs</th>
          <th>Bk hash</th>
        </tr>
      </thead>
      <tbody>
        {blocks.map((item) => (
          <tr key={item.number}>
            <td>
              <Link to={`/block/${item.number}`}>{item.number}</Link>
            </td>
            <td>{convertUTCToDateTime(item.timestamp)}</td>
            <td>{item.transactions.length}</td>
            <td>{item.hash}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default HomePage;
