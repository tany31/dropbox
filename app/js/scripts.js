
window.onload = function() {

    var btnNewFolder = document.querySelector("#buttonNewFolder");
    btnNewFolder.addEventListener('click', function openModal(){
        var modal = document.querySelector("#modal__new-folder");
        modal.style.display = "flex";
    });

    var btnSettings = document.querySelector("#button-settings");
    btnSettings.addEventListener('click', function openModal(){
        var modal = document.querySelector("#modal__settings");
        modal.style.display = "flex";
    });

    var btnNotifications = document.querySelector("#button-notifications");
    btnNotifications.addEventListener('click', function openModal(){
        var modal = document.querySelector("#modal__notifications");
        modal.style.display = "flex";
    });
    var btnModalClose = document.querySelectorAll(".modal__button-close");
    for (var i = 0; i < btnModalClose.length; i++) { 
        btnModalClose[i].addEventListener('click', handleCloseModal);
    }

    var btnModalCancel = document.querySelectorAll(".modal__button-cancel");
    for (var i = 0; i < btnModalCancel.length; i++) { 
        btnModalCancel[i].addEventListener('click', handleCloseModal);
    }

    var btnListView = document.querySelector("#button-list-view");
    btnListView.addEventListener('click', handleViewChange.bind({}, "list"));

    var btnDetailView = document.querySelector("#button-detail-view");
    btnDetailView.addEventListener('click', handleViewChange.bind({}, "detail"));

    var btnThumbView = document.querySelector("#button-thumb-view");
    btnThumbView.addEventListener('click', handleViewChange.bind({}, "thumb"));
}




function closestElement(element, className) {
    if(element.parentElement.classList.contains(className)) {
        return element.parentElement;
    } else {
        return closestElement(element.parentElement, className);
    } 
}

function handleCloseModal(e){
    var modal = closestElement(e.currentTarget, 'modal');
    modal.style.display = "none";
}

function removeClassNames(elements, className){
    for (var i = 0; i < elements.length; i++) {
        if(elements[i].classList.contains(className)){
            elements[i].classList.remove(className);
        }
    }
}

function handleViewChange(viewType, e) {
    var buttonsView = document.querySelectorAll(".file-view-controls__button");
    var files = document.querySelector(".files-view");
    removeClassNames(buttonsView, "file-view-controls__button_active");

    for(var i = 0; i < files.classList.length; i++) {
        if(files.classList[i].indexOf("files-view_type_") == 0) {
            files.classList.remove(files.classList[i]);
        }
    }

    files.className += ' files-view_type_' + viewType;
    e.currentTarget.className += " file-view-controls__button_active";
}