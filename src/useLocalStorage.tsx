//! Burada app.tsx deki dışarıdan gelen etiketler için oluşturduğumuz kendi hookumuzun fonction bilgilerini giriyoruz. T tiptir.değerler değer ve value olarak tanıtılır

import { useState, useEffect } from "react";

//1)localstoragdan verileri alıp burada tutacağız ve veri varsa güncelleyeceğiz.(siteyi açtığımız zaman önceden girilen değerlerin görünmesidir ve güncellenmesidir.)
export function useLocalStorage<T>(key: string, initialValue: T) {
  //2)state i tanımlayalım
  const [value, setValue] = useState<T>(() => {
    //3)localstoragdan tagları al(dışarıdan keye göre işlem yapıldığı için keyde yazarız)sadece burada değil bikaç yerde kullanacağımız için bu şekilde tanımlarız.
    const jsonValue = localStorage.getItem(key);
    //4)localstoragede eleman yoksa initialvalue tanımlayalım(if deyip json value içerisi boş ise yani null(yoksa) ise statein içerisinde döndğreceği deger initialvalue olacak, ikinci bi secenek(else) ise veri varsa bunu jsonparse ile json yapısına çevir)
    if (jsonValue === null) {
      return initialValue;
    } else {
      return JSON.parse(jsonValue);
    }
  });

  //5) state her değiştiğinde localstorage guncelle (useeffect bağımlılık dızısi ile buunu yaparız.)
  useEffect(() => {
    //dışarıdan gönderdiğimiz key ve ikinci değer olan valuyu(value stringolduğu için strngfy) göre locali guncelle
    localStorage.setItem(key, JSON.stringify(value));
    //ve bu değer hem key hem value değiştiğinde bu yapı çalışsın
  }, [key, value]);

  //6) bu işlemlerden sonra dışarıya value ve setvaluyu döndersin
  //hookun kullanılması için statei değiştirme methodunuu return et
  return [value, setValue] as [T, typeof setValue];
}

/*
    ! Custom Hook
    * React hooklarına benzer şekilde görev yapan
    * projenin ihtiyacına göre kendimiz oluşturduğumuz
    * görevini bizim belirlediğimiz hooklardır.
    * Genelde veriyi ve veriyi güncelleyecek fonksiyonu dizi içinde dönerler.
*/
