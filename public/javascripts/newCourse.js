//* ---------------------------- Image + Video ---------------------------- *//

$(document).ready(function() {
    $("#courseImage").on("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                $("#profileImage").attr("src", e.target.result).show();
                $(".default-icon").hide();
            };
            reader.readAsDataURL(file);
        }
    });

    $('#courseVideo').on('change', function (event) {
        const videoFile = event.target.files[0];
        const videoPreview = $('#videoPreview');
        const defaultIcon = $('.demo-video-icon');

        if (videoFile) {
            const videoURL = URL.createObjectURL(videoFile);
            videoPreview.attr('src', videoURL).show();
            defaultIcon.hide();
        }
    });
});


//* ---------------------------- Requirement + Learning Path ---------------------------- *//

$(document).ready(function () {

    let maxRequirements = 5;
    let maxLearningPath = 8;
    let minLearningPath = 3;
    let maxChars = 160;

    //* ------------------ Common Functions ------------------

    // Update Requirement Counter
    function updateRequirementCounter() {
        let count = $(".requirementInput").length;
        $("#requirementCounter").text(`${count}/${maxRequirements}`);
    }

    // Update Learning Path Counter
    function updateLearningPathCounter() {
        let count = $(".learning-path-input").length;
        $("#learning-path-counter").text(`${count}/${maxLearningPath}`);
    }

    // Handle Input Character Counter
    function handleInputCounter(input) {
        let currentLength = input.val().length;
        let remaining = maxChars - currentLength;
        let counter = input.closest(".inputGroupContainer").find(".input-counter");

        remaining = remaining < 0 ? 0 : remaining;
        counter.text(remaining);

        if (remaining <= 10) {
            counter.addClass("text-danger");
        } else {
            counter.removeClass("text-danger");
        }

        if (remaining === 0) {
            input.addClass("border-danger");
        } else {
            input.removeClass("border-danger");
        }
    }

    //* ------------------ Requirement Handling ------------------

    // Add New Requirement
    $("#requirement").on("click", function () {
        let currentCount = $(".requirementInput").length;
        let emptyExists = false;

        $(".requirementInput").each(function () {
            if ($(this).val().trim() === "") {
                $(this).addClass("is-invalid");
                emptyExists = true;
            } else {
                $(this).removeClass("is-invalid");
            }
        });

        if (emptyExists) {
            Swal.fire({
                icon: 'error',
                title: 'Empty Field Detected',
                text: 'Please fill all existing requirement fields before adding a new one.',
            });
            return;
        }

        if (currentCount < maxRequirements) {
            $("#newRequirement").append(`
                <div class="input-group mb-3 inputGroupContainer position-relative">
                    <input type="text" class="form-control rounded-start-2 py-3 pe-5 requirementInput" placeholder="Type Here" maxlength="${maxChars}" name="requirement" required>
                    <span class="input-group-text rounded-end-2 removeRequirement" style="cursor: pointer;">
                        <i class="bi bi-trash3 fs-4 mx-1 text-danger"></i>
                    </span>
                    <span class="input-counter position-absolute top-50 end-0 translate-middle-y text-muted" style="z-index: 1; font-size: 0.9rem; margin-right: 72px;">${maxChars}</span>
                </div>
            `);
            updateRequirementCounter();
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Limit Reached',
                text: `You can only add up to ${maxRequirements} requirements.`,
            });
        }
    });

    // Remove Requirement
    $(document).on("click", ".removeRequirement", function () {
        $(this).closest(".inputGroupContainer").remove();
        updateRequirementCounter();
    });

    //* ------------------ Learning Path Handling ------------------

    // Add New Learning Path
    $("#learning-path").on("click", function () {
        let currentCount = $(".learning-path-input").length;
        let emptyExists = false;

        $(".learning-path-input").each(function () {
            if ($(this).val().trim() === "") {
                $(this).addClass("is-invalid");
                emptyExists = true;
            } else {
                $(this).removeClass("is-invalid");
            }
        });

        if (emptyExists) {
            Swal.fire({
                icon: 'error',
                title: 'Empty Field Detected',
                text: 'Please fill all existing learning paths before adding a new one.',
            });
            return;
        }

        if (currentCount < maxLearningPath) {
            $("#new-learning-path").append(`
                <div class="input-group mb-3 inputGroupContainer position-relative">
                    <input type="text" class="form-control rounded-start-2 py-3 pe-5 learning-path-input" placeholder="Type Here" maxlength="${maxChars}" name="learning" required>
                    <span class="input-group-text rounded-end-2 remove-learning-path" style="cursor: pointer;">
                        <i class="bi bi-trash3 fs-4 mx-1 text-danger"></i>
                    </span>
                    <span class="input-counter position-absolute top-50 end-0 translate-middle-y text-muted" style="z-index: 1; font-size: 0.9rem; margin-right: 72px;">${maxChars}</span>
                </div>
            `);
            updateLearningPathCounter();
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Limit Reached',
                text: `You can only add up to ${maxLearningPath} learning paths.`,
            });
        }
    });

    // Remove Learning Path
    $(document).on("click", ".remove-learning-path", function () {
        let currentCount = $(".learning-path-input").length;
        if (currentCount > minLearningPath) {
            $(this).closest(".inputGroupContainer").remove();
            updateLearningPathCounter();
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Minimum Limit',
                text: `You must have at least ${minLearningPath} learning paths.`,
            });
        }
    });

    //* ------------------ Input Validation & Counters ------------------

    // Handle input events for both Requirement & Learning Path
    $(document).on("input", ".requirementInput, .learning-path-input", function () {
        handleInputCounter($(this));

        if ($(this).val().trim() !== "") {
            $(this).removeClass("is-invalid");
        }
    });

    //* ------------------ Form Submission ------------------

    $("form").on("submit", function (e) {
        let isValid = true;

        $(".requirementInput, .learning-path-input").each(function () {
            if ($(this).val().trim() === "") {
                $(this).addClass("is-invalid");
                isValid = false;
            }
        });

        if (!isValid) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Required Fields',
                text: 'Please fill out all fields before submitting.',
            });
        }
    });

    //* ------------------ Initial Counter Updates ------------------
    updateRequirementCounter();
    updateLearningPathCounter();
});


