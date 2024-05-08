import { FormEvent, useRef, useState } from "react";
import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import ReactSelect from "react-select/creatable";
import { CreateNoteProps } from "./CreateNote";
import { Tag } from "../../types";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

const NoteForm = ({
  createTag,
  availableTags,
  onSubmit,
  markdown = "",
  tags = [],
  title = "",
}: CreateNoteProps) => {
  //!burada bütün verileri tek tek alıyoruz. tıklanma olayını handlesubmit, input verilerini useref, select verisini usestate ile alıyoruz.

  //forma.control yani inputa girilen verileri almak için
  const titleRef = useRef<HTMLInputElement>(null);
  // console.log(titleRef); //obje olatrak görünyor
  //console.log(titleRef);içine baktık ve objectcurent value görünüyoraşağıya oyle yazdık
  //içerik kısmının verilerini almak için(yazı içerik alanı)
  const markDownRef = useRef<HTMLTextAreaElement>(null);

  //select verilerini almak için(reactselect içerisinde verileri label valu olarak tutuğumuz için öylede tanımlamalıyız)
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();
  //tıklanma olayını izlemek için
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      //burada title, etiket ve içeriği notformun içerine göndericez(! in anlamı boş değil bu demek)
      title: titleRef.current!.value,
      markdown: markDownRef.current!.value,
      tags: selectedTags,
    });
    navigate(-1);
  };
  console.log(selectedTags);

  return (
    <Form onSubmit={handleSubmit}>
      <Stack>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Başlık</Form.Label>
              <Form.Control
                defaultValue={title}
                ref={titleRef}
                required
                className="shadow"
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="title">
              <Form.Label>Etiketler</Form.Label>
              <ReactSelect
                value={selectedTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                onChange={(note_tags) =>
                  setSelectedTags(
                    note_tags.map((tag) => ({
                      label: tag.label,
                      id: tag.value,
                    }))
                  )
                } //yeni etiket oluşturulduğunda locale kaydet
                onCreateOption={(label) => {
                  //yeni obje tanımla
                  const newTag: Tag = { id: v4(), label };
                  //locale kaydet
                  createTag(newTag);
                  setSelectedTags([...selectedTags, newTag]); //state i guncelle
                }}
                //daha önceen oluşturulan taglrı listele
                options={availableTags?.map((item) => ({
                  label: item.label,
                  value: item.id,
                }))}
                isMulti
                className="shadow"
              />
            </Form.Group>
          </Col>
        </Row>

        {/* yazı içerik alanı */}
        <Form.Group controlId="markdown" className="my-4">
          <Form.Label>İçerik</Form.Label>
          <Form.Control
            as={"textarea"}
            className="shadow"
            ref={markDownRef}
            required
            style={{ minHeight: "300px" }}
            defaultValue={markdown}
          />
        </Form.Group>

        {/* butonlar kısmı */}
        <div className="d-flex justify-content-end gap-2">
          <Button type="submit" variant="primary">
            Kaydet
          </Button>
          <Button
            onClick={() => navigate(-1)}
            type="button"
            variant="secondary"
          >
            İptal
          </Button>
        </div>
      </Stack>
    </Form>
  );
};

export default NoteForm;

// ! form.control inputtur
