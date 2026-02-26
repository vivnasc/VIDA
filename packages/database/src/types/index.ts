/**
 * Re-export all database types for the VIDA ecosystem.
 */

// Common types
export type {
  UUID,
  ISODateTime,
  ISODate,
  BaseRecord,
  Currency,
  AppTier,
  AppSlug,
  User,
  Profile,
  NotificationPreferences,
  FamilyRole,
  FamilyGroup,
  FamilyGroupSettings,
  FamilyMember,
} from "./common";

// Money types (VIDA Dinheiro)
export type {
  AccountType,
  Account,
  CategoryType,
  Category,
  TransactionType,
  TransactionStatus,
  Transaction,
  RecurringRule,
  BudgetPeriod,
  Budget,
  GoalStatus,
  Goal,
  Fund,
  XitiqueStatus,
  XitiqueGroup,
  XitiqueMember,
  DebtDirection,
  DebtStatus,
  DebtRecord,
  DebtPayment,
} from "./money";

// Home types (VIDA Lar)
export type {
  Zone,
  InventoryCondition,
  InventoryItem,
  ShoppingList,
  ShoppingListItem,
  MaintenancePriority,
  MaintenanceStatus,
  MaintenanceTask,
  EmploymentType,
  EmployeeRole,
  DomesticEmployee,
  WorkSchedule,
  EmergencyContact,
  MealType,
  MealPlan,
  MealIngredient,
  RoutineFrequency,
  Routine,
} from "./home";

// Health types (VIDA Saude)
export type {
  BloodType,
  MedicalProfile,
  MedicationFrequency,
  MedicationStatus,
  Medication,
  MedicationSchedule,
  AppointmentStatus,
  AppointmentType,
  Appointment,
  Vaccination,
  ProviderSpecialty,
  HealthProvider,
  ProviderWorkingHours,
  MetricType,
  HealthMetric,
  ClaimStatus,
  InsuranceClaim,
} from "./health";

// Family types (VIDA Familia)
export type {
  EventType,
  EventRecurrence,
  CalendarEvent,
  EventReminder,
  TaskPriority,
  TaskStatus,
  FamilyTask,
  Photo,
  PhotoAlbum,
  MilestoneCategory,
  Milestone,
  MilestoneReaction,
  MessageType,
  ChatMessage,
  MessageReadReceipt,
  MessageReaction,
  FamilyGoalStatus,
  FamilyGoalCategory,
  FamilyGoal,
  GoalMilestone,
} from "./family";
