import './component.css';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { button } from 'react-bootstrap';

import { useState} from "react";
const CourseList = () => {
    const initialCourses = [
        { id: "1", name: "Open Source Studio" },
        { id: "2", name: "Programming Studio" },
        { id: "3", name: "Coding Studio" }
    ];
    const [courses, setCourses] = useState(initialCourses);
    const delfunc = (id) => {
        if (window.confirm("정말로 삭제하실래요? ")) {
        const newList = courses.filter((c) => c.id !== id);
        setCourses(newList);
        }
    }
    return (
        <Container>
            {courses.map((course) => (
                <Row>
                    <Col>{course.id}</Col>
                    <Col xs={6}>{course.name}</Col>
                    <Col><Button variant="danger" onClick={() => delfunc(course.id)}>Delete</Button></Col>
                </Row>
            ))}
        </Container>
    );
};
export default CourseList;