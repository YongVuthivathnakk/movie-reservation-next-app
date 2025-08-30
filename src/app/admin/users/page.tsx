"use client"

import React from 'react'
import { DataTable } from '../components/table/data-table'
import { useGetAllUsers } from '@/hooks/users/use-get-all-users'
import { columns } from '../components/table/columns/users';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { UsersDataTable } from '../components/table/users-data-table';

function UserDashboard() {

  const {users, isLoading} = useGetAllUsers();

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Movie Table</h1>
        <UsersDataTable columns={columns} data={users || []}  />
    </div>
  )
}

export default UserDashboard
