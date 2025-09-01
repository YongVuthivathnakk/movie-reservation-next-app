import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllRooms = query({
  handler: async (ctx) => {
    return await ctx.db.query("rooms").collect();
  },
});

export const deleteOnId = mutation({
  args: { ids: v.array(v.id("rooms")) },
  handler: async (ctx, args) => {
    for (const id of args.ids) {
      await ctx.db.delete(id);
    }
  },
});

export const addRooms = mutation({
  args: {
    name: v.string(),
    capacity: v.number(),
    type: v.union(v.literal("standard"), v.literal("VIP"), v.literal("IMAX")),
  },
  handler: async (ctx, args) => {
    const roomId = await ctx.db.insert("rooms", {
      name: args.name,
      capacity: args.capacity,
      type: args.type,
    });
    return roomId;
  },
});

export const editRoom = mutation({
  args: {
    _id: v.id("rooms"),
    name: v.string(),
    capacity: v.number(),
    type: v.union(v.literal("standard"), v.literal("VIP"), v.literal("IMAX")),
  },
  handler: async (ctx, args) => {
    const roomId = await ctx.db.get(args._id);
    if(!roomId) {
      throw new Error("Room not found");
    }

    await ctx.db.patch(args._id, {
      name: args.name,
      capacity: args.capacity,
      type: args.type
    })

    return await ctx.db.get(args._id);
  },
});


