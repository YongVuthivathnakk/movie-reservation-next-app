import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllTickets = query({
  handler: async (ctx) => {
    return await ctx.db.query("tickets").collect()
  }
})


export const deleteOnId = mutation({
  args: {ids: v.array(v.id("tickets"))},
  handler: async (ctx, args) => {
    for(const id of args.ids) {
      await ctx.db.delete(id)
    }
  }
})