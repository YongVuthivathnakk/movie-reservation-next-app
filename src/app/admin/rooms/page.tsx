"use client";

import React from 'react'
import { DataTable } from '../components/table/data-table'
import { Button } from '@/components/ui/button'
import { AddMovieButton } from '../movies/components/add-movie-button'
import { useGetAllRooms } from '@/hooks/rooms/use-get-all-rooms'
import { columns } from '../components/table/columns/rooms'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { AddRoomButton } from './components/add-room-buttom';

function RoomsDashboard() {

  const {rooms, isLoading} = useGetAllRooms();
  const deleteData = useMutation(api.rooms.deleteOnId)

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Rooms Table</h1>
        <DataTable columns={columns} data={rooms || []} idType={"rooms"} handleDelete={deleteData}>
          <AddRoomButton />
        </DataTable>
    </div> 
  )
}

export default RoomsDashboard
