/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import { getLatestBlock, getBlock } from "../api/block";
import { Table } from "react-bootstrap";
import { convertUTCToDateTime } from "../utils/date";
import { Link } from "react-router-dom";
import { ProviderContext } from "../JSONRPCProvider";

const HomePage = () => {
  const [blocks, setBlocks] = useState([]);
  const [blockNumber, setBlockNumber] = useState(-1);
  const { provider } = useContext(ProviderContext);

  const handleNewBlock = (block) => {
    if (block) {
      setBlockNumber(block.number);
      setBlocks((prevBlocks) => [block, ...prevBlocks]);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (blockNumber !== -1) {
        console.log(blockNumber);
        getBlock(provider.url, blockNumber + 1).then((data) =>
          handleNewBlock(data)
        );
      } else if (blocks.length === 0) {
        getLatestBlock(provider.url).then((block) => handleNewBlock(block));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [provider.url]);

  console.log(blocks, blockNumber);

  useEffect(() => {
    setBlocks(() => []);
    setBlockNumber(() => null);
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
