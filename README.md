# 📘 DevExtreme v23 – DataGrid Setup & Column Configuration

Dokumentasi singkat ini menjelaskan cara instalasi **DevExtreme v23** (non-commercial license), penggunaan **DataGrid** di React/Vite, serta konfigurasi **Full View (40 kolom)** dan **Default View (14 kolom)** dengan fitur filter, search, reorder, dan column chooser.

---

## ⚙️ 1. Instalasi

### License (Non-Commercial)
👉 Daftar & ambil lisensi gratis DevExtreme di sini:  
[https://js.devexpress.com/Buy/](https://js.devexpress.com/Buy/)

### Install via NPM
```bash
npm install devextreme@23 devextreme-react@23 --save
```

### Import CSS Theme
Tambahkan ke `index.js` atau `App.js`:
```js
import 'devextreme/dist/css/dx.light.css';
```

---

## 🚀 2. Quick Start – React + Vite

Contoh minimal penggunaan **DataGrid**:

```jsx
import React from 'react';
import DataGrid, { Column, FilterRow, SearchPanel, ColumnChooser } from 'devextreme-react/data-grid';

const data = []; // ganti dengan data API atau mock

export default function ItemTable() {
  return (
    <DataGrid
      dataSource={data}
      keyExpr="ID"
      allowColumnReordering={true}
      showBorders={true}
    >
      {/* 🔍 Search & Filter */}
      <FilterRow visible={true} />
      <SearchPanel visible={true} highlightCaseSensitive={true} />

      {/* 🗂️ Column Chooser */}
      <ColumnChooser enabled={true} mode="select" />

      {/* 🏷️ Default View (14 kolom) */}
      <Column dataField="Tags" caption="Tags" />
      <Column dataField="LastUpdate" caption="Last Update" />
      <Column dataField="ItemName" caption="Item Name" />
      <Column dataField="Color" caption="Color" />
      <Column dataField="Size" caption="Size" />
      <Column dataField="Weight" caption="Weight (gr)" />
      <Column dataField="Room" caption="Room" />
      <Column dataField="Label" caption="Label" />
      <Column dataField="Classification" caption="Classification" />
      <Column dataField="Age" caption="Age" />
      <Column dataField="AssetCounter" caption="Asset Counter" />
      <Column dataField="RegisterCounter" caption="Register Counter" />
      <Column dataField="OpnameCounter" caption="Opname Counter" />
      <Column dataField="Action" caption="Action" />
    </DataGrid>
  );
}
```

---

## 🗂️ 3. Column Views

### **Default View Table (14 Column)**
Digunakan untuk tampilan ringkas & sering dipakai user:

1. Tags  
2. Last Update  
3. Item Name  
4. Color  
5. Size  
6. Weight (gr)  
7. Room  
8. Label  
9. Classification  
10. Age  
11. Asset Counter  
12. Register Counter  
13. Opname Counter  
14. Action  

---

### **Full View Table (40 Column)**
Digunakan untuk tampilan detail semua data:

- ID  
- Tags  
- Date Created  
- Last Update  
- Last Opname Date  
- Last Write Off Date  
- External Owned  
- Item Category  
- Item Code  
- Item Name  
- Item Alias  
- Item Description  
- Color  
- Size  
- Item Length  
- Item Height  
- Item Width  
- Item Unit  
- Weight (gr)  
- Item Price  
- Item Date Created  
- Item Last Update  
- Area  
- Area Description  
- Room  
- Room Description  
- Label  
- Label Description  
- Label Active  
- Label Is Transaction  
- Label Is Counter  
- Label Is Available Opname  
- Classification  
- Item Read Count  
- Age  
- Asset Counter  
- Register Counter  
- Opname Counter  
- Note  
- Action  

---

## 🔎 4. Fitur DataGrid yang Digunakan

- ✅ **FilterRow** – filter per kolom  
- ✅ **SearchPanel** – pencarian global  
- ✅ **Column Reorder** – drag & drop kolom  
- ✅ **Column Chooser** – memilih kolom visible/hidden  
- ✅ **Default vs Full View** – switch sesuai kebutuhan user  

---

## 📝 5. Rekomendasi Developer

- Gunakan **`columns.json`** untuk menyimpan konfigurasi kolom (caption, visible, order) agar lebih mudah dikelola.  
- Terapkan **state persistence** (`stateStoring`) untuk menyimpan preferensi user di `localStorage` atau database.  
- Dokumentasi lengkap DataGrid ada di sini:  
  [https://js.devexpress.com/Documentation/Guide/UI_Components/DataGrid/](https://js.devexpress.com/Documentation/Guide/UI_Components/DataGrid/)

---

## 📌 6. Referensi Resmi

- 🌐 DevExtreme Official Site → [https://js.devexpress.com/](https://js.devexpress.com/)  
- 📖 DataGrid Docs → [https://js.devexpress.com/Documentation/Guide/UI_Components/DataGrid/](https://js.devexpress.com/Documentation/Guide/UI_Components/DataGrid/)  
- 📦 NPM DevExtreme → [https://www.npmjs.com/package/devextreme](https://www.npmjs.com/package/devextreme)  
- 📦 NPM DevExtreme React → [https://www.npmjs.com/package/devextreme-react](https://www.npmjs.com/package/devextreme-react)  

---

✍️ Dengan README ini, developer bisa langsung setup **DevExtreme v23 DataGrid** dengan konfigurasi kolom sesuai kebutuhan (14 kolom default atau 40 kolom full).
