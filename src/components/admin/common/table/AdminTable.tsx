import React, { FC, useEffect, useId, useState, Fragment } from 'react';
import Button from '../../../common/Button';
import LoadingSpinner from '../../../common/LoadingSpinner';
import AdminPagination, {
  IAdminPaginationProps,
} from './sub-components/AdminPagination';
import AdminSearchForm, {
  IAdminSearchProps,
} from './sub-components/AdminSearchForm';
import AdminSortForm, { IAdminSortProps } from './sub-components/AdminSortForm';
import FilterCheckBox, {
  IFilterCheckBoxProps,
} from './sub-components/filter-children/FilterCheckBox';
import FilterDateRange, {
  IFilterDateRangeProps,
} from './sub-components/filter-children/FilterDateRange';
import FilterRadio, {
  IFilterRadioProps,
} from './sub-components/filter-children/FilterRadio';
import FilterText, {
  IFilterTextProps,
} from './sub-components/filter-children/FilterText';
import FilterToggle, {
  IFilterToggleProps,
} from './sub-components/filter-children/FilterToggle';
import { ClaimsEnum } from '../../../../models/auth/common';
import { AuthGuard } from '../../../common/AuthGuard';

interface IProps {
  columns: IColumn[];
  data: ITableDataType[];
  pagination: IAdminPaginationProps;
  onSelectColumns?: (selectedIds: string[]) => any;
  loading?: boolean;
  selectable?: boolean;
  onBulkDeleteButtonClick?: Function;
  trashButton?: boolean;
  trashButtonClaims?: ClaimsEnum[];
  trashBtnOnClick?: Function;
  showChildren?: boolean;
  addButton?: boolean;
  addButtonClaims?: ClaimsEnum[];
  onAddClick?: Function;
  emptyTrashButton?: boolean;
  onEmptyTrashButtonClick?: Function;
}

interface IColumn {
  title: string;
  search?: IAdminSearchProps;
  filter?: {
    checkbox?: IFilterCheckBoxProps;
    dateRange?: IFilterDateRangeProps;
    radioBtn?: IFilterRadioProps;
    textInput?: IFilterTextProps;
    toggle?: IFilterToggleProps;
  };
  sort?: IAdminSortProps;
}

export interface ITableDataType extends Record<string, any> {
  id: string | number;
  children?: any[];
}

