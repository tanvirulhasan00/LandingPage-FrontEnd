import React, { useState } from "react";
import Button from "./button";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface EnhancedTableProps {
  columns: Column[];
  rows: any[];
  onRowClick?: (row: any) => void;
  rowsPerPage?: number;
  handleUpdate?: (item: number) => void;
  handleDelete?: (item: number) => void;
  show: string;
  updateBtnText?: string;
  hideDeleteBtn?: boolean;
  bg?: string;
}

const Table: React.FC<EnhancedTableProps> = ({
  columns,
  rows,
  onRowClick,
  rowsPerPage = 5,
  handleUpdate,
  handleDelete,
  show,
  updateBtnText,
  hideDeleteBtn,
  bg,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sortedRows = [...rows]?.sort((a, b) => {
    if (!sortKey) return 0;
    const valA = a[sortKey];
    const valB = b[sortKey];
    return sortAsc
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const totalPages = Math.ceil(rows?.length / rowsPerPage);
  const paginatedRows = sortedRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="overflow-x-auto shadow-md rounded-xl border">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100 dark:bg-black text-gray-700 dark:text-white text-sm uppercase">
          <tr className="text-start">
            {columns?.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 cursor-pointer text-start"
                onClick={() => handleSort(col.key)}
              >
                {col.label}
                {sortKey === col.key ? (sortAsc ? " ↑" : " ↓") : ""}
              </th>
            ))}
            {show == "payment" ? "" : <th className="text-center">Actions</th>}
          </tr>
        </thead>
        <tbody className="dark:bg-gray-700 dark:text-white text-gray-600">
          {paginatedRows && paginatedRows?.length > 0 ? (
            paginatedRows?.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onRowClick?.(row)}
                className="dark:hover:bg-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                {columns.map((col) => {
                  // --- support nested keys like "product.name" ---
                  const value = col.key.includes(".")
                    ? col.key.split(".").reduce((acc, key) => acc?.[key], row)
                    : row[col.key];

                  return (
                    <td key={col.key} className="px-4 py-2 border-t">
                      {/* {col.render ? col.render(value, row) : value} */}
                      {col.render ? col.render(value, row) : value || "No data"}
                    </td>
                  );
                })}
                {show === "payment" ? null : (
                  <td className="px-4 py-2 border-t">
                    <div className="flex gap-4 justify-center">
                      <Button onClick={() => handleUpdate?.(row.id)} bg={bg}>
                        {updateBtnText ? updateBtnText : "Update"}
                      </Button>
                      {hideDeleteBtn ? null : (
                        <Button
                          bg="bg-red-600"
                          className="hover:bg-red-700"
                          onClick={() => {
                            const confirmDelete = window.confirm(
                              "Are you sure you want to delete this item?"
                            );
                            if (confirmDelete) {
                              handleDelete?.(row.id);
                            }
                          }}
                        >
                          {"Delete"}
                        </Button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (show === "payment" ? 0 : 1)}
                className="text-center py-4 text-gray-500"
              >
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex items-center p-4 gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
