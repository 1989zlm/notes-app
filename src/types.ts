export type Tag = {
  id: string;
  label: string;
};

//!normal veri için hazırlann type
export type Note = {
  id: string;
} & NoteData;
export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

//!localstorage için hazırlanan type
export type RawNote = {
  id: string;
} & RawNoteData; // id ve rawnotedata yazılsın
//yeni oluşurulacak datanın içinde ttle,etiket ve içerik olacak//localstoragte id yi ayrı tutarız.diğer verileri(başlık etiket title vs ) yide ayrı tutarız
export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};
