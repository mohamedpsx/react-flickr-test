require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import { Button, Image, Navbar, Grid, Row, Col, Glyphicon, Panel } from 'react-bootstrap';
import Affix from 'react-affixed';
import Actions from '../actions/actions';
import Store from '../stores/store';
import Reflux from 'reflux';

const AppComponent = React.createClass({

  mixins: [Reflux.connect(Store, 'photos')],

  page: 1,

  componentWillMount() {
    Actions.fetchRecentPhotos(this.page);
  },

  loadMoreImages() {
    this.page++;
    Actions.fetchRecentPhotos(this.page);
  },

  imageClicked(photo) {
    Actions.imageClicked(photo);
  },

  render() {
    return (
    <div>
      <Navbar inverse>
          <Navbar.Header>
              <Navbar.Brand>
                  <p>React Flickr Test</p>
              </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Text pullRight>
              <p>Designed with <Glyphicon glyph="heart"/> By Mohamed Halloul</p>
          </Navbar.Text>
      </Navbar>
      <Grid fluid={true}>
          <Row>
              <Col md={6}>
                { this.state.photos.photos && this.state.photos.photos.map((photo, i) => (
                  <Col xs={4} md={2}>
                    <Image key={i} src={photo.url_q} responsive={true} thumbnail onClick={()=> { this.imageClicked(photo) }}/>
                  </Col>))
                }
                <Row>
                  <Button bsStyle="primary" bsSize="large" block onClick={this.loadMoreImages}>Load more images</Button>
                </Row>
              </Col>
              <Col md={6}>
              <Affix offsetTop={20}>
                { this.state.photos.selectedImage &&
                  <Panel>
                    <h3 className="title">{this.state.photos.selectedImage.title}</h3>
                    <h5 className="subtitle">{this.state.photos.selectedImage.description}</h5>
                    <Image src={this.state.photos.selectedImage.url}/>
                  </Panel>
                }
              </Affix>
              </Col>
          </Row>
      </Grid>
    </div>);}
});

export default AppComponent;
