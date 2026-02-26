/**
 * Types for the VIDA Familia (Family) app.
 * Covers calendar events, tasks, photos, milestones, chat, and family goals.
 */

import type { BaseRecord, UUID, ISODateTime, ISODate } from "./common";

// ─── Calendar Event ─────────────────────────────────────────────────────────

export type EventType =
  | "general"
  | "birthday"
  | "anniversary"
  | "appointment"
  | "school"
  | "work"
  | "holiday"
  | "ceremony"
  | "travel"
  | "other";

export type EventRecurrence =
  | "none"
  | "daily"
  | "weekly"
  | "biweekly"
  | "monthly"
  | "yearly";

export interface CalendarEvent extends BaseRecord {
  family_group_id: UUID;
  created_by: UUID;
  title: string;
  description?: string | null;
  type: EventType;
  start_date: ISODateTime;
  end_date?: ISODateTime | null;
  all_day: boolean;
  location?: string | null;
  color?: string | null;
  recurrence: EventRecurrence;
  recurrence_end_date?: ISODate | null;
  attendees?: UUID[] | null;
  reminders?: EventReminder[] | null;
  is_private: boolean;
}

export interface EventReminder {
  minutes_before: number;
  type: "push" | "email" | "sms";
}

// ─── Family Task ────────────────────────────────────────────────────────────

export type TaskPriority = "low" | "medium" | "high";

export type TaskStatus = "pending" | "in_progress" | "completed" | "cancelled";

export interface FamilyTask extends BaseRecord {
  family_group_id: UUID;
  created_by: UUID;
  title: string;
  description?: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  assigned_to?: UUID | null;
  due_date?: ISODate | null;
  completed_at?: ISODateTime | null;
  completed_by?: UUID | null;
  category?: string | null;
  is_recurring: boolean;
  recurring_frequency?: "daily" | "weekly" | "monthly" | null;
  points?: number | null;
  tags?: string[] | null;
}

// ─── Photo ──────────────────────────────────────────────────────────────────

export interface Photo extends BaseRecord {
  family_group_id: UUID;
  uploaded_by: UUID;
  url: string;
  thumbnail_url?: string | null;
  caption?: string | null;
  taken_at?: ISODateTime | null;
  location?: string | null;
  width?: number | null;
  height?: number | null;
  file_size_bytes?: number | null;
  mime_type: string;
  album_id?: UUID | null;
  tagged_members?: UUID[] | null;
  is_favorite: boolean;
}

export interface PhotoAlbum extends BaseRecord {
  family_group_id: UUID;
  created_by: UUID;
  name: string;
  description?: string | null;
  cover_photo_id?: UUID | null;
  photo_count: number;
  is_shared: boolean;
}

// ─── Milestone ──────────────────────────────────────────────────────────────

export type MilestoneCategory =
  | "first_step"
  | "first_word"
  | "birthday"
  | "graduation"
  | "wedding"
  | "new_baby"
  | "new_home"
  | "achievement"
  | "travel"
  | "ceremony"
  | "health"
  | "other";

export interface Milestone extends BaseRecord {
  family_group_id: UUID;
  created_by: UUID;
  member_id?: UUID | null;
  title: string;
  description?: string | null;
  category: MilestoneCategory;
  date: ISODate;
  photo_urls?: string[] | null;
  location?: string | null;
  is_pinned: boolean;
  reactions?: MilestoneReaction[] | null;
}

export interface MilestoneReaction {
  user_id: UUID;
  emoji: string;
  created_at: ISODateTime;
}

// ─── Chat Message ───────────────────────────────────────────────────────────

export type MessageType = "text" | "image" | "voice" | "file" | "location" | "system";

export interface ChatMessage extends BaseRecord {
  family_group_id: UUID;
  sender_id: UUID;
  type: MessageType;
  content: string;
  media_url?: string | null;
  media_thumbnail_url?: string | null;
  reply_to_id?: UUID | null;
  edited_at?: ISODateTime | null;
  is_deleted: boolean;
  read_by?: MessageReadReceipt[] | null;
  reactions?: MessageReaction[] | null;
}

export interface MessageReadReceipt {
  user_id: UUID;
  read_at: ISODateTime;
}

export interface MessageReaction {
  user_id: UUID;
  emoji: string;
  created_at: ISODateTime;
}

// ─── Family Goal ────────────────────────────────────────────────────────────

export type FamilyGoalStatus = "active" | "completed" | "paused" | "cancelled";

export type FamilyGoalCategory =
  | "savings"
  | "education"
  | "health"
  | "travel"
  | "home"
  | "ceremony"
  | "other";

export interface FamilyGoal extends BaseRecord {
  family_group_id: UUID;
  created_by: UUID;
  title: string;
  description?: string | null;
  category: FamilyGoalCategory;
  status: FamilyGoalStatus;
  target_date?: ISODate | null;
  target_value?: number | null;
  current_value?: number | null;
  unit?: string | null;
  milestones?: GoalMilestone[] | null;
  assigned_members?: UUID[] | null;
  icon?: string | null;
  color?: string | null;
}

export interface GoalMilestone {
  id: UUID;
  title: string;
  is_completed: boolean;
  completed_at?: ISODateTime | null;
  completed_by?: UUID | null;
}
