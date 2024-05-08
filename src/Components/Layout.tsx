import { Navigate, Outlet, useParams } from "react-router-dom";
import { Note } from "../types";

type LayoutPropsType = {
  notes: Note[];
};

const Layout = ({ notes }: LayoutPropsType) => {
  //URlden ıd ye göre doğru notu bulacak ve bu notun bilgisini çocuk routelara aktaracağız
  //urlden ıd yi bulucaz(paramsdeyip butun urli alacağımıza params.id deyip nesne parçalama ile sadece idyi alırız sonra params yerine direk id dedik)
  //   const params = useParams();
  //   console.log(params.id);

  const { id } = useParams();
  //console.log(notes);
  const found = notes.find((n) => n.id === id);
  //eğer note bulunmazsa anasayfauya yönlendir
  if (!found) return <Navigate to={"/"} />;
  //bulursa çocuk routu bas (outlet)?
  return <Outlet context={found} />;
};

export default Layout;
