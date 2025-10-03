import React, { useCallback, useMemo, useState } from "react";
import DataGrid, {
  Column,
  ColumnChooser,
  Export,
  FilterPanel,
  FilterRow,
  HeaderFilter,
  Item,
  RowDragging,
  SearchPanel,
  Selection,
  Toolbar,
  Pager,
  Paging,
} from "devextreme-react/data-grid";
import { exportDataGrid } from "devextreme/excel_exporter";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import data from "./data.json";
const allColumns = [
  "ID",
  "Tags",
  "Date Created",
  "Last Update",
  "Last Opname Date",
  "Last Write Off Date",
  "External Owned",
  "Item Category",
  "Item Code",
  "Item Name",
  "Item Alias",
  "Item Description",
  "Color",
  "Size",
  "Item Length",
  "Item Height",
  "Item Width",
  "Item Unit",
  "Weight (gr)",
  "Item Price",
  "Item Date Created",
  "Item Last Update",
  "Area",
  "Area Description",
  "Room",
  "Room Description",
  "Label",
  "Label Description",
  "Label Active",
  "Label Is Transaction",
  "Label Is Counter",
  "Label Is Available Opname",
  "Classification",
  "Item Read Count",
  "Age",
  "Asset Counter",
  "Register Counter",
  "Opname Counter",
  "Note",
  "Action",
];

const defaultVisibleColumns = [
  "Tags",
  "Last Update",
  "Item Name",
  "Color",
  "Size",
  "Weight (gr)",
  "Room",
  "Label",
  "Classification",
  "Age",
  "Asset Counter",
  "Register Counter",
  "Opname Counter",
  "Action",
];

const dateFields = new Set([
  "Date Created",
  "Last Update",
  "Last Opname Date",
  "Last Write Off Date",
  "Item Date Created",
  "Item Last Update",
]);

const numericFields = new Set([
  "Item Length",
  "Item Height",
  "Item Width",
  "Weight (gr)",
  "Item Price",
  "Item Read Count",
  "Age",
  "Asset Counter",
  "Register Counter",
  "Opname Counter",
]);

const booleanFields = new Set([
  "External Owned",
  "Label Active",
  "Label Is Transaction",
  "Label Is Counter",
  "Label Is Available Opname",
]);

const currencyFields = new Set(["Item Price"]);

const rightAlignedFields = new Set([
  "Weight (gr)",
  "Item Price",
  "Item Length",
  "Item Height",
  "Item Width",
  "Item Read Count",
  "Age",
  "Asset Counter",
  "Register Counter",
  "Opname Counter",
]);

const GuideContent = () => (
  <div className="help-content">
    <section className="guide-section">
      <h3>Tujuan Panduan</h3>
      <p>Dokumentasi ini membantu memahami arsitektur DataGrid, urutan kolom, serta cara mengganti sumber data ke API.</p>
    </section>

    <section className="guide-section">
      <h3>Langkah Detail</h3>
      <ol className="guide-steps">
        <li>
          <strong>Siapkan state data & kontrol panduan</strong>
          <p>Gunakan React state untuk menyimpan data grid dan status panel bantuan.</p>
          <pre>
            <code>{`const [gridData, setGridData] = useState(data);
const [helpOpen, setHelpOpen] = useState(false);`}</code>
          </pre>
        </li>
        <li>
          <strong>Definisikan blueprint kolom</strong>
          <p><code>allColumns</code> mendefinisikan urutan global; <code>defaultVisibleColumns</code> menentukan kolom awal yang terlihat.</p>
          <pre>
            <code>{`const allColumns = ["ID", "Item Name", ...];
const defaultVisibleColumns = ["Item Name", "Color", ...];`}</code>
          </pre>
        </li>
        <li>
          <strong>Bangun konfigurasi kolom</strong>
          <p><code>useMemo</code> memetakan nama kolom menjadi konfigurasi DevExtreme dengan format, alignment, dan <code>visibleIndex</code>.</p>
          <pre>
            <code>{`const columns = useMemo(() => allColumns.map((field) => {
  const column = {
    dataField: field,
    visible: defaultVisibleColumns.includes(field),
  };
  if (column.visible) {
    column.visibleIndex = defaultVisibleColumns.indexOf(field);
  }
  return column;
}), []);`}</code>
          </pre>
        </li>
        <li>
          <strong>Render DataGrid</strong>
          <p>Aktifkan filter, pencarian, ekspor, paging, dan drag & drop sesuai kebutuhan bisnis.</p>
          <pre>
            <code>{`<DataGrid dataSource={gridData} allowColumnReordering allowColumnResizing>
  <Selection mode="multiple" />
  <Paging defaultPageSize={10} />
  <Pager showPageSizeSelector allowedPageSizes={[10, 20, 50]} showInfo />
  {columns.map((column) => <Column key={column.dataField} {...column} />)}
</DataGrid>`}</code>
          </pre>
        </li>
      </ol>
    </section>

    <section className="guide-section">
      <h3>Pengurutan Kolom & Column Chooser</h3>
      <ul>
        <li><strong>Urutan penuh:</strong> <code>allColumns</code> memastikan semua kolom (termasuk yang tersembunyi) konsisten saat diaktifkan via Column Chooser.</li>
        <li><strong>Urutan tampilan awal:</strong> <code>visibleIndex</code> diberikan berdasarkan posisi di <code>defaultVisibleColumns</code>.</li>
        <li><strong>Penataan ulang manual:</strong> Gunakan <code>RowDragging</code> atau ubah array untuk urutan default baru.</li>
      </ul>
    </section>

    <section className="guide-section">
      <h3>Integrasi API</h3>
      <p>Ganti data statis dengan fetch ke layanan eksternal. Normalisasi struktur sebelum masuk grid.</p>
      <pre>
        <code>{`const [gridData, setGridData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  const load = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.example.com/inventory');
      if (!response.ok) throw new Error('Status ' + response.status);
      const payload = await response.json();
      const normalized = payload.map((item) => ({
        ...item,
        'Last Update': item.lastUpdate?.slice(0, 10),
        'Item Price': Number(item.itemPrice ?? 0),
      }));
      setGridData(normalized);
    } catch (err) {
      setError(err.message ?? 'Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  load();
}, []);`}</code>
      </pre>
      <p className="guide-note">Saat data berasal dari API, pertahankan daftar kolom yang sama agar Column Chooser menampilkan pilihan yang konsisten.</p>
    </section>

    <section className="guide-section">
      <h3>Checklist Perapian</h3>
      <ul className="guide-checklist">
        <li>Kelompokkan konstanta kolom & tipe data ke modul terpisah saat ukurannya membesar.</li>
        <li>Gunakan helper <code>buildColumnConfig</code> untuk menjaga logika format tetap DRY.</li>
        <li>Tambahkan indikator <code>loading</code>/<code>error</code> pada UI saat memakai API.</li>
        <li>Pastikan pengujian ekspor Excel setelah mengubah struktur kolom.</li>
      </ul>
    </section>
  </div>
);

