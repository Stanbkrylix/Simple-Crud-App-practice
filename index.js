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

    const submitCard = document.querySelector(".submit-card");
    const title = document.querySelector(".title");
    const subtitle = document.querySelector(".sub-title");
    const submitBtn = document.querySelector(".submit-btn");

    const homeTask = new Task();

    const nextTask = new Task();

    const arrayPrototype = (title, subtitle) => {
        homeTask.addTask({ title, subtitle });
        return homeTask.getTask();
    };

    // arrayPrototype("Davinci", "A noval");
    // arrayPrototype("Sapiens", "A BestSeller");
    // arrayPrototype("Not giving a fuck", "An Approach");

    // arrayPrototype("Educated", "A Memoir");

    console.log(homeTask.getTask());

    nextPage.classList.add("hidden");

    // home link
    homeLink.addEventListener("click", (e) => {
        e.preventDefault();

        if (!nextPage.classList.contains("hidden")) {
            nextPage.classList.add("hidden");
            home.classList.remove("hidden");
        }
    });

    // next page link
    nextPageLink.addEventListener("click", (e) => {
        e.preventDefault();

        if (!home.classList.contains("hidden")) {
            home.classList.add("hidden");
            nextPage.classList.remove("hidden");
        }
    });

    function updateStorageArray(array) {
        for (let i = 0; i < array.length; i++) {
            array[i].id = i;
        }
        console.log(array);
    }

    function deleteBtnFunction(deleteBtn, content) {
        const parentDiv = deleteBtn.parentElement;
        const homeArray = homeTask.getTask();
        const nextArray = nextTask.getTask();

        deleteBtn.addEventListener("click", (e) => {
            e.preventDefault();
            parentDiv.remove();
            const dataNumber = Number(parentDiv.dataset.number);

            console.log(dataNumber);
            if (content.classList.contains("home-content")) {
                // update array and ui elements for home content

                homeTask.deleteTask(dataNumber);
                console.log(homeTask.getTask());
                updateStorageArray(homeArray);
                homeContent.textContent = "";
                loopingthroughtTask(homeContent);
            } else if (content.classList.contains("next-page-content")) {
                // update array and ui elements for next content

                nextTask.deleteTask(dataNumber);
                console.log(nextTask.getTask());
                updateStorageArray(nextArray);
                nextPageContent.textContent = "";
                loopingthroughtTask(nextPageContent);
            }
        });
    }

    function addToTaskFunction(content, title, subtitle) {
        if (content.classList.contains("home-content")) {
            homeTask.addTask({ title, subtitle });
            console.log(homeTask.getTask());
        } else if (content.classList.contains("next-page-content")) {
            nextTask.addTask({ title, subtitle });
            console.log(nextTask.getTask());
        }
    }

    function editBtnFunction() {}

    function card(content, title = "Book", subtitle = "About book", id) {
        const cardDiv = document.createElement("div");

        const titleh2 = document.createElement("h2");
        const subTitleh3 = document.createElement("h3");
        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");

        cardDiv.setAttribute("class", "card");
        cardDiv.setAttribute("data-number", `${id}`);
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

        // addToTaskFunction(content, title, subtitle);
        // loopingthroughtTask(content);

        deleteBtnFunction(deleteBtn, content);
    }

    // submit button

    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const target = e.target;
        if (title.value === "" || subtitle.value === "") {
            return;
        }

        if (!home.classList.contains("hidden")) {
            homeContent.textContent = "";

            addToTaskFunction(homeContent, title.value, subtitle.value);
            loopingthroughtTask(homeContent);
            // card(homeContent, title.value, subtitle.value);
        } else if (!nextPage.classList.contains("hidden")) {
            nextPageContent.textContent = "";

            addToTaskFunction(nextPageContent, title.value, subtitle.value);
            loopingthroughtTask(nextPageContent);
            // card(nextPageContent, title.value, subtitle.value);
        }

        title.value = "";
        subtitle.value = "";
    });

    // card(homeContent, "The Great Gatsby", "The Great American");
    // card(nextPageContent, "The Great Gatsby", "The Great American");

    // card(homeContent, "The Great Gatsby", "The Great American");

    function loopingthroughtTask(content) {
        const homeArray = homeTask.getTask();
        const nextArray = nextTask.getTask();

        console.log(homeArray, nextArray);

        if (content.classList.contains("home-content")) {
            for (let i = 0; i < homeArray.length; i++) {
                homeArray[i].id = i;
                console.log(homeArray[i]);
                card(homeContent, homeArray[i].title, homeArray[i].subtitle, i);
            }
        } else if (content.classList.contains("next-page-content")) {
            for (let i = 0; i < nextArray.length; i++) {
                nextArray[i].id = i;
                console.log(nextArray[i]);
                card(
                    nextPageContent,
                    nextArray[i].title,
                    nextArray[i].subtitle,
                    i
                );
            }
        }
    }

    loopingthroughtTask(homeContent);
    // card(homeContent, "To kill a Mockingbird", "A Novel of Racial Injustice");
    // card(nextPageContent, "Da Vinci Code", "A Novel");
    // card(nextPageContent, "Thinking fast and slow", "New York BestSeller");

    return {};
})();
