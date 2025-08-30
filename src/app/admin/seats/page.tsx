"use client";

import React from 'react'
import { DataTable } from '../components/table/data-table'
import { Button } from '@/components/ui/button'
import { useGetAllSeats } from '@/hooks/seats/use-get-all-seats';
import { columns } from '../components/table/columns/seats';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';

function SeatsDashboard() {

  const {seats, isLoading} = useGetAllSeats();
  const deleteData = useMutation(api.seats.deleteOnId);
  

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Seats Table</h1>
        <DataTable idType="seats" columns={columns} data={seats || []} handleDelete={deleteData}>
          <Button>
            Click Me
            </ Button>
        </DataTable>
    </div>
  )
}

export default SeatsDashboard
