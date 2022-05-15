import React, { useState, useContext } from "react";
import {
  Navbar,
  Container,
  Form,
  FormControl,
  NavDropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ProviderContext } from "../JSONRPCProvider";

const Header = () => {
  const [text, setText] = useState("");

  const { options, setProvider, provider } = useContext(ProviderContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      if (text.match(/^\d+$/)) {
        navigate(`/block/${text}`);
      } else if (text.length === 42) {
        navigate(`/address/${text}`);
      } else {
        navigate(`/tx/${text}`);
      }
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light">
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Navbar.Brand href="/">Block explorer</Navbar.Brand>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NavDropdown title={provider.label} id="basic-nav-dropdown">
              {options.map((opt) => (
                <NavDropdown.Item
                  key={opt.label}
                  onClick={() => setProvider(opt)}
                >
                  {opt.label}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <Form className="d-flex" onSubmit={handleSubmit}>
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Form>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
