const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a better idea of what is involved.',
    technology: ['HTML', 'CSS'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will teach students to program with functions, which will help them to write more organized, efficient, and maintainable code. It will also teach students to use built-in Python modules and standard Python data structures.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce the principles of class-based object oriented programming. Students will learn to write, test, and debug programs that use classes, objects, and inheritance.',
    technology: ['C#'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will write code and design web pages in a team environment.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false
  }
];
const courseCardsContainer = document.getElementById('course-cards');
const totalCreditsSpan = document.getElementById('total-credits');
const filterButtons = document.querySelectorAll('.filter-buttons button');
function renderCourses(courseArray) {
  courseCardsContainer.innerHTML = '';
  courseArray.forEach(course => {
    const card = document.createElement('div');
    card.classList.add('course-card');
    if (course.completed) {
      card.classList.add('completed');
    }
    card.textContent = `${course.subject} ${course.number}`;
    card.title = course.title;
    courseCardsContainer.appendChild(card);
  });
  const totalCredits = courseArray.reduce((sum, course) => sum + course.credits, 0);
  totalCreditsSpan.textContent = totalCredits;
}
//Filter buttons
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active-filter'));
    button.classList.add('active-filter');
    const filterValue = button.dataset.filter;
    let filteredCourses;
    if (filterValue === 'all') {
      filteredCourses = courses;
    } else {
      filteredCourses = courses.filter(course => course.subject === filterValue);
    }
    renderCourses(filteredCourses);
  });
});
renderCourses(courses);