const App = () => {
  const [gridData, setGridData] = useState(data);
  const [helpOpen, setHelpOpen] = useState(false);
  const handleOpenHelp = useCallback(() => {
    setHelpOpen(true);
  }, []);

  const handleCloseHelp = useCallback(() => {
    setHelpOpen(false);
  }, []);


  const columns = useMemo(
    () =>
      allColumns.map((field) => {
        const column = {
          dataField: field,
          caption: field,
          allowHiding: true,
          visible: defaultVisibleColumns.includes(field),
        };

        if (column.visible) {
          column.visibleIndex = defaultVisibleColumns.indexOf(field);
        }

        if (dateFields.has(field)) {
          column.dataType = "date";
          column.format = "yyyy-MM-dd";
        }

        if (booleanFields.has(field)) {
          column.dataType = "boolean";
        }

        if (numericFields.has(field)) {
          column.dataType = "number";
          column.format = "#,##0";
        }

        if (currencyFields.has(field)) {
          column.format = {
            style: "currency",
            currency: "IDR",
            useGrouping: true,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          };
        }

        if (rightAlignedFields.has(field)) {
          column.alignment = "right";
        }

        if (field === "Action") {
          column.alignment = "center";
          column.width = 120;
        }

        if (field === "Tags") {
          column.width = 160;
        }

        if (field === "Item Description" || field === "Note") {
          column.width = 300;
          column.wordWrapEnabled = true;
          column.allowHiding = true;
        }

        return column;
      }),
    []
  );

  const handleExporting = useCallback((e) => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Inventory");

    exportDataGrid({
      component: e.component,
      worksheet,
      topLeftCell: { row: 2, column: 1 },
      autoFilterEnabled: true,
    }).then(() => {
      worksheet.getRow(2).font = { bold: true };
      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
          type: "application/octet-stream",
        });
        saveAs(blob, "inventory.xlsx");
      });
    });

    e.cancel = true;
  }, []);

  const handleRowReorder = useCallback(
    (e) => {
      const updated = [...gridData];
      const [movedRow] = updated.splice(e.fromIndex, 1);
      updated.splice(e.toIndex, 0, movedRow);
      setGridData(updated);
    },
    [gridData]
  );

  return (
    <div className="datagrid-wrapper">
      <div className="datagrid-header">
        <h1 className="datagrid-title">Inventory DataGrid</h1>
        <div className="datagrid-actions">
          <button type="button" className="help-toggle" onClick={handleOpenHelp}>
            Panduan DataGrid
          </button>
        </div>
      </div>
      {helpOpen && (
        <div
          className="help-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="help-drawer-title"
        >
          <div className="help-backdrop" onClick={handleCloseHelp} />
          <aside className="help-drawer" role="document">
            <header className="help-drawer-header">
              <h2 id="help-drawer-title">Panduan Aplikasi</h2>
              <button
                type="button"
                className="help-close"
                aria-label="Tutup panduan"
                onClick={handleCloseHelp}
              >
                &times;
              </button>
            </header>
            <div className="help-drawer-body">
              <GuideContent />
            </div>
            <footer className="help-drawer-footer">
              <button type="button" className="help-dismiss" onClick={handleCloseHelp}>
                Tutup
              </button>
            </footer>
          </aside>
        </div>
      )}
      <DataGrid
        dataSource={gridData}
        keyExpr="ID"
        showBorders
        columnAutoWidth
        rowAlternationEnabled
        allowColumnReordering
        allowColumnResizing
        repaintChangesOnly
        onExporting={handleExporting}
      >
        <RowDragging allowReordering showDragIcons onReorder={handleRowReorder} />
        <Selection mode="multiple" />
        <Paging defaultPageSize={10} />
        <Pager
          showPageSizeSelector
          allowedPageSizes={[10, 20, 50]}
          showNavigationButtons
          showInfo
        />
        <ColumnChooser enabled mode="select" allowSearch />
        <FilterRow visible applyFilter="auto" />
        <HeaderFilter visible allowSearch />
        <FilterPanel visible />
        <SearchPanel visible highlightCaseSensitive={false} width={240} placeholder="Cari item..." />
        <Export enabled allowExportSelectedData={false} />
        <Toolbar>
          <Item name="searchPanel" />
          <Item name="exportButton" />
          <Item name="columnChooserButton" />
        </Toolbar>
        {columns.map((props) => (
          <Column key={props.dataField} {...props} />
        ))}
      </DataGrid>
    </div>
  );
};

export default App;
