//* ---------------------------- Course Table of Content ---------------------------- *//

$(document).ready(function () {
    let maxCourseContent = 12;
    let minCourseContent = 1;
    let maxChars = 80;

    // Function to update course content counter
    function updateCourseCounter() {
        let count = $(".course-content-input").length;
        $("#course-counter").text(`${count}/${maxCourseContent}`);
    }

    // Function to update lecture numbering per course content section
    function updateLectureNumbers(courseSection) {
        courseSection.find(".lecture-item").each(function (index) {
            $(this).find(".lecture-counter").text(`${index + 1}.`);
        });
    }

    // Function to append a lecture inside a specific course content
    function appendLecture(courseSection) {
        const sectionIndex = $(".course-section").index(courseSection);
        let lectureID = `videoUpload-${Date.now()}`;
        let lectureTemplate = `
            <div class="p-2 d-flex flex-wrap align-items-center justify-content-between lecture-item">
                <div class="col-12 col-sm-6 mb-2 mb-sm-0">
                    <div class="input-group text-danger" style="display: flex; align-items: center;">
                        <span class="input-group-text text-dark-emphasis border-0 bg-transparent lecture-counter" style="min-width: 40px; text-align: center;">01.</span>
                        <input type="text" class="form-control text-dark-emphasis border-0" placeholder="New Lecture" name="lectureTitle[${sectionIndex}][]" value="Introduction">
                    </div>
                </div>

                <div class="video-upload-container">
                    <div class="upload-area bg-body-secondary">
                        <label for="${lectureID}" class="upload-label" style="cursor: pointer;">
                            <i class="bi bi-camera-video video-icon text-body-tertiary" style="font-size: 1.5rem;"></i>
                            <video class="uploadedVideo" style="width: 100%; height: 100%;display: none; object-fit: cover;"></video>
                        </label>
                        <input type="file" id="${lectureID}" class="videoUpload" name="lectureVideo" accept="video/*" hidden>
                    </div>
                </div>

                <div class="text-body-tertiary" style="font-size: calc(1.5rem); cursor: pointer;">
                    <span><i class="bi bi-plus-square add-lecture"></i></span>
                    <span><i class="bi bi-x-square remove-lecture"></i></span>
                </div>
            </div>
        `;

        courseSection.find(".new-lecture").append(lectureTemplate);
        updateLectureNumbers(courseSection);
    }

    $(document).on("change", ".videoUpload", function (event) {
        const videoFile = event.target.files[0];
        const lectureItem = $(this).closest(".lecture-item");
        const videoPreview = lectureItem.find(".uploadedVideo");
        const defaultIcon = lectureItem.find(".video-icon");

        if (videoFile) {
            const videoURL = URL.createObjectURL(videoFile);
            videoPreview.attr('src', videoURL).show();
            defaultIcon.hide();
        }
    });

    // Function to handle input character counter
    function handleInputCounter(input) {
        let currentLength = input.val().length;
        let remaining = maxChars - currentLength;
        let counter = input.closest(".inputGroupContainer").find(".input-counter");

        remaining = remaining < 0 ? 0 : remaining;
        counter.text(remaining);

        if (remaining <= 10) {
            counter.addClass("text-danger");
        } else {
            counter.removeClass("text-danger");
        }

        if (remaining === 0) {
            input.addClass("border border-danger").removeClass("border-0 border-bottom border-end");
        } else {
            input.removeClass("border-danger");
        }
    }

    // Function to append a course content input
    function appendCourseContent() {
        let courseContentTemplate = $(`
            <div class="col-12 border rounded-2 mb-2 course-section">
                <div class="input-group inputGroupContainer position-relative mb-0">
                    <input type="text" class="form-control border-0 border-bottom border-end py-3 pe-5 course-content-input" placeholder="Type Here" maxlength="80" name="sectionTitle" required>
                    <span class="input-group-text border-0 border-bottom rounded-end-2" style="cursor: pointer;">
                        <i class="bi bi-trash3 fs-4 mx-1 text-danger remove-course-content"></i>
                    </span>
                    <!-- Counter -->
                    <span class="input-counter position-absolute top-50 end-0 translate-middle-y text-muted" style="z-index: 1;font-size: 0.9rem; margin-right: 72px;">80</span>
                </div>
                <div class="new-lecture">
                    <!-- Lectures will be added here -->
                </div>
            </div>
        `);

        $("#new-course-content").append(courseContentTemplate);
        appendLecture(courseContentTemplate); // Add the first lecture
        updateCourseCounter();
    }

    // Dynamically add at least one course content on load
    for (let i = 0; i < minCourseContent; i++) {
        appendCourseContent();
    }

    // Add new course content on button click
    $("#course-content").on("click", function () {
        let currentCount = $(".course-content-input").length;
        let emptyExists = false;

        $(".course-content-input").each(function () {
            if ($(this).val().trim() === "") {
                $(this).addClass("is-invalid").removeClass("border-0 border-bottom border-end").addClass("border");
                emptyExists = true;
            } else {
                $(this).removeClass("is-invalid");
            }
        });

        if (emptyExists) {
            Swal.fire({
                icon: 'error',
                title: 'Empty Field Detected',
                text: 'Please fill all existing fields before adding a new one.',
            });
            return;
        }

        if (currentCount < maxCourseContent) {
            appendCourseContent();
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Limit Reached',
                text: `You can only add up to ${maxCourseContent} course contents.`,
            });
        }
    });

    // Remove course content input
    $(document).on("click", ".remove-course-content", function () {
        let currentCount = $(".course-content-input").length;
        if (currentCount > minCourseContent) {
            $(this).closest(".course-section").remove();
            updateCourseCounter();
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Minimum Limit',
                text: `You must have at least ${minCourseContent} course content.`,
            });
        }
    });

    // Remove invalid class when typing and update input counter
    $(document).on("input", ".course-content-input", function () {
        if ($(this).val().trim() !== "") {
            $(this).removeClass("is-invalid").addClass("border-0 border-bottom border-end").removeClass("border");
        }
        handleInputCounter($(this));
    });

    // Add new lecture inside the clicked course content
    $(document).on("click", ".add-lecture", function () {
        let courseSection = $(this).closest(".course-section");
        let emptyExists = false;
    
        // Check if any existing lecture input or video is empty
        // courseSection.find(".lecture-item").each(function () {
        //     let lectureInput = $(this).find("input[type='text']");
        //     let videoInput = $(this).find(".videoUpload");
        //     let uploadedVideo = $(this).find(".uploadedVideo");
    
        //     if (lectureInput.val().trim() === "" || !videoInput[0].files.length) {
        //         emptyExists = true;
        //     }
        // });
    
        // if (emptyExists) {
        //     Swal.fire({
        //         icon: "error",
        //         title: "Incomplete Lecture",
        //         text: "Please fill all lecture fields and upload a video before adding a new one.",
        //     });
        //     return;
        // }
    
        appendLecture(courseSection);
    });
    

    // Remove lecture from the specific course content section
    $(document).on("click", ".remove-lecture", function () {
        let courseSection = $(this).closest(".course-section");
        if (courseSection.find(".lecture-item").length > 1) {
            $(this).closest(".lecture-item").remove();
            updateLectureNumbers(courseSection);
        } else {
            Swal.fire({
                icon: "warning",
                title: "Minimum Limit",
                text: "At least one lecture is required.",
            });
        }
    });

    // Form submit validation
    $("form").on("submit", function (e) {
        let isValid = true;
        $(".course-content-input").each(function () {
            if ($(this).val().trim() === "") {
                $(this).addClass("is-invalid");
                isValid = false;
            }
        });

        if (!isValid) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Required Fields',
                text: 'Please fill out all fields before submitting.',
            });
        }
    });

    
    function updateLectureNumbers(courseSection) {
        courseSection.find(".lecture-item").each(function (index) {
            $(this).find(".lecture-counter").text(`${index + 1}.`);
    
            // Remove border-top for the first lecture, add it for others
            if (index === 0) {
                $(this).removeClass("border-top");
            } else {
                $(this).addClass("border-top");
            }
        });
    }

});


