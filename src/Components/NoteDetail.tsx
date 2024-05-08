import { Link, useOutletContext } from "react-router-dom";
import { Row, Col, Stack, Badge, Button } from "react-bootstrap";
import { Note } from "../types";
import ReactMarkdown from "react-markdown";

type DetailPropsType = {
  deleteNote: (id: string) => void;
};

const NoteDetail = ({ deleteNote }: DetailPropsType) => {
  const props: Note = useOutletContext();
  console.log(props);
  return (
    <div className="container py-5">
      <Row>
        <Col>
          <h1>{props.title}</h1>
          <Stack direction="horizontal">
            {props.tags?.map((tag) => (
              <Badge className="fs-6 me-2" key={tag.id}>
                {tag.label}
              </Badge>
            ))}
          </Stack>
        </Col>
        <Col>
          <Stack
            direction="horizontal"
            gap={2}
            className="justify-content-center align-items-center"
          >
            <Link to={"edit"}>
              <Button>Düzenle</Button>
            </Link>
            <Button
              variant="outline-danger"
              onClick={() => {
                deleteNote(props.id);
              }}
            >
              Sil
            </Button>
            <Link to={"/"}>
              <Button variant="outline-secondary">Geri</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown className={"my-5"}>{props.markdown}</ReactMarkdown>
    </div>
  );
};

export default NoteDetail;
