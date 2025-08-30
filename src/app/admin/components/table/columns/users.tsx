import { ColumnDef } from "@tanstack/react-table";
import { Id } from "../../../../../../convex/_generated/dataModel";

export type User = {
  _id: Id<"users">;
  _creationTime: number;
  name?: string | undefined;
  image?: string | undefined;
  email?: string | undefined;
  emailVerificationTime?: number | undefined;
  phone?: string | undefined;
  phoneVerificationTime?: number | undefined;
  isAnonymous?: boolean | undefined;
  role?: "user" | "admin" | undefined;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "_id",
    header: "_id",
    cell: ({ row }) => {
      return (
        <div className="max-w-[200px] truncate" title={row.original._id}>
          {row.original._id}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <div className={`max-w-[150px] truncate ${row.original.image === undefined ? "text-destructive" : ""}`} title={row.original.image}>
          {row.original.image ? row.original.image : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "emailVerificationTime",
    header: "Email_Verification_Time",
    cell: ({ row }) => {
      return (
        <p
          className={
            row.original.emailVerificationTime  === undefined
              ? "text-destructive"
              : ""
          }
        >
          {row.original.emailVerificationTime
            ? new Date(row.original.emailVerificationTime).toLocaleString()
            : "N/A"}
        </p>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "phoneVerificationTime",
    header: "Phone_Verification_Time",
    cell: ({ row }) => {
      return (
        <p
          className={
            row.original.phoneVerificationTime === undefined
              ? "text-destructive"
              : ""
          }
        >
          {row.original.phoneVerificationTime
            ? new Date(
                Number(row.original.phoneVerificationTime)
              ).toLocaleString()
            : "N/A"}
        </p>
      );
    },
  },
  {
    accessorKey: "isAnonymous",
    header: "is_Anonymous",
    cell: ({ row }) => {
      return (
        <p className={row.original.isAnonymous === undefined ? "text-destructive" : ""}>
          {row.original.isAnonymous ? row.original.isAnonymous : "N/A"}
        </p>
      )
    }
  },

  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      return (
        <p
          className={
            row.original.role === "user"
              ? "text-emerald-500 font-semibold"
              : "text-yellow-400 font-semibold"
          }
        >
          {row.original.role}
        </p>
      );
    },
  },
  {
    accessorKey: "_creationTime",
    header: "_creationTime",
    cell: ({ row }) => {
      const date = new Date(row.original._creationTime);
      return date.toLocaleString();
    },
  },
];