//* ---------------------------- Selected Topics ---------------------------- *//

$(document).ready(function () {
    let selectedTopics = [];

    $(".topic-checkbox").on("change", function () {
        let topic = $(this).val();

        if ($(this).is(":checked")) {
            if (selectedTopics.length >= 8) {
                $(this).prop("checked", false); // Prevent selection
                Swal.fire({
                    icon: "error",
                    title: "Limit Exceeded",
                    text: "You can select up to 8 topics only!",
                    confirmButtonColor: "#d33"
                });
                return;
            }
            selectedTopics.push(topic);
        } else {
            selectedTopics = selectedTopics.filter(t => t !== topic);
        }

        // Update counter
        $("#topic-count").html(`${selectedTopics.length}/8`);
    });
});


//* ---------------------------- Total Lecture + Lecture Video Duration + Set Price Plan ---------------------------- *//

$(document).ready(function() {
    // Function to handle radio button change (Free/Paid Course)
    $('input[name="flexRadioDefault"]').change(function() {
        if ($('#flexRadioDefault2').is(':checked')) {
            // If "Free" is selected, set Amount and Discount to 0 and disable input
            $('#phoneNumber').val(0).prop('readonly', true);
            $('#AmountFormInput').val(0).prop('readonly', true);
            $('#DiscountFormInput').val(0).prop('readonly', true);
        } else {
            // If "Paid" is selected, enable input for Amount and Discount
            $('#phoneNumber').val('').prop('readonly', false);
            $('#AmountFormInput').val('').prop('readonly', false);
            $('#DiscountFormInput').val('0').prop('readonly', false);
        }
    });

    // Allow only numbers in the amount and discount input fields
    $('#AmountFormInput, #DiscountFormInput, #phoneNumber').on('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    // Function to update lecture count and video duration
    function updateLectureStats() {
        let totalLectures = 0;
        let totalDuration = 0;
        let processedVideos = 0;
        let videoDurations = [];

        // Count lectures in each course section
        $(".course-section").each(function () {
            totalLectures += $(this).find(".lecture-item").length;
        });

        // Get all uploaded video elements
        let videoElements = $(".uploadedVideo");

        if (videoElements.length === 0) {
            displayLectureStats(totalLectures, totalDuration);
            return;
        }

        videoElements.each(function (index) {
            let videoElement = $(this);

            if (videoElement.attr("src")) {
                let video = document.createElement("video");
                video.src = videoElement.attr("src");
                video.preload = "metadata";

                video.onloadedmetadata = function () {
                    videoDurations[index] = video.duration;
                    processedVideos++;
                    checkIfProcessingDone();
                };

                video.onerror = function () {
                    processedVideos++;
                    checkIfProcessingDone();
                };
            } else {
                processedVideos++;
                checkIfProcessingDone();
            }
        });

        function checkIfProcessingDone() {
            if (processedVideos === videoElements.length) {
                totalDuration = videoDurations.reduce((acc, val) => acc + (val || 0), 0);
                displayLectureStats(totalLectures, totalDuration);
            }
        }

        // Update UI immediately
        displayLectureStats(totalLectures, totalDuration);
    }

    // Function to update UI with lecture count and duration
    function displayLectureStats(lectureCount, duration) {
        let hours = Math.floor(duration / 3600);
        let minutes = Math.floor((duration % 3600) / 60);

        $("#course-lecture-count").text(`${lectureCount} lectures`);
        $("#course-lecture-video-duration").text(`${hours}h ${minutes}min`);
    }

    // Event Listeners (Add, Remove, and Update lectures)

    $(document).on("click", ".add-lecture, #course-content", function () {
        setTimeout(updateLectureStats, 50);
    });

    $(document).on("click", ".remove-lecture, .remove-course-content", function () {
        setTimeout(updateLectureStats, 50);
    });

    // Trigger update when a video is uploaded
    $(document).on("change", ".videoUpload", function () {
        setTimeout(updateLectureStats, 200);
    });

    // Ensure stats update on page load
    setTimeout(updateLectureStats, 200);
});


//* ---------------------------- Title + Paragraph + About Course = Counter ---------------------------- *//

$(document).ready(function () {
    let maxChars = 80;
    let aboutMaxChars = 200;
    let $paragraphTextarea = $("#paragraph");
    let $aboutTextarea = $("#aboutCourse");
    let $bioInput = $("#title");
    let $charCounter = $("#charCounter");
    let $paragraphCharCounter = $("#paragraphCharCounter");
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
  
    $paragraphTextarea.on("input", function () {
        let value = $(this).val();
        let length = value.length;
  
        if (length > aboutMaxChars) {
            $(this).val(value.substring(0, aboutMaxChars)); // Prevent input beyond 200
                length = aboutMaxChars;
        }
  
        $paragraphCharCounter.text(length + " / " + aboutMaxChars);
  
            // Show error if max length is reached
        if (length >= aboutMaxChars) {
            $paragraphCharCounter.addClass("error");
            $paragraphTextarea.addClass("is-invalid");
        } else {
            $paragraphCharCounter.removeClass("error");
            $paragraphTextarea.removeClass("is-invalid");
        }
  
    });

    $aboutTextarea.on("input", function () {
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
            $aboutTextarea.addClass("is-invalid");
        } else {
            $aboutCharCounter.removeClass("error");
            $aboutTextarea.removeClass("is-invalid");
        }
  
    });
});


