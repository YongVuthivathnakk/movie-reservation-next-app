"use client";

import { useGetAllBookings } from '@/hooks/bookings/use-get-all-bookings';
import { useMutation } from 'convex/react';
import React from 'react'
import { api } from '../../../../convex/_generated/api';
import { DataTable } from '../components/table/data-table';
import { Button } from '@/components/ui/button';
import { columns } from '../components/table/columns/bookings';

function BookingsDashboard() {

  const {bookings, isLoading} = useGetAllBookings();
  const deleteData = useMutation(api.bookings.deleteOnId);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Bookings Table</h1>
        <DataTable idType="bookings" columns={columns} data={bookings || []} handleDelete={deleteData}>
          <Button>
            Click Me
          </Button>
        </DataTable>
    </div>
  );
}

export default BookingsDashboard;
