
export interface Student {
  id?: number;
  Name: string;
  Reg_No: string;
  DOB: string;
  Blood_Group: string;
  Phone: string;
  Dept: string;
  Gender: string;
  Bio: string;
  Created_At?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface StudentResponse {
  message: string;
  student: Student;
}
