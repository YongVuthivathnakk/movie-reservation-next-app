import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


// Get All Movies
export const getAllMovies = query({
  handler: async (ctx) => {
    return await ctx.db.query("movies").collect();
  }
});

// Get All data with pagination
export const getMovies = query({
  args: {
    paginationOpts: v.any(),
  },
  handler: async (ctx, args) => {

    return await ctx.db
      .query("movies")
      .order("desc")
      .paginate(args.paginationOpts)
  }
})


// Add Movies
export const addMovies = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    duration: v.number(),
    genre: v.string(),
    posterUrl: v.optional(v.string()),
    pricing: v.record(v.string(), v.number()),
    releaseDate: v.string(),
    classification: v.string(),
  },
  handler: async (ctx, args) => {
    const movieId = await ctx.db.insert("movies", {
      title: args.title,
      description: args.description ?? "",
      duration: args.duration,
      genre: args.genre,
      posterUrl: args.posterUrl ?? "",
      pricing: args.pricing ?? {},
      releaseDate: args.releaseDate,
      classification: args.classification,
    });

    return movieId;
  },
});

// Delete data based on ID

export const deleteOnId = mutation({
  args: {ids: v.array(v.id("movies")) },
  handler: async (ctx, args) => {
    for (const id of args.ids) {
      await ctx.db.delete(id);
    }
  }
});