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

    // card buttons

    // const editBtn = document.querySelector(".edit-btn");

    // card elements
    const submitCard = document.querySelector(".submit-card");
    const title = document.querySelector(".title");
    const subtitle = document.querySelector(".sub-title");
    const submitBtn = document.querySelector(".submit-btn");

    // modal content
    const modalDiv = document.querySelector(".modal-div");
    const modalContent = document.querySelector(".modal-content");
    const modalTitle = document.querySelector(".modal-title");
    const modalSubTitle = document.querySelector(".modal-sub-title");

    // modal btns
    const modalCancelBtn = document.querySelector(".cancel-btn");
    const modalConfirmBtn = document.querySelector(".confirm-btn");

    const homeTask = new Task();

    const nextTask = new Task();

    const homeArray = homeTask.getTask();
    const nextArray = nextTask.getTask();

    // const deleteBtn = document.querySelectorAll(".delete-btn");
    // const editBtn = document.querySelectorAll(".edit-btn");

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

    function side() {
        console.log("link side clicked");
    }

    //

    modalDiv.classList.add("hidden");

    function createCard(container, array) {
        //
        container.innerHTML = "";
        array.map((value, index) => {
            return (container.innerHTML += `
        <div class="card" id=${index}>
        <h2 class="card-title" >${value.title}</h2>
        <h3 class="card-subtitle" >${value.subtitle}</h3>
        <div class="btns">
            <button class="edit-btn">
                <span class="material-symbols-outlined">
                    edit
                </span>
            </button>
            <button  class="delete-btn">
                <span class="material-symbols-outlined">
                    delete
                </span>
            </button>
        </div>
    </div>
        `);
        });

        const deleteBtn = document.querySelectorAll(".delete-btn");

        deleteBtn.forEach((btn, index) => {
            //
            console.log("delete");
            btn.addEventListener("click", (e) => {
                e.preventDefault();

                // The Div which will be remove
                const parentDiv =
                    e.target.parentElement.parentElement.parentElement;

                // to use in splicing the array
                const idNum = Number(parentDiv.id);

                parentDiv.remove();
                array.splice(idNum, 1);

                // allways recall creation of card function when deleting
                // recall the function to update array
                createCard(container, array);
            });
        });

        // Edit button functionality
        const editBtn = container.querySelectorAll(".edit-btn");

        editBtn.forEach((btn, index) => {
            //
            btn.addEventListener("click", (e) => {
                modalDiv.classList.remove("hidden");

                // to keep track of selected card through the array
                const selectedCard = array[index];

                if (
                    selectedCard &&
                    selectedCard.title &&
                    selectedCard.subtitle
                ) {
                    // populate the input field of the modal with selected card
                    modalTitle.value = selectedCard.title;
                    modalSubTitle.value = selectedCard.subtitle;

                    //  save the index of the selected card for updating later
                    modalConfirmBtn.dataset.index = index;

                    // console.log(array);
                }
            });
        });

        modalCancelBtn.addEventListener("click", (e) => {
            modalDiv.classList.add("hidden");
            modalTitle.value = "";
            modalSubTitle.value = "";
        });
    }
    const resetValue = () => {
        title.value = "";
        subtitle.value = "";
    };

    // submit button

    let arrayPrototype1 = [];
    let arrayPrototype2 = [];

    function modalConfirm(container, array) {
        modalConfirmBtn.addEventListener("click", (e) => {
            e.preventDefault();

            // index of selected card from dataset
            const selectedIndex = Number(e.target.dataset.index);

            // update array with edited values
            array[selectedIndex].title = modalTitle.value;
            array[selectedIndex].subtitle = modalSubTitle.value;

            // render the updated card
            // console.log(array, i++);
            createCard(container, array);

            modalDiv.classList.add("hidden");
            //
        });
    }

    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const target = e.target;
        if (title.value === "" || subtitle.value === "") {
            return;
        }

        if (!home.classList.contains("hidden")) {
            homeContent.textContent = "";
            arrayPrototype1.push({
                title: title.value,
                subtitle: subtitle.value,
            });
            createCard(homeContent, arrayPrototype1);
            modalConfirm(homeContent, arrayPrototype1);
            console.log("home");
        }

        if (!nextPage.classList.contains("hidden")) {
            nextPageContent.textContent = "";
            arrayPrototype2.push({
                title: title.value,
                subtitle: subtitle.value,
            });
            createCard(nextPageContent, arrayPrototype2);
            modalConfirm(nextPageContent, arrayPrototype2);
            console.log("nextPage");
        }

        resetValue();
    });

    return {};
})();
