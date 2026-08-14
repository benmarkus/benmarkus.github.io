import { Component } from '@angular/core';
import { CourseCard } from '../course-card/course-card';
import { Course, CourseYear, Term, TERM_ORDER } from '../course.model';
import coursesData from '../../../../data/courses.json';

function academicYearLabel(startYear: number): string {
  return `${startYear}-${String((startYear + 1) % 100).padStart(2, '0')}`;
}


function buildTimeline(courses: Course[]): CourseYear[] {
  const byYear = new Map<number, Map<Term, Course[]>>();

  for (const course of courses) {
    let byTerm = byYear.get(course.startYear);
    if (!byTerm) {
      byTerm = new Map();
      byYear.set(course.startYear, byTerm);
    }

    const bucket = byTerm.get(course.term);
    if (bucket) {
      bucket.push(course);
    } else {
      byTerm.set(course.term, [course]);
    }
  }

  return [...byYear.entries()]
    .map(([startYear, byTerm]) => ({
      startYear,
      label: academicYearLabel(startYear),
      terms: [...byTerm.entries()]
        .map(([term, termCourses]) => ({ term, courses: termCourses }))
        .sort((a, b) => TERM_ORDER.indexOf(a.term) - TERM_ORDER.indexOf(b.term)),
    }))
    .sort((a, b) => b.startYear - a.startYear);
}

@Component({
  selector: 'app-teaching-page',
  imports: [CourseCard],
  templateUrl: './teaching-page.html',
  styleUrl: './teaching-page.css',
})
export class TeachingPage {
  timeline: CourseYear[] = buildTimeline(coursesData as Course[]);
}
