import React from 'react';
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import ComboDisplay from './ComboDisplay';

const ComboGrid3x2 = ({ groups }) => {
    return (
        <Row className='g-4 mt-3'>
            {groups.map((group, index) => (
                <Col key={index} xs='12' md='4'>
                    <Card className='combo-card h-100 shadow-sm'>
                        <CardBody className='combo-card-body'>
                            <ComboDisplay ids={group} />
                        </CardBody>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default ComboGrid3x2;