//* ---------------------------- Calendar ---------------------------- *//

$(document).ready(function () {
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    function updateCalendar() {
        const calendar = document.getElementById("calendar");
        const daysContainer = document.getElementById("days");
        const monthYear = document.getElementById("monthYear");
        const now = new Date();
        const today = now.getDate();
        
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
        const prevLastDate = new Date(currentYear, currentMonth, 0).getDate();
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        monthYear.textContent = new Date(currentYear, currentMonth).toLocaleString("default", { month: "long", year: "numeric" });
        calendar.innerHTML = "";
        daysContainer.innerHTML = "";
        
        daysOfWeek.forEach(day => {
            const dayHeader = document.createElement("div");
            dayHeader.classList.add("day-header");
            dayHeader.textContent = day;
            daysContainer.appendChild(dayHeader);
        });
        
        for (let i = firstDay - 1; i >= 0; i--) {
            const emptyCell = document.createElement("div");
            emptyCell.classList.add("day", "other-month");
            emptyCell.textContent = prevLastDate - i;
            calendar.appendChild(emptyCell);
        }
        
        for (let date = 1; date <= lastDate; date++) {
            const dayCell = document.createElement("div");
            dayCell.classList.add("day");
            dayCell.textContent = date;
            dayCell.onclick = () => {
                document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
                dayCell.classList.add('selected');
            };
            
            if (date === today && currentMonth === now.getMonth() && currentYear === now.getFullYear()) {
                dayCell.classList.add("current-day");
            }
            
            calendar.appendChild(dayCell);
        }
        
        const nextDays = 42 - (firstDay + lastDate);
        for (let i = 1; i <= nextDays; i++) {
            const nextCell = document.createElement("div");
            nextCell.classList.add("day", "other-month");
            nextCell.textContent = i;
            calendar.appendChild(nextCell);
        }
    }

    window.changeMonth = function (step) {
        currentMonth += step;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        } else if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    };

    function updateTime() {
        const now = new Date();
        document.getElementById("currentTime").textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    updateCalendar();
    setInterval(updateTime, 1000);
})