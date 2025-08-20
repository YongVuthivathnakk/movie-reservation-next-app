import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";




// Query:
export const current = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (userId === null) {
      return null;
    }

    return await ctx.db.get(userId);
  }
})



// Mutation:

  // Set default role

export const setUserRole = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if(userId === null) {
      throw new Error ("not authenthicated");
    }
    await ctx.db.patch(userId, {role: "user"});
  }
})



  // Update Phone Number
export const updatePhone = mutation({
  args: { phone: v.string() },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if(userId === null) {
      throw new Error("not authenthicated");
    }
    await ctx.db.patch(userId, { phone: args.phone});
  }
})

  // Verify Time for phone
export const phoneVerificationTime = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if(userId === null) {
      throw new Error("not authenthicated");
    }
    await ctx.db.patch(userId, {phoneVerificationTime: Date.now()})
  }
})

