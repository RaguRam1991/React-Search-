import React, { Component } from "react";
import {  
  Input,
  Footer,
  Card,
  CardBody,
  CardImage,
  CardTitle,
  CardText,
  MDBRow,
  MDBCol,
} from "mdbreact";

import "./style.css";
import "./flags.min.css";

import proditems from './proditems'

export default class App extends Component {
  state = {
    search: ""
  };

  renderProduct = prod => {
    const { search } = this.state;

    return (
      <div className="col-md-3" style={{ marginTop: "20px" }}>
        <Card style={{ width: "10in", alignSelf: 'center', }}>
          <CardBody>
            <MDBRow>
              <MDBCol>
                <p className="">
                  <img
                    height={200}
                    width={250}
                    src={prod.img}
                    alt={prod.name}
                  />
                </p>
              </MDBCol>

              <MDBCol>
                <CardTitle title={prod.name}>
                  {prod.name}
                </CardTitle>
                <CardText>
                  {prod.desc}
                </CardText>
              </MDBCol>
              <MDBCol>
                <CardTitle>
                  Rs. {prod.price}
                </CardTitle>
              </MDBCol>
            </MDBRow>
          </CardBody>
        </Card>
      </div>
    );
  };

  onchange = e => {
    this.setState({ search: e.target.value });
  };

  doFilter() {
    const { search } = this.state;

    if (search.trim().length < 1) return proditems;

    var fltResults = [];

    const fltProds1 = proditems.filter(pitm => {
      return (pitm.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) ||
        (pitm.desc.toLowerCase().indexOf(search.toLowerCase()) !== -1) ||
        (pitm.category.toLowerCase().indexOf(search.toLowerCase()) !== -1) ||
        (pitm.price.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1);
    });

    if (fltProds1.length > 0) fltResults = fltProds1;

    return fltResults;    
  }

  render() {

    var fltResults = this.doFilter();

    return (
      <div className="flyout">
        <main style={{ marginTop: "4rem" }}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <center>
                </center>
              </div>
              <div className="col">
                <Input
                  label="Search Country"
                  icon="search"
                  onChange={this.onchange}
                />
              </div>
              <div className="col" />
            </div>
            <div className="">
              {fltResults.map(pitm => {
                return this.renderProduct(pitm);
              })}
            </div>
          </div>
        </main>
        <Footer color="indigo">
          <p className="footer-copyright mb-0">
            &copy;
          </p>
        </Footer>
      </div>
    );
  }
}