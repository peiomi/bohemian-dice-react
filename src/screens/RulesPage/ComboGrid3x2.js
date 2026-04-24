import React from 'react';
import { Row, Col } from 'reactstrap';
import ComboDisplay from './ComboDisplay';

const ComboGrid3x2 = ({ groups }) => {
    return (
        <Row>
            {groups.map((group, index) => (
                <Col key={index}>
                    <ComboDisplay ids={group} />
                </Col>
            ))}
        </Row>
    );
};

export default ComboGrid3x2;
