// ==========================================
// Week 6 Hands-On
// ==========================================

// Five students from Week 5

const classList = [
    {
        id: 1,
        name: "Ana",
        score: 88,
        section: "3-A"
    },
    {
        id: 2,
        name: "Ben",
        score: 92,
        section: "3-B"
    },
    {
        id: 3,
        name: "Carla",
        score: 74,
        section: "3-A"
    },
    {
        id: 4,
        name: "Daniel",
        score: 81,
        section: "3-B"
    },
    {
        id: 5,
        name: "Ella",
        score: 70,
        section: "3-A"
    }
];

const list = document.getElementById("list");
const allButton = document.getElementById("allButton");
const passingButton = document.getElementById("passingButton");
const studentForm = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const message = document.getElementById("message");


// ==========================================
// Task 1 — Render a class list from data
// ==========================================

function render(rows) {
    // Clear the list before rendering.
    // This prevents duplicate rows when render() is called again.
    list.replaceChildren();

    rows.forEach(function (student) {
        const li = document.createElement("li");

        li.classList.add("student-row");

        if (student.score < 75) {
            li.classList.add("failing");
        }

        const studentText = document.createElement("span");

        studentText.textContent =
            ${student.name} — ${student.score}%;

        const deleteButton = document.createElement("button");

        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.dataset.id = student.id;
        deleteButton.classList.add("delete-button");

        li.appendChild(studentText);
        li.appendChild(deleteButton);

        list.appendChild(li);
    });
}


// Initial render

render(classList);


// ==========================================
// Task 2 — Filter buttons
// ==========================================

let currentFilter = "all";

allButton.addEventListener("click", function () {
    currentFilter = "all";

    render(classList);
});

passingButton.addEventListener("click", function () {
    currentFilter = "passing";

    const passingStudents = classList.filter(function (student) {
        return student.score >= 75;
    });

    render(passingStudents);
});


// ==========================================
// Task 2 — Add student form
// ==========================================

studentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const score = Number(scoreInput.value);

    // Validate empty name
    if (name === "") {
        message.textContent = "Please enter a student name.";
        return;
    }

    // Validate score
    if (scoreInput.value.trim() === "" || Number.isNaN(score)) {
        message.textContent = "Please enter a valid numeric score.";
        return;
    }

    const newStudent = {
        id: Date.now(),
        name: name,
        score: score,
        section: "3-A"
    };

    classList.push(newStudent);

    message.textContent = "Student added successfully.";

    studentForm.reset();

    // Re-render using the current filter.
    if (currentFilter === "passing") {
        const passingStudents = classList.filter(function (student) {
            return student.score >= 75;
        });

        render(passingStudents);
    } else {
        render(classList);
    }
});


// ==========================================
// Task 3 — Delete with event delegation
// ==========================================

list.addEventListener("click", function (event) {
    if (!event.target.classList.contains("delete-button")) {
        return;
    }

    const id = Number(event.target.dataset.id);

    const index = classList.findIndex(function (student) {
        return student.id === id;
    });

    if (index !== -1) {
        classList.splice(index, 1);
    }

    // Re-render after deletion.
    if (currentFilter === "passing") {
        const passingStudents = classList.filter(function (student) {
            return student.score >= 75;
        });

        render(passingStudents);
    } else {
        render(classList);
    }
});