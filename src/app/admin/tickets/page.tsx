"use client";

import { useGetAllTickets } from '@/hooks/tickets/use-get-all-ticket';
import { useMutation } from 'convex/react';
import React from 'react'
import { api } from '../../../../convex/_generated/api';
import { DataTable } from '../components/table/data-table';
import { Button } from '@/components/ui/button';
import { columns } from '../components/table/columns/tickets';

function TicketsDashboard() {
  const {tickets, isLoading} = useGetAllTickets();
  const deleteData = useMutation(api.tickets.deleteOnId);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Movie Table</h1>
        <DataTable idType="tickets" columns={columns} data={tickets || []} handleDelete={deleteData}>
          <Button>
            Click Me
          </Button>
        </DataTable>
    </div>
  );
}

export default TicketsDashboard
