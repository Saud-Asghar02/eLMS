//* ---------------------------- Max Course + Course Delete ---------------------------- *//

document.addEventListener("DOMContentLoaded", function () {
    let cardCounter = document.getElementById("card-counter");
    let addCourseBtn = document.getElementById("add-course-btn");
    let courseCards = document.querySelectorAll("#course-cards"); // All course cards

    function updateCounter() {
        let currentCount = courseCards.length;
        let maxCount = 7;
        cardCounter.textContent = `( ${currentCount} / ${maxCount} )`;
        return currentCount;
    }

    // Initial counter update
    updateCounter();

    addCourseBtn.addEventListener("click", function (event) {
        event.preventDefault();

        let currentCount = updateCounter();
        let maxCount = 7;

        if (currentCount >= maxCount) {
            Swal.fire({
                icon: 'error',
                title: 'Limit Reached',
                text: 'You cannot add more than 7 courses!',
            });
        } else {
            window.location.href = "/owner/admin/new-course"; // Allow navigation if limit not reached
        }
    });
});

$(document).ready(function() {
    $(document).on('click', '#delete-course', function(e) {
        e.preventDefault();
        let courseId = $(this).data('id'); // Get the course ID dynamically

        Swal.fire({
            title: "Are you sure?",
            text: "This course will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your course has been deleted.",
                    icon: "success",
                    showConfirmButton: true
                }).then((result) => {
                    if (result) {
                        window.location.href = `/owner/admin/course/delete/${courseId}`;
                    }
                });
            }
        });
    });
});


//* ---------------------------- Bio + About Me + Counter ---------------------------- *//

$(document).ready(function () {
    let maxChars = 80;
    let aboutMaxChars = 350;
    let $bioTextarea = $("#bioTextarea");
    let $bioInput = $("#bioInput");
    let $charCounter = $("#charCounter");
    let $aboutCharCounter = $("#aboutCharCounter");

    $bioInput.on("input", function () {
        let value = $(this).val();
        let length = value.length;

        if (length > maxChars) {
            $(this).val(value.substring(0, maxChars)); // Prevent input beyond 80
            length = maxChars;
        }

        $charCounter.text(length + " / " + maxChars);

        // Show error if max length is reached
        if (length >= maxChars) {
            $charCounter.addClass("error");
            $bioInput.addClass("is-invalid");
        } else {
            $charCounter.removeClass("error");
            $bioInput.removeClass("is-invalid");
        }

    });

    $bioTextarea.on("input", function () {
        let value = $(this).val();
        let length = value.length;

        if (length > aboutMaxChars) {
            $(this).val(value.substring(0, aboutMaxChars)); // Prevent input beyond 200
            length = aboutMaxChars;
        }

        $aboutCharCounter.text(length + " / " + aboutMaxChars);

        // Show error if max length is reached
        if (length >= aboutMaxChars) {
            $aboutCharCounter.addClass("error");
                  $bioTextarea.addClass("is-invalid");
        } else {
                  $aboutCharCounter.removeClass("error");
                  $bioTextarea.removeClass("is-invalid");
        }

    });
});


//* ---------------------------- User Skills ---------------------------- *//

$(document).ready(function () {
    let maxSkills = 8;
    let tempSkills = [];
    let originalSkills = [];

    const userTab = document.getElementById('pills-skill');
    const userId = userTab.getAttribute('data-user-id');

    // Fetch existing skills from the database on page load
    $.ajax({
        url: `/owner/admin/${userId}/skills`,  // Ensure this route exists in your backend
        type: "GET",
        success: function (response) {
            if (response.skills) {
                tempSkills = [...response.skills]; // Spread operator to avoid reference issues
                originalSkills = [...response.skills]; 
                updateModalSkills();
            }
        },
        error: function () {
            console.log("Failed to fetch skills.");
        }
    });

    // Function to update displayed skills
    function updateModalSkills() {
        $("#selectedSkillsList").empty();
        $("#skillCounter").text(tempSkills.length);

        tempSkills.forEach(skill => {
            $("#selectedSkillsList").append(`
                <div class="selected-skill d-flex align-items-center border rounded-5 mb-2 me-2" style="width: fit-content; padding: 4px 15px;">
                    <p class="mb-0 me-2">${skill}</p>
                    <button class="border-0 bg-transparent remove-skill" data-skill="${skill}">
                        <i class="bi bi-x fs-5 text-body-secondary"></i>
                    </button>
                </div>
            `);
        });
    }

    // Add skill when selected
    $("#skillSelect").on("change", function () {
        let skill = $(this).val();

        if (skill && !tempSkills.includes(skill)) {
            if (tempSkills.length < maxSkills) {
                tempSkills.push(skill);
                updateModalSkills();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Limit Reached",
                    text: "You can only select up to 8 skills.",
                    confirmButtonColor: "#d33",
                });
            }
        }

        $(this).val(""); // Reset dropdown selection
    });

    // Remove only the selected skill
    $(document).on("click", ".remove-skill", function () {
        let skill = $(this).data("skill");
        tempSkills = tempSkills.filter(s => s !== skill); // Remove only the clicked skill
        updateModalSkills();
    });

    // Save skills when "Save Skills" button is clicked
    $("#saveSkills").on("click", function () {
        if (JSON.stringify(tempSkills) === JSON.stringify(originalSkills)) {
            $("#skillsModal").modal("hide");
            return; // No changes, don't send AJAX request
        }

        $.ajax({
            url: `/owner/admin/${userId}`,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ skills: tempSkills }),
            success: function () {
                window.location.href = '/owner/admin';
            },
            error: function () {
                alert("Failed to update skills. Try again!");
            }
        });

        $("#skillsModal").modal("hide");
    });
});


//* ---------------------------- Account Deleted ---------------------------- *//

$(document).ready(function(){
    $(document).on('click', '#account-deleted', function(e) {
        e.preventDefault();
        let userId = $(this).data('id'); // Get the user ID dynamically
    
        Swal.fire({
            title: "Are you sure?",
            text: "Your account and all related data will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete my account!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your account has been deleted.",
                    icon: "success",
                    showConfirmButton: true
                }).then((result) => {
                    if (result) {
                        window.location.href = `/owner/admin/delete/${userId}`;
                    }
                });
            }
        });
    });
});
