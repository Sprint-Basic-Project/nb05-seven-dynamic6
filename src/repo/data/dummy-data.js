import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
const hash = (s) => bcrypt.hashSync(s, 10);

const now = () => new Date().toISOString();

const EXERCISES = ["RUNNING", "SWIMMING", "CYCLING"];

// USERS
export const USERS = Array.from({ length: 10 }).map((_, i) => ({
  id: uuid(),
  nickname: `user${i}`,
  passwordHash: `password_${i}`,
  createdAt: now(),
  updatedAt: now(),
  deletedAt: null,
}));

// GROUPS
export const GROUPS = Array.from({ length: 10 }).map((_, i) => ({
  id: uuid(),
  name: `group${i}`,
  description: `Description for group ${i}`,
  imageUrl: `https://example.com/group${i}.jpg`,
  goalRep: Math.floor(Math.random() * 100) + 1,
  createdAt: now(),
  updatedAt: now(),
  deletedAt: null,
  likeCount: Math.floor(Math.random() * 100),
  recordCount: Math.floor(Math.random() * 50),
  discordWebhookUrl: `https://discord.com/api/webhooks/group${i}`,
  discordInviteUrl: `https://discord.gg/invite${i}`,
  userId: USERS[i % USERS.length].id,
}));

// USER_JOIN_GROUPS
export const USER_JOIN_GROUPS = Array.from({ length: 10 }).map((_, i) => ({
  id: uuid(),
  joinedAt: now(),
  updatedAt: now(),
  deletedAt: null,
  groupId: GROUPS[i % GROUPS.length].id,
  userId: USERS[i % USERS.length].id,
}));

// RECORDS
export const RECORDS = Array.from({ length: 10 }).map((_, i) => ({
  id: uuid(),
  exerciseType: EXERCISES[i % EXERCISES.length],
  description: `Record ${i} description`,
  time: Math.floor(Math.random() * 120) + 10,
  distance: Math.random() * 10 + 1,
  createdAt: now(),
  updatedAt: now(),
  deletedAt: null,
  userJoinGroupId: USER_JOIN_GROUPS[i % USER_JOIN_GROUPS.length].id,
  groupId: GROUPS[i % GROUPS.length].id,
  userId: USERS[i % USERS.length].id,
}));

// RECORD_IMAGES
export const RECORD_IMAGES = Array.from({ length: 10 }).map((_, i) => ({
  id: uuid(),
  imageUrl: `https://example.com/record${i}.jpg`,
  recordId: RECORDS[i % RECORDS.length].id,
}));

// TAGS
export const TAGS = Array.from({ length: 10 }).map((_, i) => ({
  id: uuid(),
  name: `Tag${i}`,
  createdAt: now(),
  updatedAt: now(),
  groupId: GROUPS[i % GROUPS.length].id,
}));
