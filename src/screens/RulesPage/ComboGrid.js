import React from 'react';
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import ComboDisplay from './ComboDisplay';

const ComboGrid = ({ leftIds, rightIds }) => {
    return (
        <Row className="g-4">
            <Col xs="12" md="6">
                <Card className='combo-card shadow-sm'>
                    <CardHeader className='combo-card-header text-center'>
                        Basic Scoring Combos
                    </CardHeader>
                    <CardBody>
                        <ComboDisplay ids={leftIds} />
                    </CardBody>
                </Card>
            </Col>

            <Col xs="12" md="6">
                <Card className='combo-card shadow-sm'>
                    <CardHeader className='combo-card-header text-center'>
                        3-of-a-Kind Scoring Combos
                    </CardHeader>
                    <CardBody>
                        <ComboDisplay ids={rightIds} />
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default ComboGrid;