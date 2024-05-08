//!  not sayfası iki yerde kullanılıyor o yuzden prop yollayarak oluşturacağız.iki yere yazdık createtag ı

import { NoteData, Tag } from "../../types";
import NoteForm from "./NoteForm";

export type CreateNoteProps = {
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
  onSubmit: (data: NoteData) => void;
} & Partial<NoteData>; //içerisine gönderdiğimiz tipi createnoteprops ile birleştirecek sonra hepsi opsiyoel tanımlanmış gibi undifined olabilecek

const CreateNote = ({
  createTag,
  availableTags,
  onSubmit,
}: CreateNoteProps) => {
  return (
    <div className="container py-5">
      <h1>Yeni Not Oluştur</h1>
      <NoteForm
        createTag={createTag}
        onSubmit={onSubmit}
        availableTags={availableTags}
      />
    </div>
  );
};

export default CreateNote;
