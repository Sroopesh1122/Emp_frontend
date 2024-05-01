import React, { useState } from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
} from "react-table";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl, getFormattedDateAndTime } from "../../utils/baseUrl";
import { useQuery } from "react-query";
import CustomConfirm from "../../components/CustomConfirm";
import { CircleLoaderComponent } from "../../components/Loader";

function GlobalFilter({ filter, setFilter }) {
  return (
    <div className="flex justify-end text-black">
      Search:{" "}
      <input
        className="ml-2 bg-transparent border border-black rounded-sm placeholder:text-black placeholder:text-[1rem]"
        placeholder="Seach Table..."
        value={filter || ""}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
    </div>
  );
}

function Table({ columns, data }) {
  const navigate = useNavigate();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setGlobalFilter,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter } = state;

  return (
    <>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => navigate("/emp/create")}
          type="button"
          className="border border-orange-100 px-1 py-0 text-xs text-black rounded-md bg-orange-400 font-semibold"
        >
          Create Employee
        </button>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <div className="w-full h-[63vh] mt-4 overflow-auto text-black">
        <table className="h-full w-full" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{ width: column.width || "auto" }}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <IoIosArrowRoundDown />
                        ) : (
                          <IoIosArrowRoundUp />
                        )
                      ) : (
                        <HiArrowsUpDown />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{ width: cell.column.width || "auto" }}
                      >
                        <div
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {cell.render("Cell", { row })}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end items-center gap-4 text-black">
        <GrFormPrevious
          className={!canPreviousPage ? "" : "cursor-pointer"}
          onClick={() => previousPage()}
        />
        <GrFormNext
          className={!canNextPage ? "" : "cursor-pointer"}
          onClick={() => nextPage()}
        />
        <span className="text-xs">
          Page
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
      </div>
    </>
  );
}
function EmpList() {
  const navigate = useNavigate();

  const [id, setId] = useState("");

  const getEmpData = async () => {
    const res = await axios.get(`${baseUrl}/emp/`);
    console.log(res.data);
    return res.data;
  };

  const { data, isLoading, isError,error, refetch } = useQuery("empdata", getEmpData);

  const columns = React.useMemo(
    () => [
      {
        Header: "Emp Id",
        accessor: "_id",
        width: 100,
      },
      {
        Header: "Image",
        accessor: "profile",
        width: 150,
        Cell: ({ value }) => (
          <div className="avatar flex justify-center p-2">
            <div className="w-16 rounded-full ring-1 object-cover">
              <img className="h-full w-full " src={value} alt="img" />
            </div>
          </div>
        ),
      },
      {
        Header: "Name",
        accessor: "name",
        width: 250,
      },

      {
        Header: "Email",
        accessor: "email",
        width: 250,
      },
      {
        Header: "Mobile No",
        accessor: "mobile",
        width: 150,
      },
      {
        Header: "Designation",
        accessor: "designation",
        width: 100,
      },
      {
        Header: "Gender",
        accessor: "gender",
        width: 50,
      },
      {
        Header: "Course",
        accessor: "course",
        Cell: ({ value }) => (
          <div className="flex flex-col items-center justify-center text-sm">
            {value?.map((data) => (
              <span className="w-full">
                {""}
                {data}
              </span>
            ))}
          </div>
        ),
        width: 100,
      },
      {
        Header: "Created date",
        accessor: "createdAt",
        Cell: ({ value }) => (
          <div className="flex items-center justify-center text-sm">
            {getFormattedDateAndTime(value)}
          </div>
        ),
      },
      {
        Header: "Action",
        accessor: "aid",
        Cell: ({ val, row }) => (
          <div className="flex justify-center gap-2">
            <FaRegEdit
              className="cursor-pointer hover:text-orange-400"
              //   onClick={() => alert(JSON.stringify(row.original))
              onClick={() => {
                navigate(`/emp/update/${row.original._id}`);
              }}
            />
            <MdDelete
              className="cursor-pointer hover:text-red-500"
              onClick={() => {
                setId(row.original._id);
                document.getElementById("my_modal_1").showModal();
              }}
            />
          </div>
        ),
      },
    ],
    [navigate]
  );

  if (isLoading) {
    return <div className="w-full min-h-full flex justify-center items-center"><CircleLoaderComponent/></div>;
  }

  if (isError) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <>
      <Table columns={columns} data={data} />
      <CustomConfirm id={id} refetch={refetch} />
    </>
  );
}

export default EmpList;
