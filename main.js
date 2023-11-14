"strict";
const main = (function () {
    const homeLink = document.querySelector(".home-link");
    const nextPageLink = document.querySelector(".next-page-link");

    const home = document.querySelector(".home");
    const nextPage = document.querySelector(".next-page");

    const homeContent = document.querySelector(".home-content");
    const nextPageContent = document.querySelector(".next-page-content");

    // card buttons
    const editBtn = document.querySelector(".edit-btn");

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

    // homeTask.addTask({ title: "james", subtitle: "J" });
    // console.log(homeTask.getTask());
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

    modalDiv.classList.add("hidden");

    function editBtnFunction(content, editButton, titleh2, subTitleh3) {
        const parentDiv = editButton.parentElement;
        const titleh2Parent = titleh2.parentElement;

        const homeArray = homeTask.getTask();
        const nextArray = nextTask.getTask();

        //
        editButton.addEventListener("click", (e) => {
            modalDiv.classList.remove("hidden");
            const dataNumber = Number(parentDiv.dataset.number);
        });

        modalCancelBtn.addEventListener("click", (e) => {
            e.preventDefault();
            console.log(titleh2Parent);
            console.log(e.target);
            modalDiv.classList.add("hidden");
            modalSubTitle.value = "";
            modalTitle.value = "";
        });

        modalConfirmBtn.addEventListener("click", (e) => {
            e.preventDefault();
            modalDiv.classList.add("hidden");
            const dataNumber = Number(parentDiv.dataset.number);
            console.log(dataNumber);

            modalSubTitle.value = "";
            modalTitle.value = "";
        });
    }

    function modalButtonsFunction() {}

    function addToTaskFunction(content, title, subtitle) {
        if (content.classList.contains("home-content")) {
            homeTask.addTask({ title, subtitle });
            console.log(homeTask.getTask());
        } else if (content.classList.contains("next-page-content")) {
            nextTask.addTask({ title, subtitle });
            console.log(nextTask.getTask());
        }
    }

    function createCard(content, array) {
        content.innerHTML = "";
        array.map((value, index) => {
            return (content.innerHTML += `
        <div class="card" id=${index}>
        <h2 class="card-title" >${value.title}</h2>
        <h3 class="card-subtitle" >${value.subtitle}</h3>
        <div class="btns">
            <button class="edit-btn">
                <span class="material-symbols-outlined">
                    edit
                </span>
            </button>
            <button class="delete-btn">
                <span class="material-symbols-outlined">
                    delete
                </span>
            </button>
        </div>
    </div>
        `);
        });

        // Delete button functionality
        const deleteBtn = document.querySelectorAll(".delete-btn");

        deleteBtn.forEach((btn, index) => {
            //
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
                createCard(content, array);
            });
        });

        // Edit button functionality
        const editBtn = document.querySelectorAll(".edit-btn");

        editBtn.forEach((btn, index) => {
            //
            btn.addEventListener("click", (e) => {
                modalDiv.classList.remove("hidden");

                // to keep track of selected card through the array
                const selectedCard = array[index];

                // populate the input field of the modal with selected card
                modalTitle.value = selectedCard.title;
                modalSubTitle.value = selectedCard.subtitle;
                console.log(selectedCard);

                //  save the index of the selected card for updating later
                modalConfirmBtn.dataset.index = index;
            });
        });

        modalConfirmBtn.addEventListener("click", (e) => {
            e.preventDefault();

            // index of selected card from dataset
            const selectedIndex = Number(e.target.dataset.index);
            console.log(selectedIndex);

            // update array with edited values
            array[selectedIndex].title = modalTitle.value;
            array[selectedIndex].subtitle = modalSubTitle.value;

            console.log(array);

            // render the updated card
            createCard(content, array);

            modalDiv.classList.add("hidden");
        });

        modalCancelBtn.addEventListener("click", (e) => {
            console.log(e.target);

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
    const homeArray = homeTask.getTask();
    const nextArray = nextTask.getTask();

    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const target = e.target;
        if (title.value === "" || subtitle.value === "") {
            return;
        }

        if (!home.classList.contains("hidden")) {
            // home content section
            homeContent.textContent = "";
            homeArray.push({ title: title.value, subtitle: subtitle.value });
            console.log(homeArray);
            createCard(homeContent, homeArray);
        } else if (!nextPage.classList.contains("hidden")) {
            nextPageContent.textContent = "";
            nextArray.push({ title: title.value, subtitle: subtitle.value });
            console.log(nextArray);
            createCard(nextPageContent, nextArray);
        }

        resetValue();
    });

    return {};
})();
