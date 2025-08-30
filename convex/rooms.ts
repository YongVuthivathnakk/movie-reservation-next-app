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
    for(const id of args.ids) {
      await ctx.db.delete(id);
    }
  },
});

export const addRooms = mutation({
  args: {
    name: v.string(),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    const roomId = await ctx.db.insert("rooms", {
      name: args.name,
      type: args.type,
    });
    return roomId;
  }
})