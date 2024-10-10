export enum GuestType {
  ADULT = 'ADULT',
  CHILD = 'CHILD'
}

export enum WitnessType {
  NONE = 'NONE',
  BRIDE = 'BRIDE',
  GROOM = 'GROOM'
}

export interface Guest {
  id?: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  guestType: GuestType;
  witnessType?: WitnessType;
  age?: number;
  isConfirmed: boolean;
}

export interface Family {
  id: number;
  name: string;
  address: string;
  postalCode: string;
  city: string;
  members: Guest[];
}

export interface AdultFormData {
  firstName: string;
  lastName: string;
  phone?: string;
  witnessType: WitnessType;
  isConfirmed: boolean;
}

export interface ChildFormData {
  firstName: string;
  age: number;
}

export interface FamilyFormData {
  familyName: string;
  address: string;
  postalCode: string;
  city: string;
  adults: AdultFormData[];
  children: ChildFormData[];
}

export interface GuestStatistics {
  totalGuests: number;
  totalAdults: number;
  totalChildren: number;
  confirmedGuests: number;
  totalFamilies: number;
}

export interface CreateFamilyDto {
  name: string;
  address: string;
  postalCode: string;
  city: string;
  members: CreateGuestDto[];
}

export interface CreateGuestDto {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  guestType: GuestType;
  witnessType?: WitnessType;
  age?: number;
  isConfirmed: boolean;
}

export interface UpdateFamilyDto {
  name?: string;
  address?: string;
  postalCode?: string;
  city?: string;
}



export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}