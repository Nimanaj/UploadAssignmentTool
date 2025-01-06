const createGroupBtn = document.getElementById('createGroupBtn');
const createGroupPopup = document.getElementById('createGroupPopup');
const popupOverlay = document.getElementById('popupOverlay');
const cancelPopupBtn = document.getElementById('cancelPopupBtn');
const saveGroupBtn = document.getElementById('saveGroupBtn');
const searchStudents = document.getElementById('searchStudents');
const searchResults = document.getElementById('searchResults');
const studentsList = document.getElementById('studentsList');
const currentGroupSection = document.getElementById('currentGroup');
const leaveGroupBtn = document.getElementById('leaveGroupBtn'); // Reference for leave group button

// List of all students (could come from an API or database in a real app)
const students = [
    { id: 'student1', name: 'Student 1' },
    { id: 'student2', name: 'Student 2' },
    { id: 'student3', name: 'Student 3' },
    { id: 'student4', name: 'Student 4' },
    { id: 'student5', name: 'Student 5' },
];

// Store selected students for the group
let selectedStudents = [];

// Show popup
createGroupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    createGroupPopup.style.display = 'block';  // Show the popup
    popupOverlay.style.display = 'block';  // Show the overlay
});

// Hide popup
cancelPopupBtn.addEventListener('click', () => {
    createGroupPopup.style.display = 'none';  // Hide the popup
    popupOverlay.style.display = 'none';  // Hide the overlay
});

// Save group
saveGroupBtn.addEventListener('click', () => {
    const groupName = document.getElementById('groupName').value;

    // Create the new group HTML
    const groupDiv = document.createElement('div');
    groupDiv.classList.add('group');

    // Add group name and participants list
    const groupTitle = document.createElement('h3');
    groupTitle.textContent = groupName;
    groupDiv.appendChild(groupTitle);

    const participantsTitle = document.createElement('p');
    participantsTitle.textContent = "Participants:";
    groupDiv.appendChild(participantsTitle);

    const participantsList = document.createElement('ul');

    // Add each selected student to the list
    selectedStudents.forEach(student => {
        const listItem = document.createElement('li');
        listItem.textContent = student.name;
        participantsList.appendChild(listItem);
    });

    groupDiv.appendChild(participantsList);

    // Clear the current group section and append the new group
    currentGroupSection.innerHTML = '';  // Clear the previous group content
    currentGroupSection.appendChild(groupDiv);  // Add the new group

    // Clear the popup and selected students
    createGroupPopup.style.display = 'none';  // Hide the popup
    popupOverlay.style.display = 'none';  // Hide the overlay
    selectedStudents = [];  // Clear the selected students
    studentsList.innerHTML = '';  // Clear the selected students list
    document.getElementById('groupName').value = '';  // Clear the group name
});

// Leave group (clear current group)
leaveGroupBtn.addEventListener('click', () => {
    currentGroupSection.innerHTML = '';  // Clear the current group content
});

// Search Students
searchStudents.addEventListener('input', () => {
    const query = searchStudents.value.toLowerCase();

    // Hide the search results dropdown if there's no query
    if (query === '') {
        searchResults.style.display = 'none';
        return;
    }

    // Filter students based on the search query
    const filteredStudents = students.filter(student => student.name.toLowerCase().includes(query));

    // Clear previous results
    searchResults.innerHTML = '';

    if (filteredStudents.length === 0) {
        searchResults.style.display = 'none';  // Hide if no results
    } else {
        searchResults.style.display = 'block';  // Show the results dropdown
        // Display filtered students in the dropdown
        filteredStudents.forEach(student => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('search-result-item');
            resultItem.textContent = student.name;

            // Add student to the list when clicked
            resultItem.addEventListener('click', () => {
                addStudentToList(student);
                searchStudents.value = '';  // Clear the search field
                searchResults.style.display = 'none';  // Hide dropdown
            });

            searchResults.appendChild(resultItem);
        });
    }
});

// Add selected student to the list
function addStudentToList(student) {
    // Check if student is already added to prevent duplicates
    if (!selectedStudents.some(s => s.id === student.id)) {
        selectedStudents.push(student);
        
        // Display student in the list
        const studentDiv = document.createElement('div');
        studentDiv.textContent = student.name;
        studentsList.appendChild(studentDiv);
    }
}
