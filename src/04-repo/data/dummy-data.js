import { v4 as uuid } from "uuid";

const now = () => new Date().toISOString();

const EXERCISES = ["RUNNING", "SWIMMING", "CYCLING"];

// USERS
export const USERS = Array.from({ length: 10 }).map((_, i) => ({
  userId: uuid(),
  nickname: `user${i}`,
  passwordHash: `hashed_password_${i}`,
  createdAt: now(),
  updatedAt: now(),
  deletedAt: null,
}));

// GROUPS
export const GROUPS = Array.from({ length: 10 }).map((_, i) => ({
  groupId: uuid(),
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
  userUserId: USERS[i % USERS.length].userId,
}));

// USER_JOIN_GROUP
export const USER_JOIN_GROUPS = Array.from({ length: 10 }).map((_, i) => ({
  ugId: uuid(),
  joinedAt: now(),
  updatedAt: now(),
  groupGroupId: GROUPS[i % GROUPS.length].groupId,
  userUserId: USERS[i % USERS.length].userId,
}));

// RECORDS
export const RECORDS = Array.from({ length: 10 }).map((_, i) => ({
  recordId: uuid(),
  exerciseType: EXERCISES[i % EXERCISES.length],
  description: `Record ${i} description`,
  time: Math.floor(Math.random() * 120) + 10,
  distance: Math.random() * 10 + 1,
  createdAt: now(),
  updatedAt: now(),
  deletedAt: null,
  userJoinGroupUgId: USER_JOIN_GROUPS[i % USER_JOIN_GROUPS.length].ugId,
  groupGroupId: GROUPS[i % GROUPS.length].groupId,
  userUserId: USERS[i % USERS.length].userId,
}));

// RECORD_IMAGES
export const RECORD_IMAGES = Array.from({ length: 10 }).map((_, i) => ({
  imageId: uuid(),
  imageUrl: `https://example.com/record${i}.jpg`,
  recordRecordId: RECORDS[i % RECORDS.length].recordId,
}));

// TAGS
export const TAGS = Array.from({ length: 10 }).map((_, i) => ({
  tagId: uuid(),
  name: `Tag${i}`,
  createdAt: now(),
  updatedAt: now(),
  groupGroupId: GROUPS[i % GROUPS.length].groupId,
}));

