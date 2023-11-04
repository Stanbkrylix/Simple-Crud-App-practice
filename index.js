"strict";

class Task {
    constructor() {
        this.task = [];
    }
    deleteTask(index) {
        this.task.splice(index, 1);
    }
    addTask(task) {
        this.task.push(task);
    }
    getTask() {
        return this.task;
    }
}

const main = (function () {
    const homeLink = document.querySelector(".home-link");
    const nextPageLink = document.querySelector(".next-page-link");

    const home = document.querySelector(".home");
    const nextPage = document.querySelector(".next-page");

    const homeContent = document.querySelector(".home-content");
    const nextPageContent = document.querySelector(".next-page-content");

    const homeTask = new Task();
    let homeTaksID = 0;

    const nextTask = new Task();
    let nextTaskId = 0;

    nextPage.classList.add("hidden");

    homeLink.addEventListener("click", (e) => {
        e.preventDefault();

        if (!nextPage.classList.contains("hidden")) {
            nextPage.classList.add("hidden");
            home.classList.remove("hidden");
        }
    });

    nextPageLink.addEventListener("click", (e) => {
        e.preventDefault();

        if (!home.classList.contains("hidden")) {
            home.classList.add("hidden");
            nextPage.classList.remove("hidden");
        }
    });

    function deleteBtnFunction(deleteBtn, content) {
        const parentDiv = deleteBtn.parentElement;

        deleteBtn.addEventListener("click", (e) => {
            e.preventDefault();
            parentDiv.remove();

            if (content.classList.contains("home-content")) {
                console.log(homeTask.getTask());
            } else if (content.classList.contains("next-page-content")) {
                console.log(nextTask.getTask());
            }
        });
    }

    function addToTaskFunction(content, title, subtitle) {
        if (content.classList.contains("home-content")) {
            homeTask.addTask({ title, subtitle });
        } else if (content.classList.contains("next-page-content")) {
            nextTask.addTask({ title, subtitle });
        }
    }

    function editBtnFunction() {}

    function card(content, title = "Book", subtitle = "About book") {
        const cardDiv = document.createElement("div");

        const titleh2 = document.createElement("h2");
        const subTitleh3 = document.createElement("h3");
        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");

        cardDiv.setAttribute("class", "card");
        titleh2.setAttribute("class", "title");
        subTitleh3.setAttribute("class", "sub-title");
        editBtn.setAttribute("class", "edit-btn");
        deleteBtn.setAttribute("class", "delete-btn");

        titleh2.textContent = title;
        subTitleh3.textContent = subtitle;
        editBtn.textContent = "Edit";
        deleteBtn.textContent = "Delete";

        cardDiv.appendChild(titleh2);
        cardDiv.appendChild(subTitleh3);
        cardDiv.appendChild(editBtn);
        cardDiv.appendChild(deleteBtn);
        content.appendChild(cardDiv);

        addToTaskFunction(content, title, subtitle);
        // loopingthroughtTask(content);

        deleteBtnFunction(deleteBtn, content);
    }

    card(homeContent, "The Great Gatsby", "The Great American");

    // card(homeContent, "The Great Gatsby", "The Great American");

    function loopingthroughtTask(content) {
        const homeArray = homeTask.getTask();
        const nextArray = nextTask.getTask();

        if (content.classList.contains("home-content")) {
            for (let i = 0; i < homeArray.length; i++) {
                console.log(homeArray[i]);
            }
        } else if (content.classList.contains("next-page-content")) {
            for (let i = 0; i < nextArray.length; i++) {
                console.log(nextArrayArray[i]);
            }
        }
    }

    loopingthroughtTask(homeContent);
    // card(homeContent, "To kill a Mockingbird", "A Novel of Racial Injustice");
    // card(nextPageContent, "Da Vinci Code", "A Novel");
    // card(nextPageContent, "Thinking fast and slow", "New York BestSeller");

    return {};
})();
