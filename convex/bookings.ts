import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAllBookings = query({
  handler: async (ctx) => {
    return await ctx.db.query("bookings").collect();
  } 
})

export const deleteOnId = mutation({
  args: {ids: v.array(v.id("bookings")) },
  handler: async (ctx, args) => {
    for(const id of args.ids) {
      await ctx.db.delete(id);
    }
  }
})