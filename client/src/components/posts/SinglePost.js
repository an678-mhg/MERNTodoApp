import { Card, Row, Col, Badge, Button } from 'react-bootstrap'
import ActionButtons from './ActionButtons'
import React from 'react'

function SinglePost({post: {_id, status, title, description, url}}) {
    return (
        <Card className="shadow" border={status === 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger'}>
            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col>
                            <p className="post-title">{title}</p>
                            <Button className="my-3" pill variant={
                                status === 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger'
                            }>
                                {status}
                            </Button>
                        </Col>
                        <Col className="text-right">
                            <ActionButtons url={url} _id={_id} />
                        </Col>
                    </Row>
                </Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default SinglePost
