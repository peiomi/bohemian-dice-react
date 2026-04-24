import React from 'react';
import { Row, Col } from 'reactstrap';
import ComboDisplay from './ComboDisplay';

const ComboGrid = ({ leftIds, rightIds }) => {
    return (
        <Row className="g-4">
            <Col xs="12" md="6">
                <ComboDisplay ids={leftIds} />
            </Col>

            <Col xs="12" md="6">
                <ComboDisplay ids={rightIds} />
            </Col>
        </Row>
    );
};

export default ComboGrid;