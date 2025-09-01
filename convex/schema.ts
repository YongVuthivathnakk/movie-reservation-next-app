import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,

  // users Table
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    role: v.optional(v.union(v.literal("user"), v.literal("admin"))),
  }).index("email", ["email"]),

  // movies Table
  movies: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    duration: v.number(),
    genre: v.string(),
    posterUrl: v.optional(v.string()),
    pricing: v.record(v.string(), v.number()),
    releaseDate:  v.optional(v.string()),
    classification: v.string(),
  }),

  // rooms Table
  rooms: defineTable({
    name: v.string(),
    capacity: v.number(),
    type: v.union(
      v.literal("standard"),
      v.literal("VIP"),
      v.literal("IMAX")
    ),
  }),

  // seats Table
  seats: defineTable({
    roomId: v.id("rooms"),
    number: v.number(),
    seatType: v.union(v.literal("normal"), v.literal("VIP")),
    row: v.string(),
    isBooked: v.boolean(),
  }),

  // showtimes
  showtimes: defineTable({
    movieId: v.id("movies"),
    roomId: v.id("rooms"),
    startTime: v.number(),
    endTime: v.optional(v.number()),
  })
    .index("by_movie", ["movieId"])
    .index("by_room", ["roomId"]),

  // bookings Table
  bookings: defineTable({
    userId: v.id("users"),
    showtimeId: v.id("showtimes"),
    roomId: v.id("rooms"),
    seatId: v.array(v.id("seats")),
    totalPrice: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("expired")
    ),
    paymentMethod: v.optional(
      v.union(
        v.literal("cash"),
        v.literal("credit_card"),
        v.literal("digital_wallet")
      )
    ),
    paymentStatus: v.optional(v.union(v.literal("unpaid"), v.literal("paid"))),
  }),

  
  // tickets Table
  tickets: defineTable({
    bookingId: v.id("bookings"),
    seatId: v.id("seats"),
    userId: v.id("users"),
    pricePaid: v.number(),
  })
  .index("by_booking", ["bookingId"])
  .index("by_seat", ["seatId"]),
});
export default schema;
