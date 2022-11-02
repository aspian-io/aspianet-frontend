import React, { FC, useEffect, useId, useState, Fragment } from 'react';
import Button from '../../../common/Button';
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

interface IProps {
  columns: IColumn[];
  data: ITableDataType[];
  pagination: IAdminPaginationProps;
  onSelectColumns?: (selectedIds: string[]) => any;
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
  rowId: string | number;
}

const AdminTable: FC<IProps> = ({
  columns,
  data,
  pagination,
  onSelectColumns,
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

  useEffect(() => {
    if (onSelectColumns) onSelectColumns(checked);
  }, [checked, onSelectColumns]);

  return (
    <div className="rounded-3xl bg-light py-6 px-2 w-full">
      <div className="px-4 my-4">
        <AdminPagination
          totalPages={pagination.totalPages}
          baseUrl={pagination.baseUrl}
          currentPage={pagination.currentPage}
          onSubmit={pagination.onSubmit}
          onItemsPerPageChange={pagination.onItemsPerPageChange}
          queryString={pagination.queryString}
        />
      </div>
      <div className="rounded-3xl bg-light w-full max-h-[350px] sm:max-h-max  scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-light-900">
        <div
          className={`h-14 transition-all duration-300 overflow-hidden ${
            showDeleteBtn ? '' : 'h-0'
          }`}
        >
          <Button
            type="button"
            size="h-10"
            rounded="rounded-xl"
            variant="danger"
            extraCSSClasses={`px-4 mt-3 ml-4 text-sm transition-all duration-300 ${
              showDeleteBtn ? '' : 'invisible h-0'
            }`}
            onClick={() => {}}
          >
            Delete Items
          </Button>
        </div>
        <table className="border-separate border-spacing-y-2 border-spacing-x-px px-4 w-full rounded-2xl bg-light">
          <thead className="text-white text-xs sm:text-sm">
            <tr className="bg-primary rounded-2xl shadow-sm">
              <th className="px-3 py-2 text-center first:rounded-l-xl last:rounded-r-xl w-6">
                <input
                  id={selectAllInputId}
                  type="checkbox"
                  onChange={(e) => toggleCheckAll(e.target)}
                  className="w-4 h-4 text-primary-dark bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0"
                />
              </th>
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
                          onSubmit={c.search.onSubmit}
                          dropDownAlignment={`${i === 0 ? 'left' : 'right'}`}
                        />
                      )}
                      {c.filter?.toggle && (
                        <FilterToggle
                          onFilter={c.filter.toggle.onFilter}
                          onReset={c.filter.toggle.onReset}
                          dropDownAlignment={`${i === 0 ? 'left' : 'right'}`}
                        />
                      )}
                      {c.filter?.dateRange && (
                        <FilterDateRange
                          onFilter={c.filter.dateRange.onFilter}
                          onReset={c.filter.dateRange.onReset}
                          dropDownAlignment={`${i === 0 ? 'left' : 'right'}`}
                        />
                      )}
                      {c.filter?.textInput && (
                        <FilterText
                          placeholder={c.filter.textInput.placeholder}
                          onFilter={c.filter.textInput.onFilter}
                          onReset={c.filter.textInput.onReset}
                          dropDownAlignment={`${i === 0 ? 'left' : 'right'}`}
                        />
                      )}
                      {c.filter?.checkbox && (
                        <FilterCheckBox
                          items={c.filter?.checkbox.items}
                          onFilter={c.filter?.checkbox.onFilter}
                          onReset={c.filter?.checkbox.onReset}
                          dropDownAlignment={`${i === 0 ? 'left' : 'right'}`}
                        />
                      )}
                      {c.filter?.radioBtn && (
                        <FilterRadio
                          items={c.filter?.radioBtn.items}
                          onFilter={c.filter?.radioBtn.onFilter}
                          onReset={c.filter?.radioBtn.onReset}
                          dropDownAlignment={`${i === 0 ? 'left' : 'right'}`}
                        />
                      )}
                      {c.sort && (
                        <AdminSortForm
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
            {data.map((d, i) => (
              <tr className="shadow-sm rounded-2xl" key={i}>
                <td className="text-center p-3 bg-zinc-100 first:rounded-l-xl last:rounded-r-xl [&:not(:last-child)]:mb-0.5 truncate">
                  <input
                    name="table_record"
                    value={d.rowId}
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
                {Object.entries(d).map((v, i) => (
                  <Fragment key={i}>
                    {v[0] !== 'rowId' && (
                      <td className="p-3 bg-zinc-100 first:rounded-l-xl last:rounded-r-xl [&:not(:last-child)]:mb-0.5 truncate">
                        {v[1]}
                      </td>
                    )}
                  </Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 my-4">
        <AdminPagination
          totalPages={pagination.totalPages}
          baseUrl={pagination.baseUrl}
          currentPage={pagination.currentPage}
          onSubmit={pagination.onSubmit}
          onItemsPerPageChange={pagination.onItemsPerPageChange}
          queryString={pagination.queryString}
        />
      </div>
    </div>
  );
};

export default AdminTable;
