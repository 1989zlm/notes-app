import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./Components/MainPage";
import CreateNote from "./Components/Form/CreateNote";
import "bootstrap/dist/css/bootstrap.min.css";
import { NoteData, RawNote, Tag } from "./types";
import { useLocalStorage } from "./useLocalStorage";
import { v4 } from "uuid";
import Layout from "./Components/Layout";
import NoteDetail from "./Components/NoteDetail";
import { useMemo } from "react";
import EditNote from "./Components/Form/EditNote";

function App() {
  //3) dataları buuselocalstoragta oluşturucaz
  const [notes, setNotes] = useLocalStorage<RawNote[]>("notes", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);
  // console.log(notes);
  // console.log(tags);
  //!4) localden aldığımız notlara etiket ismi yerine id geliyr, biz idlerin herbirine karşılık gelen etiketleri bulacağız ve objeye ekleriz
  //etiketleri id ye göre filtrele
  const noteWithTags = useMemo(
    () =>
      notes.map((note) => ({
        ...note,
        tags: tags.filter((tag) => note.tagIds?.includes(tag.id)),
      })),
    [notes, tags]
  );
  //console.log(noteWithTags);

  //!2)bu yeni bir method oluşturmak içindir(buraya etiketleri ve dataları göndericez)
  const addNote = ({ tags, ...data }: NoteData) => {
    //noteformda on submit tıklanınca notlar buraya eklenecek
    setNotes((prev) => {
      return [
        ...prev,
        {
          ...data,
          id: v4(), //elemanın etiketi
          //elemanın etiketlerini dön ve döndüğümz her etiketide id aktarmalıyız
          tagIds: tags.map((tag) => tag.id), //her bir etiketi al maple herbir etiketin idisini al ve diziye aktar
        },
      ];
    });
  };
  //console.log(notes);

  //!1) createnote sayfasını tanımladıktan sonra buraya geldik yeni etiket tanımlamak için ve dışarıdan etikleri alacak bu methot( dışarıdan gelen etiketleri burada tutacak )
  //?createTag içerisinde bize, dışarıdan isim laım ve bu isimde label value olarak geldiği için bunların tiplerini bir label value şeklinde tutmamız gerekicek hatta biz Id value şeklinde tutatlım çevirirken label valuya çeviririz idsine göre ekleme yapacağımız için(bu yazıdan hemen sonra typesları belirlemek için klasör açtık)
  // verileri hem state te hemde localstorage ta tutmak için kendi hookumuzu oluşturuyoruz.(customhook denir buna)
  //const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);(2.methodu yazarken aşağıd akldı diye yukarı taşıdım) // tags dizini tanımlayıp localstorage.tsxe yolluyoruz.
  // console.log(tags);

  const createTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  //! 5) silme butonunun çalıştırılması
  const deleteNote = (id: string) => {
    //console.log(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  //! 6)updataNote
  /*
  1.adım:notu alacağız
  2.adım:notu statede tuttuğumuz dizideki halini bulacağız
  3.adım:Dizideki eski versiyonunu kaldıracağız
  4.adım:Yerine yeni aldığımız yeni notu koyacağız
*/
  const updateNote = (id: string, { tags, ...data }: NoteData) => {
    // console.log(tags);
    // console.log(id);
    // console.log(data);
    const updated = notes.map((note) =>
      note.id === id
        ? { ...note, ...data, tagsIds: tags.map((tag) => tag.id) }
        : note
    );
    setNotes(updated);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          element={<MainPage availableTags={tags} notes={noteWithTags} />}
        />
        <Route
          path={"/new"}
          element={
            <CreateNote
              onSubmit={addNote}
              createTag={createTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<Layout notes={noteWithTags} />}>
          {/* //index demek en ustte 1. olarak gelsin  */}
          <Route index element={<NoteDetail deleteNote={deleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                availableTags={tags}
                createTag={createTag}
                onSubmit={updateNote}
              />
            }
          />
        </Route>

        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
