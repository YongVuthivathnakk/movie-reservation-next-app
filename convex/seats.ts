import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllSeats = query({
  handler: async (ctx) => {
    return await ctx.db.query("seats").collect();
  }
})

export const deleteOnId = mutation({
  args: {ids: v.array(v.id("seats")) },
  handler: async (ctx, args) => {
    for(const id of args.ids) {
      await ctx.db.delete(id);
    }
  }
});

