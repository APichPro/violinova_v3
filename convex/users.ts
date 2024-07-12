import { ConvexError, v } from "convex/values";
import { internalMutation, query } from "./_generated/server";

export const getUserById = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    return user;
  },
});


export const createUser = internalMutation({
  args: {
    email: v.string(),
    clerkId: v.string(),
    name: v.string(),
    subscription: v.optional(v.string()),
    phone: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  }, handler: async(ctx, args) => {
    await ctx.db.insert("users", {
      email: args.email,
      clerkId: args.clerkId,
      name: args.name,
      subscription: args.subscription,
      phone: args.phone,
      imageUrl: args.imageUrl,
      stared: []
    })
  }
})

export const updateUser = internalMutation({
  args: {
    clerkId: v.string(),
    imageUrl: v.string(),
    email: v.string(),
  },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(user._id, {
      imageUrl: args.imageUrl,
      email: args.email,
    });

    // const podcast = await ctx.db
    //   .query("podcasts")
    //   .filter((q) => q.eq(q.field("authorId"), args.clerkId))
    //   .collect();

    // await Promise.all(
    //   podcast.map(async (p) => {
    //     await ctx.db.patch(p._id, {
    //       authorImageUrl: args.imageUrl,
    //     });
    //   })
    // );
  },
});

export const deleteUser = internalMutation({
  args: { clerkId: v.string() },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.delete(user._id);
  },
});