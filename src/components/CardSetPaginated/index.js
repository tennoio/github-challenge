import React from 'react';
import {
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardHeader,
  CardFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';

import Pagination from '../Pagination';

import './index.css';

const _ = {};
_.map = require('lodash/map');

const CardSetPaginated = (props) => {
  const classes = {
    container: 'card-set-paginated ' + props.className,
    card: 'card-set-paginated__card',
    cardHeader: 'card-set-paginated__header',
    cardFooter: 'card-set-paginated__footer',
    cardTitle: 'card-set-paginated__title',
    cardSubtitle: 'card-set-paginated__subtitle',
    cardText: 'card-set-paginated__text',
  };

  // generic renderer for repeating card elements
  const renderCardComponent = (CardComponent, data = [], className = '', tag) => {
    const arr = Array.isArray(data) ? data : [data];
    return _.map(arr, (content, index) => {
      return (
        <CardComponent
          key={index}
          className={className}
          {...tag ? { tag } : {}}
        >
          {content}
        </CardComponent>
      );
    });
  };

  return (
    <div className={classes.container}>
      <Row>
        {_.map(props.cards, (card) => {
          return (
            <Col xs="12" sm="6" md="4" lg="4" xl="3" key={card.id}>
              <Card className={classes.card}>
                {renderCardComponent(CardHeader, card.cardHeader, classes.cardHeader)}
                <CardBody>
                  {renderCardComponent(CardTitle, card.cardTitle, classes.cardTitle)}
                  {renderCardComponent(CardSubtitle, card.cardSubtitle, classes.cardSubtitle)}
                  {renderCardComponent(CardText, card.cardText, classes.cardText, 'div')}
                </CardBody>
                {renderCardComponent(CardFooter, card.cardFooter, classes.cardFooter)}
              </Card>
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col xs="12">
          <Pagination
            pageNumber={props.pageNumber}
            pageCount={Math.ceil(props.cardsTotal / props.cardsPerPage)}
            onPageChange={props.onPageChange}
            getPaginationLinkHref={props.getPaginationLinkHref}
          />
        </Col>
      </Row>
    </div>
  );
};

CardSetPaginated.defaultProps = {
  className: '',
  cards: [],
  pageNumber: 1,
  cardsPerPage: 12,
  cardsTotal: 0,
};

CardSetPaginated.propTypes = {
  className: PropTypes.string,
  cards: PropTypes.arrayOf(PropTypes.shape({
    cardHeader: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
      ])),
      PropTypes.element,
      PropTypes.string,
    ]),
    cardTitle: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
      ])),
      PropTypes.element,
      PropTypes.string,
    ]),
    cardSubtitle: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
      ])),
      PropTypes.element,
      PropTypes.string,
    ]),
    cardText: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
      ])),
      PropTypes.element,
      PropTypes.string,
    ]),
    cardFooter: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
      ])),
      PropTypes.element,
      PropTypes.string,
    ]),
  })),
  pageNumber: PropTypes.number,
  cardsPerPage: PropTypes.number,
  cardsTotal: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  getPaginationLinkHref: PropTypes.func.isRequired,
};

export default CardSetPaginated;
