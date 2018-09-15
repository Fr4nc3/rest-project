export interface Restaurant {
  _id?: string;
  name: string;
  cuisine: string;
  grade: string;
  address: string;
  phone: string;
  imageUrl: string;
  gradeDate: string;
  inspection: {
    grade_date: string;
    grade_date_first: string;
    action: string;
    violation_code: string;
    violation_desc: string;
    score: string;
    grade: string;
    inspection_type: string;
  };
}
