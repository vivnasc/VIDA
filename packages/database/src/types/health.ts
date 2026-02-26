/**
 * Types for the VIDA Saude (Health) app.
 * Covers medical profiles, medications, appointments, vaccinations,
 * providers, health metrics, and insurance claims.
 */

import type { BaseRecord, UUID, ISODateTime, ISODate } from "./common";

// ─── Medical Profile ────────────────────────────────────────────────────────

export type BloodType =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-"
  | "unknown";

export interface MedicalProfile extends BaseRecord {
  user_id: UUID;
  family_member_id?: UUID | null;
  full_name: string;
  date_of_birth: ISODate;
  blood_type?: BloodType | null;
  height_cm?: number | null;
  weight_kg?: number | null;
  allergies?: string[] | null;
  chronic_conditions?: string[] | null;
  emergency_contact_name?: string | null;
  emergency_contact_phone?: string | null;
  primary_provider_id?: UUID | null;
  insurance_provider?: string | null;
  insurance_number?: string | null;
  notes?: string | null;
}

// ─── Medication ─────────────────────────────────────────────────────────────

export type MedicationFrequency =
  | "once_daily"
  | "twice_daily"
  | "three_times_daily"
  | "four_times_daily"
  | "weekly"
  | "as_needed"
  | "custom";

export type MedicationStatus = "active" | "paused" | "completed" | "cancelled";

export interface Medication extends BaseRecord {
  medical_profile_id: UUID;
  name: string;
  generic_name?: string | null;
  dosage: string;
  dosage_unit: string;
  frequency: MedicationFrequency;
  custom_schedule?: MedicationSchedule[] | null;
  route?: "oral" | "topical" | "injection" | "inhalation" | "other" | null;
  start_date: ISODate;
  end_date?: ISODate | null;
  prescribed_by?: string | null;
  provider_id?: UUID | null;
  purpose?: string | null;
  side_effects?: string[] | null;
  instructions?: string | null;
  refill_date?: ISODate | null;
  quantity_remaining?: number | null;
  status: MedicationStatus;
  reminders_enabled: boolean;
  photo_url?: string | null;
}

export interface MedicationSchedule {
  time: string;
  dosage?: string | null;
  label?: string | null;
}

// ─── Appointment ────────────────────────────────────────────────────────────

export type AppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no_show"
  | "rescheduled";

export type AppointmentType =
  | "consultation"
  | "follow_up"
  | "checkup"
  | "vaccination"
  | "lab_test"
  | "imaging"
  | "procedure"
  | "therapy"
  | "emergency"
  | "other";

export interface Appointment extends BaseRecord {
  medical_profile_id: UUID;
  provider_id?: UUID | null;
  title: string;
  type: AppointmentType;
  date: ISODate;
  time: string;
  duration_minutes?: number | null;
  location?: string | null;
  address?: string | null;
  status: AppointmentStatus;
  notes?: string | null;
  preparation_instructions?: string | null;
  follow_up_notes?: string | null;
  documents?: string[] | null;
  reminder_enabled: boolean;
  reminder_minutes_before?: number | null;
  cost?: number | null;
  is_covered_by_insurance: boolean;
}

// ─── Vaccination ────────────────────────────────────────────────────────────

export interface Vaccination extends BaseRecord {
  medical_profile_id: UUID;
  name: string;
  vaccine_type?: string | null;
  manufacturer?: string | null;
  batch_number?: string | null;
  dose_number?: number | null;
  total_doses?: number | null;
  date_administered: ISODate;
  administered_by?: string | null;
  provider_id?: UUID | null;
  location?: string | null;
  next_dose_date?: ISODate | null;
  expiry_date?: ISODate | null;
  side_effects_reported?: string[] | null;
  certificate_url?: string | null;
  notes?: string | null;
}

// ─── Health Provider ────────────────────────────────────────────────────────

export type ProviderSpecialty =
  | "general_practice"
  | "pediatrics"
  | "cardiology"
  | "dermatology"
  | "dentistry"
  | "ophthalmology"
  | "gynecology"
  | "orthopedics"
  | "neurology"
  | "psychiatry"
  | "pharmacy"
  | "laboratory"
  | "imaging"
  | "physiotherapy"
  | "nutrition"
  | "other";

export interface HealthProvider extends BaseRecord {
  user_id: UUID;
  name: string;
  specialty: ProviderSpecialty;
  practice_name?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  province?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  website?: string | null;
  working_hours?: ProviderWorkingHours | null;
  accepts_insurance: boolean;
  accepted_insurers?: string[] | null;
  rating?: number | null;
  notes?: string | null;
  is_favorite: boolean;
}

export interface ProviderWorkingHours {
  monday?: { open: string; close: string } | null;
  tuesday?: { open: string; close: string } | null;
  wednesday?: { open: string; close: string } | null;
  thursday?: { open: string; close: string } | null;
  friday?: { open: string; close: string } | null;
  saturday?: { open: string; close: string } | null;
  sunday?: { open: string; close: string } | null;
}

// ─── Health Metric ──────────────────────────────────────────────────────────

export type MetricType =
  | "weight"
  | "height"
  | "blood_pressure_systolic"
  | "blood_pressure_diastolic"
  | "heart_rate"
  | "blood_sugar"
  | "temperature"
  | "oxygen_saturation"
  | "steps"
  | "sleep_hours"
  | "water_intake_ml"
  | "bmi"
  | "custom";

export interface HealthMetric extends BaseRecord {
  medical_profile_id: UUID;
  type: MetricType;
  value: number;
  unit: string;
  secondary_value?: number | null;
  secondary_unit?: string | null;
  measured_at: ISODateTime;
  source?: "manual" | "device" | "lab" | null;
  device_name?: string | null;
  notes?: string | null;
}

// ─── Insurance Claim ────────────────────────────────────────────────────────

export type ClaimStatus =
  | "draft"
  | "submitted"
  | "processing"
  | "approved"
  | "partially_approved"
  | "denied"
  | "paid"
  | "appealed";

export interface InsuranceClaim extends BaseRecord {
  medical_profile_id: UUID;
  appointment_id?: UUID | null;
  claim_number?: string | null;
  insurance_provider: string;
  policy_number: string;
  submitted_date?: ISODate | null;
  service_date: ISODate;
  service_description: string;
  total_amount: number;
  claimed_amount: number;
  approved_amount?: number | null;
  paid_amount?: number | null;
  currency: string;
  status: ClaimStatus;
  denial_reason?: string | null;
  documents?: string[] | null;
  notes?: string | null;
}
