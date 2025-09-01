"use client";

import React from 'react'
import { DataTable } from '../components/table/data-table';
import { Button } from '@/components/ui/button';
import { useGetAllShowtimes } from '@/hooks/show-times/use-get-all-show-times';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { columns } from '../components/table/columns/show-times';
import { CreateShowtimeButton } from './components/create-showtime-button';

function showTimesDashboard() {

  const {showtimes, isLoading} = useGetAllShowtimes();
  const deleteData = useMutation(api.showTimes.deleteOnId);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Showtimes Table</h1>
        <DataTable idType="showtimes" columns={columns} data={showtimes || []} handleDelete={deleteData}>
          <CreateShowtimeButton />
        </DataTable>
    </div>
  );
}

export default showTimesDashboard
