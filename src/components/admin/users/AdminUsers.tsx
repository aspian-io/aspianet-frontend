import React from 'react';
import AdminTable, { ITableDataType } from '../common/table/AdminTable';

interface IDataType extends ITableDataType {
  name: string;
  age: number;
  description?: string;
}

const AdminUsers = () => {
  const data: IDataType[] = [
    {
      rowId: 1,
      name: 'Omid',
      age: 35,
      description: 'This is description for test',
    },
    {
      rowId: 2,
      name: 'Omid',
      age: 35,
      description: 'This is description for test',
    },
    {
      rowId: 3,
      name: 'Omid',
      age: 35,
      description: 'This is description for test',
    },
    {
      rowId: 4,
      name: 'Omid',
      age: 35,
      description: 'This is description for test',
    },
    {
      rowId: 5,
      name: 'Omid',
      age: 35,
      description: 'This is description for test',
    },
    {
      rowId: 6,
      name: 'Omid',
      age: 35,
      description: 'This is description for test',
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center pb-4 space-y-4">
      <AdminTable
        columns={[
          {
            title: 'Name',
            filter: {
              // checkbox: {
              //   items: [
              //     { label: 'Item 1', name: 'item1' },
              //     { label: 'Item 2', name: 'item2' },
              //     { label: 'Item3', name: 'Item 3' },
              //   ],
              //   onFilter: (values) => {
              //     console.log('Name checkbox filter chosen items: ', values);
              //   },
              //   onReset: () => {},
              // },
              dateRange: {
                onFilter: () => {},
                onReset: () => {},
              },
            },
            search: {
              onSubmit: (s) => {
                console.log('Name col search string is: ', s);
              },
            },
            sort: {
              onSortChange: (sort) => {
                console.log('Name col sort is: ', sort);
              },
              onReset: () => {},
            },
          },
          {
            title: 'Age',
            // filter: {
            //   checkbox: {
            //     items: [{label: 'Item 1', name: 'item1'}, {label: 'Item 2', name: 'item2'}, {label: 'Item3', name: 'Item 3'}],
            //     onFilter: (values) => {console.log('Name checkbox filter chosen items: ', values)},
            //     onReset: () => {}
            //   }
            // },
            search: {
              onSubmit: (s) => {
                console.log('Name col search string is: ', s);
              },
            },
            sort: {
              onSortChange: (sort) => {
                console.log('Name col sort is: ', sort);
              },
              onReset: () => {},
            },
          },
          {
            title: 'Description',
            // filter: {
            //   checkbox: {
            //     items: [{label: 'Item 1', name: 'item1'}, {label: 'Item 2', name: 'item2'}, {label: 'Item3', name: 'Item 3'}],
            //     onFilter: (values) => {console.log('Name checkbox filter chosen items: ', values)},
            //     onReset: () => {}
            //   }
            // },
            search: {
              onSubmit: (s) => {
                console.log('Name col search string is: ', s);
              },
            },
            // sort: {
            //   onSortChange: (sort) => {console.log('Name col sort is: ', sort)},
            //   onReset: () => {}
            // }
          },
        ]}
        data={data}
        pagination={{
          baseUrl: 'http://localhost:3000/admin/users',
          currentPage: 2,
          totalPages: 94,
          onSubmit: () => {},
          onItemsPerPageChange: () => {},
        }}
        onSelectColumns={(selectedIds) => {
          console.log('Selected Ids are: ', selectedIds);
        }}
      />
    </div>
  );
};

export default AdminUsers;
