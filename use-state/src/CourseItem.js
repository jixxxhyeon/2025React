import './component.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
const CourseItem = (props) => {
    const data = props.data;
    return (
    <Row key={data.id}>
    <Col>{data.id}</Col>
    <Col xs={6}>{data.name}</Col>
    <Col><Button variant="danger"
    onClick={() => props.delfunc(data.id)}
    >Delete</Button></Col>
    </Row>
    );
}
export default CourseItem;