const AdminTable: FC<IProps> = ({
  columns,
  data,
  pagination,
  onSelectColumns,
  loading = false,
  selectable = true,
  onBulkDeleteButtonClick = () => {},
  trashButton = false,
  trashButtonClaims = [],
  trashBtnOnClick,
  emptyTrashButton = false,
  onEmptyTrashButtonClick = () => {},
  showChildren = false,
  addButton = false,
  addButtonClaims = [],
  onAddClick = () => {},
}) => {
  const [checked, setChecked] = useState<string[]>([]);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const selectAllInputId = useId();

  function checkIfSomeChecked() {
    const checkboxes: NodeListOf<HTMLInputElement> = document.getElementsByName(
      'table_record'
    ) as NodeListOf<HTMLInputElement>;
    let someChecked = false;
    checkboxes.forEach((ch) => {
      if (ch.checked) someChecked = true;
    });
    if (!someChecked) setShowDeleteBtn(false);
  }

  function checkIfAllChecked() {
    const selectAllInput = document.getElementById(
      selectAllInputId
    ) as HTMLInputElement;
    const checkboxes: NodeListOf<HTMLInputElement> = document.getElementsByName(
      'table_record'
    ) as NodeListOf<HTMLInputElement>;
    let allChecked = true;
    checkboxes.forEach((ch) => {
      if (!ch.checked) allChecked = false;
    });
    if (allChecked) selectAllInput.checked = true;
  }

  function toggleCheckAll(source: HTMLInputElement) {
    const checkboxes: NodeListOf<HTMLInputElement> = document.getElementsByName(
      'table_record'
    ) as NodeListOf<HTMLInputElement>;
    source.checked ? setShowDeleteBtn(true) : setShowDeleteBtn(false);
    checkboxes.forEach((ch) => {
      ch.checked = source.checked;
      ch.addEventListener('selectAll', () => {
        ch.checked
          ? setChecked((prev) => Array.from(new Set([...prev, ch.value])))
          : setChecked([]);
      });
      ch.dispatchEvent(new Event('selectAll'));
    });
  }

  function tableTdBlock(
    data: ITableDataType[],
    childLevel: number = 0
  ): JSX.Element[] | null {
    return data.length > 0
      ? data.map((d, i) => (
          <Fragment key={i}>
            <tr className="hoverable:hover:shadow-md hoverable:hover:-translate-y-0.5 transition-all duration-200 rounded-xl">
              {selectable && (
                <td className="text-center p-3 bg-zinc-100 first:rounded-l-xl last:rounded-r-xl [&:not(:last-child)]:mb-0.5 truncate">
                  <input
                    name="table_record"
                    value={d.id}
                    type="checkbox"
                    onChange={(e) => {
                      e.target.checked
                        ? setChecked([...checked, e.target.value])
                        : setChecked([
                            ...checked.filter((i) => i !== e.target.value),
                          ]);
                      if (!e.target.checked) {
                        const selectAllInput = document.getElementById(
                          selectAllInputId
                        ) as HTMLInputElement;
                        selectAllInput.checked = false;
                      } else {
                        setShowDeleteBtn(true);
                      }

                      checkIfSomeChecked();
                      checkIfAllChecked();
                    }}
                    className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0"
                  />
                </td>
              )}
              {Object.entries(d).map(
                (v, idx) =>
                  v[0] !== 'id' &&
                  v[0] !== 'children' && (
                    <td
                      className="p-2 bg-zinc-100 first:rounded-l-xl last:rounded-r-xl [&:not(:last-child)]:mb-0.5 max-w-[16rem]"
                      key={idx}
                    >
                      {childLevel === 0 && v[1]}
                      {childLevel > 0 && (
                        <>
                          <div className="flex justify-start items-center truncate">
                            {idx === 1 &&
                              [...Array(childLevel)].map((_, arrIdx) => {
                                return <Fragment key={arrIdx}>&emsp;</Fragment>;
                              })}
                            {idx === 1 && (
                              <>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  className="w-4 h-4 -rotate-90 text-primary"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M2.232 12.207a.75.75 0 011.06.025l3.958 4.146V6.375a5.375 5.375 0 0110.75 0V9.25a.75.75 0 01-1.5 0V6.375a3.875 3.875 0 00-7.75 0v10.003l3.957-4.146a.75.75 0 011.085 1.036l-5.25 5.5a.75.75 0 01-1.085 0l-5.25-5.5a.75.75 0 01.025-1.06z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="ml-2">{v[1]}</span>
                              </>
                            )}
                            {idx !== 1 && v[1]}
                          </div>
                        </>
                      )}
                    </td>
                  )
              )}
            </tr>
            {showChildren &&
              d.children &&
              d.children.length > 0 &&
              tableTdBlock(d.children, childLevel + 1)}
          </Fragment>
        ))
      : null;
  }

  useEffect(() => {
    if (onSelectColumns) onSelectColumns(checked);
  }, [checked, onSelectColumns]);

  useEffect(() => {
    setChecked([]);
    setShowDeleteBtn(false);
    document.querySelectorAll('input').forEach((i) => (i.checked = false));
  }, [data.length]);

  return (
    <div className="rounded-3xl bg-light py-6 px-2 w-full">
      <div className="px-4 my-4">
        {pagination && !loading && data && (
          <AdminPagination
            totalPages={pagination.totalPages}
            baseUrl={pagination.baseUrl}
            currentPage={pagination.currentPage}
            onSubmit={pagination.onSubmit}
            onItemsPerPageChange={pagination.onItemsPerPageChange}
            queryString={pagination.queryString}
            disabled={!data.length}
          />
        )}
      </div>
      <div className="rounded-3xl bg-light w-full max-h-[350px] sm:max-h-max scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-light-900">
        <div className="flex justify-start items-center min-w-max">
          {emptyTrashButton && (
            <Button
              type="button"
              size="h-9"
              rounded="rounded-xl"
              variant="danger"
              extraCSSClasses="px-4 ml-4 mt-2 text-xs sm:text-sm transition-all duration-300 flex items-center"
              onClick={() => {
                onEmptyTrashButtonClick();
              }}
            >
              <span>Empty Trash</span>
            </Button>
          )}
          <AuthGuard claims={addButtonClaims} redirect={false}>
            {addButton && (
              <Button
                type="button"
                size="h-9"
                rounded="rounded-xl"
                variant="primary"
                extraCSSClasses="pl-2 pr-4 ml-4 mt-2 text-xs sm:text-sm transition-all duration-300 flex items-center"
                onClick={() => {
                  onAddClick();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                >
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
                <span>Add</span>
              </Button>
            )}
          </AuthGuard>
          <AuthGuard claims={trashButtonClaims} redirect={false}>
            {trashButton && trashBtnOnClick && (
              <Button
                type="button"
                size="h-9"
                rounded="rounded-xl"
                variant="primary"
                extraCSSClasses="px-4 ml-4 mt-2 text-xs sm:text-sm transition-all duration-300"
                onClick={() => {
                  trashBtnOnClick();
                }}
              >
                Trash
              </Button>
            )}
          </AuthGuard>
          {selectable && (
            <div
              className={`h-11 transition-all duration-300 overflow-hidden mt-2 pr-1 py-1 ${
                showDeleteBtn ? '' : 'invisible opacity-0'
              }`}
            >
              <Button
                type="button"
                size="h-9"
                rounded="rounded-xl"
                variant="danger"
                extraCSSClasses={`px-4 ml-4 text-xs sm:text-sm transition-all duration-300 ${
                  showDeleteBtn ? '' : 'invisible opacity-0'
                }`}
                onClick={() => onBulkDeleteButtonClick()}
              >
                Bulk Delete
              </Button>
            </div>
          )}
        </div>
        <table className="border-separate border-spacing-y-2 border-spacing-x-px px-4 w-full rounded-2xl bg-light">
          <thead className="text-white text-xs sm:text-sm">
            <tr className="bg-primary rounded-2xl shadow-sm">
              {selectable && (
                <th className="px-3 py-2 text-center first:rounded-l-xl last:rounded-r-xl w-6">
                  <input
                    id={selectAllInputId}
                    type="checkbox"
                    onChange={(e) => toggleCheckAll(e.target)}
                    className="w-4 h-4 text-primary-dark bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-100"
                    disabled={!data.length}
                  />
                </th>
              )}
              {columns.map((c, i) => (
                <th
                  className="px-3 py-2 text-left first:rounded-l-xl last:rounded-r-xl"
                  key={i}
                >
                  <div className="flex items-center">
                    <span>{c.title}</span>
                    <div className="flex flex-1 justify-end items-center ml-3">
                      {c.search && (
                        <AdminSearchForm
                          initialValue={c.search.initialValue}
                          onSubmit={c.search.onSubmit}
                          dropDownAlignment={`${i === 0 ? 'left' : 'right'}`}
                        />
                      )}
                      {c.filter?.toggle && (
                        <FilterToggle
                          initialValue={c.filter.toggle.initialValue}
                          onFilter={c.filter.toggle.onFilter}
                          onReset={c.filter.toggle.onReset}
                          dropDownAlignment={`${i === 0 ? 'left' : 'right'}`}
                        />
                      )}
                      {c.filter?.dateRange && (
                        <FilterDateRange
                          initialValue={c.filter.dateRange.initialValue}
                          onFilter={c.filter.dateRange.onFilter}
                          onReset={c.filter.dateRange.onReset}
                          dropDownAlignment={`${i === 0 ? 'left' : 'right'}`}
                        />
                      )}
                      {c.filter?.textInput && (
                        <FilterText
                          initialValue={c.filter.textInput.initialValue}
                          placeholder={c.filter.textInput.placeholder}
                          onFilter={c.filter.textInput.onFilter}
                          onReset={c.filter.textInput.onReset}
                          dropDownAlignment={`${i === 0 ? 'left' : 'right'}`}
                        />
                      )}
                      {c.filter?.checkbox && (
                        <FilterCheckBox
                          initialValue={c.filter.checkbox.initialValue}
                          items={c.filter?.checkbox.items}
                          onFilter={c.filter?.checkbox.onFilter}
                          onReset={c.filter?.checkbox.onReset}
                          dropDownAlignment={`${i === 0 ? 'left' : 'right'}`}
                        />
                      )}
                      {c.filter?.radioBtn && (
                        <FilterRadio
                          initialValue={c.filter.radioBtn.initialValue}
                          items={c.filter?.radioBtn.items}
                          onFilter={c.filter?.radioBtn.onFilter}
                          onReset={c.filter?.radioBtn.onReset}
                          dropDownAlignment={`${i === 0 ? 'left' : 'right'}`}
                        />
                      )}
                      {c.sort && (
                        <AdminSortForm
                          initialValue={c.sort.initialValue}
                          onSortChange={c.sort.onSortChange}
                          onReset={c.sort.onReset}
                          dropDownAlignment={`${i === 0 ? 'left' : 'right'}`}
                        />
                      )}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-xs sm:text-sm">
            {loading && (
              <tr className="shadow-sm rounded-xl bg-zinc-100 text-primary p-3 w-full">
                <td
                  className="text-center p-3 bg-zinc-100 w-full rounded-xl h-72 sm:h-80"
                  colSpan={columns.length + 1}
                >
                  <div className="flex justify-center items-center w-full">
                    <LoadingSpinner className="w-8 h-8 text-primary" />
                  </div>
                </td>
              </tr>
            )}
            {!data.length && !loading && (
              <tr className="shadow-sm rounded-xl bg-zinc-100 text-primary p-3 w-full">
                <td
                  className="text-center p-3 bg-zinc-100 w-full rounded-xl"
                  colSpan={columns.length + 1}
                >
                  No Records
                </td>
              </tr>
            )}
            {tableTdBlock(data)}
          </tbody>
        </table>
      </div>
      <div className="px-4 my-4">
        {pagination && !loading && data && (
          <AdminPagination
            totalPages={pagination.totalPages}
            baseUrl={pagination.baseUrl}
            currentPage={pagination.currentPage}
            onSubmit={pagination.onSubmit}
            onItemsPerPageChange={pagination.onItemsPerPageChange}
            queryString={pagination.queryString}
            disabled={!data.length}
          />
        )}
      </div>
    </div>
  );
};

export default AdminTable;
