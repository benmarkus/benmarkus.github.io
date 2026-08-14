export type Term = 'autumn' | 'spring';

/** Display order of terms within an academic year, most recent first. */
export const TERM_ORDER: Term[] = ['spring', 'autumn'];

export interface Course {
    id: number;
    title: string;
    /** First calendar year of the academic year: 2026 renders as "2026-27". */
    startYear: number;
    term: Term;
    institution: string;
    description: string;
    tags: string[];
    /** Omitted for past courses with no public materials. */
    url?: string;
    role?: string;
}

export interface CourseTerm {
    term: Term;
    courses: Course[];
}

export interface CourseYear {
    startYear: number;
    label: string;
    terms: CourseTerm[];
}
