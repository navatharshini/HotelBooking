import { clerkClient } from '@clerk/clerk-sdk-node';
import User from '../models/User.js';

export const syncUser = async (userId) => {
  const existingUser = await User.findById(userId);
  if (existingUser) return existingUser;

  const clerkUser = await clerkClient.users.getUser(userId);

  const newUser = new User({
    _id: clerkUser.id,
    username: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
    email: clerkUser.emailAddresses[0]?.emailAddress,
    image: clerkUser.imageUrl,
    role: 'user', // or set based on condition
    recentSearchedCities: []
  });

  await newUser.save();
  return newUser;
};
