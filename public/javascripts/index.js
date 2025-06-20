//* ---------------------------- Navbar ---------------------------- *//

$(document).ready(function() {
    $('.cart-container').hover(function() {
        $('.cart-dropdown').fadeIn(200);
    }, function() {
        setTimeout(() => { 
            if (!$('.cart-dropdown:hover, .cart-container:hover').length) {
                $('.cart-dropdown').fadeOut(200);
            }
        }, 200);
    });

    $('.cart-dropdown').hover(function() {
        $(this).stop(true, true).fadeIn(200);
    }, function() {
        setTimeout(() => { 
            if (!$('.cart-dropdown:hover, .cart-container:hover').length) {
                $('.cart-dropdown').fadeOut(200);
            }
        }, 200);
    });
});

$(document).ready(function() {
    $('.user-profile').hover(function() {
        $('.user-profile-dropdown').fadeIn(200);
    }, function() {
        setTimeout(() => { 
            if (!$('.user-profile-dropdown:hover, .user-profile:hover').length) {
                $('.user-profile-dropdown').fadeOut(200);
            }
        }, 200);
    });

    $('.user-profile-dropdown').hover(function() {
        $(this).stop(true, true).fadeIn(200);
    }, function() {
        setTimeout(() => { 
            if (!$('.user-profile-dropdown:hover, .user-profile:hover').length) {
                $('.user-profile-dropdown').fadeOut(200);
            }
        }, 200);
    });
});

$(document).ready(function() {
  const cartCount = parseInt($('.cart-counter').text());

  if (cartCount > 0) {
    $('.profile-cart-counter').removeClass('d-none');
  }
});


//* ---------------------------- Index Page ---------------------------- *//

$(document).ready(function () {
    // User data to be appended dynamically
    var users = [
      {
        id: 1,
        imgSrc: "/images/testinomial-1.jpg",
        imgSrcTop: "/icons/div.testimonials__icon.png",
        title: "Excellent Service!",
        description: "As General Manager of eLMS, I’m proud to ensure smooth operations and a seamless learning experience through efficient team coordination and platform excellence.",
        userName: "Muhammad Shahood",
        position: "General Manager eLMS"
      },
      {
        id: 2,
        imgSrc: "/images/testinomial-2.jpg",
        imgSrcTop: "/icons/div.testimonials__icon.png",
        title: "Excellent Service!",
        description: "This platform completely transformed our training process—its intuitive design, rich features, and responsive support made learning enjoyable, efficient, and highly productive for our entire team.",
        userName: "Liam Smith",
        position: "HR Director, InnovateCorp"
      },
      {
        id: 3,
        imgSrc: "/images/testinomial-3.jpg",
        imgSrcTop: "/icons/div.testimonials__icon.png",
        title: "Excellent Service!",
        description: "We were amazed by the level of customization and the seamless integration with our systems; the learners stayed engaged, and our completion rates have never been better.",
        userName: "Henry Harris",
        position: "Product Manager, EduUpdate"
      },
      {
        id: 4,
        imgSrc: "/images/testinomial-4.jpg",
        imgSrcTop: "/icons/div.testimonials__icon.png",
        title: "Excellent Service!",
        description: "The blend of visuals, quizzes, and real-time feedback made our online programs more effective than traditional classrooms—our learners genuinely enjoy the experience.",
        userName: "Aisha Khan",
        position: "Training Manager, EduTech"
      },
      {
        id: 5,
        imgSrc: "/images/testinomial-5.jpg",
        imgSrcTop: "/icons/div.testimonials__icon.png",
        title: "Excellent Service!",
        description: "Every aspect of the platform reflects thoughtful design—from video streaming to progress tracking—making it an ideal choice for organizations serious about upskilling their teams",
        userName: "Evelyn Martin",
        position: "Security Analyst"
      },
      {
        id: 6,
        imgSrc: "/images/testinomial-6.jpg",
        imgSrcTop: "/icons/div.testimonials__icon.png",
        title: "Excellent Service!",
        description: "We finally found a platform that’s powerful yet easy to use; whether managing content or analyzing results, everything just works, which lets us focus on growth",
        userName: "Emma Williams",
        position: "Curriculum Developer"
      },
      {
        id: 7,
        imgSrc: "/images/testinomial-7.jpg",
        imgSrcTop: "/icons/div.testimonials__icon.png",
        title: "Excellent Work!",
        description: "Every aspect of the platform reflects thoughtful design—from video streaming to progress tracking—making it an ideal choice for organizations serious about upskilling their teams.",
        userName: "Hassan Mehmood",
        position: "Digital Learning Lead"
      },
      {
        id: 8,
        imgSrc: "/images/testinomial-8.jpg",
        imgSrcTop: "/icons/div.testimonials__icon.png",
        title: "Excellent Work!",
        description: "We were amazed by the level of customization and the seamless integration with our systems; the learners stayed engaged, and our completion rates have never been better.",
        userName: "Junaid Arshad",
        position: "CEO, Pinex Decors"
      },
      {
        id: 9,
        imgSrc: "/images/testinomial-9.jpg",
        imgSrcTop: "/icons/div.testimonials__icon.png",
        title: "Excellent Work!",
        description: "Thanks to their cutting-edge features, we’ve seen better engagement and retention rates; the interactive tools keep learners involved from the first module to the last quiz.",
        userName: "Mouazam Tariq",
        position: "Beautiful biCorporate Trainer, SkillBridge"
      },
      {
        id: 10,
        imgSrc: "/images/testinomial-10.jpg",
        imgSrcTop: "/icons/div.testimonials__icon.png",
        title: "Excellent Work!",
        description: "This learning system is both scalable and future-ready, enabling us to manage multiple courses, monitor performance, and enhance user engagement all within one beautifully organized platform.",
        userName: "Ali Raza",
        position: "Learning Strategist"
      },
      {
        id: 11,
        imgSrc: "/images/testinomial-11.jpg",
        imgSrcTop: "/icons/div.testimonials__icon.png",
        title: "Excellent Work!",
        description: "From onboarding to course completion, everything felt smooth and well-thought-out—exactly what we needed for delivering professional-grade training content to our growing user base.",
        userName: "Saimran Khan",
        position: "Education Consultant"
      },
      {
        id: 12,
        imgSrc: "/images/testinomial-12.webp",
        imgSrcTop: "/icons/div.testimonials__icon.png",
        title: "Excellent Work!",
        description: "From user management it’s clear that this system was built by people who understand education—every feature feels intentional and geared toward real outcomes.",
        userName: "Hamza Noor",
        position: "LMS Administrator"
      },
      {
        id: 13,
        imgSrc: "/images/testinomial-13.jpg",
        imgSrcTop: "/icons/div.testimonials__icon.png",
        title: "Excellent Experience!",
        description: "The blend of visuals, quizzes, and real-time feedback made our online programs more effective than traditional classrooms—our learners genuinely enjoy the experience.",
        userName: "Zoya Nasir",
        position: "Instructional Designer"
      },
      {
        id: 14,
        imgSrc: "/images/testinomial-14.jpg",
        imgSrcTop: "/icons/div.testimonials__icon.png",
        title: "Excellent Experience!",
        description: "This eLearning system doesn’t just deliver content—it creates meaningful learning journeys, helping users connect with material in ways we hadn’t seen before in digital environments.",
        userName: "Sarah Malik",
        position: "E-learning Consultant"
      },
      {
        id: 15,
        imgSrc: "/images/testinomial-15.jpg",
        imgSrcTop: "/icons/div.testimonials__icon.png",
        title: "Excellent Experience!",
        description: "This platform has redefined how we deliver learning—effortless navigation, insightful analytics, and seamless video integration make it a complete education ecosystem.",
        userName: "Rafay Siddiqui",
        position: "Learning Systems Architect"
      },
      {
        id: 16,
        imgSrc: "/images/testinomial-16.jpg",
        imgSrcTop: "/icons/div.testimonials__icon.png",
        title: "Excellent Experience!",
        description: "We switched to this LMS for its interactive modules and stayed for its continuous support, mobile access, and streamlined course publishing tools.",
        userName: "Imran Abbas",
        position: "Corporate Educator"
      },
      {
        id: 17,
        imgSrc: "/images/testinomial-17.jpg",
        imgSrcTop: "/icons/div.testimonials__icon.png",
        title: "Excellent Experience!",
        description: "The LMS lets us build beautiful, functional courses & We were able to launch our academy quickly and efficiently, with tools that support growth and easy onboarding of instructors and students.",
        userName: "Daniyal Riaz",
        position: "Online Academy Manager"
      },
      {
        id: 18,
        imgSrc: "/images/testinomial-18.jpg",
        imgSrcTop: "/icons/div.testimonials__icon.png",
        title: "Excellent Experience!",
        description: "The user experience is exceptional.We saw a big improvement in learner satisfaction after switching to this platform—it’s intuitive, flexible, and tailored for results.",
        userName: "Arham Khalil",
        position: "Professional Development Manager"
      },
    ];
  
    // Initial active user for each section
    var activeUsers = {
      'section-1': {
        id: 'active1',
        imgSrc: "/images/CEO.jpg",
        imgSrcTop: "/icons/div.testimonials__icon.png",
        title: "Excellent Service!",
        description: "As CEO of eLMS, I’m proud to lead a platform that simplifies online learning through smart course management and seamless user experience.",
        userName: "Ale Graphics",
        position: "CEO eLMS"
      },
      'section-2': {
        id: 'active2',
        imgSrc: "/images/General Manager.jpg",
        imgSrcTop: "/icons/div.testimonials__icon.png",
        title: "Excellent Work!",
        description: "Our e-learning platform offers interactive course management, video-based learning, and certificate generation—designed for an engaging, user-friendly experience",
        userName: "Hussain Ahmad",
        position: "General Manager eLMS"
      },
      'section-3': {
        id: 'active3',
        imgSrc: "/images/Project Manager.jpg",
        imgSrcTop: "/icons/div.testimonials__icon.png",
        title: "Excellent Experience!",
        description: "This eLearning system doesn’t just deliver content—it creates meaningful learning journeys, helping users connect with material in ways we hadn’t seen before in digital environments",
        userName: "Sofia Martinez",
        position: "Project Manager eLMS"
      },
  
    };
  
    // Function to display the active user's data in a specific section
    function setActiveUserForSection(sectionId, user) {
      var newUserData = `
        <div class="text-center d-flex flex-column align-items-center" id="user-${user.id}">
            <div class="user mb-5">
              <img class="top" src="${user.imgSrcTop}">
              <img id="user" src="${user.imgSrc}">
            </div>
            <p class="mb-2 text-primary-emphasis">${user.title}</p>
            <p style="font-size: 12px;">${user.description}</p>
            <p style="font-size: 14px;" class="mb-0 text-primary-emphasis">${user.userName}</p>
            <p style="font-size: 12px;" class="mb-5 text-primary-emphasis">${user.position}</p>
        </div>
      `;
  
      // Update the specific section with the new active user data
      $(`#${sectionId} .active-user #user-data-container`).html(newUserData);
    }
  
    // Initialize the active user display for each section
    for (var sectionId in activeUsers) {
      setActiveUserForSection(sectionId, activeUsers[sectionId]);
    }
  
    // On clicking a thumbnail, swap the active user with the clicked thumbnail for the respective section
    $(document).on('click', '.user-thumbnails img', function () {
      var clickedThumbnail = $(this);
      var sectionId = clickedThumbnail.closest('.user-review-container').attr('data-section'); // Get the section ID
  
      // Get the clicked thumbnail's data
      var clickedUser = {
        id: clickedThumbnail.data('id'),
        imgSrc: clickedThumbnail.attr('src'),
        imgSrcTop: clickedThumbnail.attr('data-imgSrcTop'),
        title: clickedThumbnail.data('title'),
        description: clickedThumbnail.data('description'),
        userName: clickedThumbnail.data('username'),
        position: clickedThumbnail.data('position')
      };
  
      // If the clicked user is already the active user in that section, do nothing
      if (clickedUser.id === activeUsers[sectionId].id) {
        return;
      }
  
      // Swap the clicked thumbnail's data with the current active user for that section
      clickedThumbnail.attr('src', activeUsers[sectionId].imgSrc)
                      .attr('data-imgSrcTop', activeUsers[sectionId].imgSrcTop)
                      .data('id', activeUsers[sectionId].id)
                      .data('title', activeUsers[sectionId].title)
                      .data('description', activeUsers[sectionId].description)
                      .data('username', activeUsers[sectionId].userName)
                      .data('position', activeUsers[sectionId].position);
  
      // Update the active user for that section
      activeUsers[sectionId] = clickedUser;
  
      // Update the active user section with the new active user data
      setActiveUserForSection(sectionId, activeUsers[sectionId]);
    });
  
    // Append user data attributes to the images dynamically
    function initializeUserThumbnails() {
      $('.user-thumbnails img').each(function () {
        var imgElement = $(this);
        var reviewId = imgElement.attr('data-review-id'); // Get the data-review-id attribute
        var user = users.find(u => u.id == reviewId); // Match the user data by ID
  
        if (user) {
          imgElement.attr('data-id', user.id)
                    .attr('data-imgSrcTop', user.imgSrcTop)
                    .attr('data-title', user.title)
                    .attr('data-description', user.description)
                    .attr('data-username', user.userName)
                    .attr('data-position', user.position);
        }
      });
    }
  
    // Initialize user thumbnails with proper data
    initializeUserThumbnails();
});

$(document).ready(function(){
    $('.client-owl').owlCarousel({
      loop: true,
      margin: 10,
      nav: false,
      dots: true,
      items: 1,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var swiper = new Swiper(".top-companies-swiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },
        breakpoints: {
          100 : {
              slidesPerView: 1,
          },
          320 : {
              slidesPerView: 1.5,
          },
          465 : {
              slidesPerView: 2,
          },
          620 : {
              slidesPerView: 2.5,
          },
          768 : {
              slidesPerView: 3,
          }
        }
    });


    var swiper = new Swiper(".course-card-swiper", {
        slidesPerView: 5,
        spaceBetween: 25,
        navigation: {
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        },
        breakpoints: {
          100 : {
              slidesPerView: 1,
          },
          320 : {
              slidesPerView: 1,
          },
          465 : {
              slidesPerView: 1.5,
          },
          620 : {
              slidesPerView: 2,
          },
          875 : {
              slidesPerView: 2.5,
          },
          1024 : {
              slidesPerView: 3,
          },
          1250 : {
              slidesPerView: 3.5,
          },
          1440 : {
              slidesPerView: 5,
          }
        }
    });
});

//! Index Page Explore Topics
$(document).ready(function () {

  let categoriesData = {
    "Development": {
        label: "Development",
        subcategories: {
            "Web Development": {
                label: "Web Development",
                topics: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Angular", "Vue.js", "Svelte", "Next.js", "Bootstrap", "Tailwind CSS"]
            },
            "Mobile App Development": {
                label: "Mobile App Development",
                topics: ["Flutter", "React Native", "Swift", "Kotlin", "Java for Android"]
            },
            "Game Development": {
                label: "Game Development",
                topics: ["Unity", "Unreal Engine", "Godot", "C#", "C++", "Game Design", "2D Game Development", "3D Game Development"]
            },
            "Programming Language": {
                label: "Programming Language",
                topics: ["Python", "Java", "C", "C++", "C#", "Rust", "Go", "Swift", "Ruby", "Perl", "Scala"]
            },
            "System Design": {
                label: "System Design",
                topics: ["Microservices", "Database Design", "Scalability", "Architecture Patterns"]
            },
            "Database Management": {
                label: "Database Management",
                topics: ["SQL", "MySQL", "PostgreSQL", "MongoDB", "Firebase", "Oracle Database", "NoSQL"]
            },
            "DevOps": {
                label: "DevOps & Cloud",
                topics: ["Docker", "Kubernetes", "CI/CD", "AWS", "Google Cloud", "Azure", "Terraform"]
            },
        }
    },
    "Data Science & AI": {
        label: "Data Science & AI",
        subcategories: {
            "Data Science": {
                label: "Data Science",
                topics: ["Data Analytics", "Data Engineering", "Data Visualization", "Pandas", "NumPy", "R Programming"]
            },
            "Machine Learning": {
                label: "Machine Learning",
                topics: ["Deep Learning", "Artificial Intelligence", "TensorFlow", "PyTorch", "Scikit-Learn"]
            },
            "Big Data": {
                label: "Big Data",
                topics: ["Hadoop", "Spark", "Kafka"]
            }
        }
    },
    "IT & Software": {
        label: "IT & Software",
        subcategories: {
           "IT Certification": {
                label: "IT Certification",
                topics: ["AWS Certification", "Cisco Certification", "CompTIA A+", "Microsoft Azure", "Google Cloud Certification" ]
            },
            "Cyber Security": {
                label: "Cyber Security",
                topics: ["Ethical Hacking", "Penetration Testing", "Network Security","Networking", "Cryptography", "Firewalls", "Cloud Security"]
            },
            "Cloud Computing": {
                label: "Cloud Computing",
                topics: ["AWS", "Google Cloud", "Microsoft Azure", "Docker", "Kubernetes", "CI/CD"]
            }
        }
    },
    "Business": {
        label: "Business",
        subcategories: {
            "Marketing": {
                label: "Marketing",
                topics: ["Digital Marketing", "SEO", "Google Ads", "Facebook Ads", "Content Marketing"]
            },
            "Finance & Accounting": {
                label: "Finance & Accounting",
                topics: ["Stock Market", "Investing & Trading", "Cryptocurrency", "Project Management", "Business Analytics"]
            },
            "Project Management": {
               label: "Project Management",
               topics: [ "Agile", "Scrum", "PMP", "Kanban", "Product Roadmaps"]
            },
            "E-commerce Marketing": {
                label: "E-commerce Marketing",
                topics: ["Shopify Development", "Dropshipping"]
            },
            "Affiliate Marketing": {
                label: "Affiliate Marketing",
                topics: ["Amazon Affiliate", "ClickBank"]
            }
        }
    },
    "Design & Creativity": {
        label: "Design & Creativity",
        subcategories: {
            "Graphic Design": {
                label: "Graphic Design",
                topics: ["Figma", "Adobe Photoshop", "Adobe Illustrator", "Canva"]
            },
            "UI/UX Design": {
                label: "UI/UX Design",
                topics: ["Wireframing", "Prototyping", "Adobe XD", "Sketch"]
            },
            "3D Modeling": {
                label: "3D Modeling",
                topics: ["Blender", "Maya", "Cinema 4D", "ZBrush"]
            },
            "Motion Graphics": {
                label: "Motion Graphics",
                topics: ["Adobe After Effects", "Animation Principles"]
            },
            "Game Design": {
                label: "Game Design",
                topics: ["Game Mechanics", "Level Design"]
            }
        }
    },
    "Personal Development": {
        label: "Personal Development",
        subcategories: {
            "Productivity": {
                label: "Productivity",
                topics: ["Time Management", "Goal Setting", "Focus Techniques", "Speed Reading", "Memory Improvement"]
            },
            "Mindfulness": {
                label: "Mindfulness & Wellness",
                topics: ["Meditation", "Stress Management", "Yoga"]
            }
        }
    },
    "Photography & Video": {
        label: "Photography & Video",
        subcategories: {
            "Photo Editing": {
                label: "Photo Editing",
                topics: ["Lightroom", "Photoshop", "GIMP", "Color Correction", "Retouching"]
            },
            "Digital Photography": {
                label: "Digital Photography",
                topics: ["DSLR Basics", "Lighting Techniques", "Portrait Photography", "Landscape Photography", "Street Photography", "Wildlife Photography"]
            },
            "Videography": {
                label: "Videography",
                topics: ["Video Editing", "Adobe Premiere Pro", "Final Cut Pro", "Cinematography", "Drone Videography", "YouTube Video Creation", "Storytelling in Film"]
            }
        }
    },
    "Health & Fitness": {
    label: "Health & Fitness",
    subcategories: {
      "Nutrition": {
        label: "Nutrition",
        topics: [
          "Dieting", "Healthy Eating", "Weight Loss", "Keto Diet", 
          "Vegan Diet", "Sports Nutrition", "Intermittent Fasting"
        ]
      },
      "Fitness": {
        label: "Fitness",
        topics: [
          "Workout Routines", "Bodybuilding", "Yoga", "Pilates", 
          "HIIT Workouts", "Strength Training", "Flexibility & Mobility"
        ]
      },
      "Mental Health": {
        label: "Mental Health",
        topics: [
          "Mindfulness", "Meditation", "Stress Management", "Self-Care", 
          "Sleep Improvement", "Cognitive Behavioral Therapy (CBT)", "Emotional Intelligence"
        ]
      }
    }
    },
    "Teaching & Academics": {
        label: "Teaching & Academics",
        subcategories: {
            "Engineering": {
                label: "Engineering",
                topics: ["Mechanical Engineering", "Civil Engineering", "Electrical Engineering", "Chemical Engineering"]
            },
            "Science": {
                label: "Science",
                topics: ["Physics", "Biology", "Chemistry", "Astronomy"]
            },
            "Mathematics": {
                label: "Mathematics",
                topics: ["Algebra", "Calculus", "Statistics", "Probability", "Linear Algebra", "Discrete Math"]
            }
        }
    }
  };
  // Append categories dynamically
  Object.keys(categoriesData).forEach(category => {
    $(".category-list").append(`
      <div class="category-item d-flex align-items-center justify-content-between px-3" data-category="${category}">
        <p class="mb-0">${categoriesData[category].label}</p>
        <i class="fa-solid fa-chevron-right me-lg-1" style="font-size: 10px;"></i>
      </div>
    `);
  });

  // Step 1 Hover: Show dropdown
  $('#exploreDropdown').hover(function() {
    $('.step-1').fadeIn(200);
    $('.step-2, .step-3').fadeOut(200);
  }, function() {
    setTimeout(() => { 
      if (!$('.step-1:hover, .step-2:hover, .step-3:hover').length) {
        $('.step-1').fadeOut(200);
      }
    }, 300);
  });

  // Step 2: Show subcategories dynamically when hovering a category
  $(document).on("mouseenter", ".category-item", function () {
    let category = $(this).data("category");
    $(".subcategory-list").empty(); // Clear previous subcategories
    $(".step-2").fadeIn(200);
    $(".step-3").fadeOut(200);

    Object.keys(categoriesData[category].subcategories).forEach(subcategory => {
      $(".subcategory-list").append(`
        <div class="subcategory-item d-flex align-items-center justify-content-between px-3" data-subcategory="${subcategory}">
          <p class="mb-0">${categoriesData[category].subcategories[subcategory].label}</p>
          <i class="fa-solid fa-chevron-right me-lg-1" style="font-size: 10px;"></i>
        </div>
      `);
    });

    $('.category-item').removeClass('active');
    $(this).addClass('active');
  });

  // Step 3: Show topics dynamically when hovering a subcategory
  $(document).on("mouseenter", ".subcategory-item", function () {
    let subcategory = $(this).data("subcategory");
    $(".detail-list").empty(); // Clear previous topics
    $(".step-3").fadeIn(200);

    Object.values(categoriesData).forEach(category => {
      if (category.subcategories[subcategory]) {
        category.subcategories[subcategory].topics.forEach(topic => {
          $(".detail-list").append(`<a class="px-3 d-block" href="#">${topic}</a>`);
        });
      }
    });

    $('.subcategory-item').removeClass('active');
    $(this).addClass('active');
  });

  // Hide dropdown when mouse leaves
  $('.dropdown-menu').mouseleave(function() {
    setTimeout(() => { 
      if (!$('.dropdown-menu:hover').length) {
        $('.dropdown-menu').fadeOut(200);
        $('.category-item, .subcategory-item').removeClass('active');
      }
    }, 300);
  });


  //! Home Page Explore Topics Hover 
  $('.step-1').hover(
    function() {
        $(this).css('border-radius', '5px 0 0 5px');
        $('.step-2').css('border-radius', '0 5px 5px 0');
    },
    function() {
        $(this).css('border-radius', '5px');
        $('.step-2').css('border-radius', '5px');
    }
  );

  $('.step-2').hover(
    function() {
        $('.step-1').css('border-radius', '5px 0 0 5px');
        $(this).css('border-radius', '0');
        $('.step-3').css('border-radius', '0 5px 5px 0');
    },
    function() {
        $('.step-1').css('border-radius', '5px');
        $(this).css('border-radius', '5px');
        $('.step-3').css('border-radius', '5px');
    }
  );

  $('.step-3').hover(
    function() {
        $('.step-1').css('border-radius', '5px 0 0 5px');
        $('.step-2').css('border-radius', '0');
        $(this).css('border-radius', '0 5px 5px 0');
    },
    function() {
        $('.step-1').css('border-radius', '5px');
        $('.step-2').css('border-radius', '5px');
        $(this).css('border-radius', '5px');
    }
  );
  


  

   function getMatchingResults(query) {
        let results = [];

        Object.keys(categoriesData).forEach(category => {
            if (category.toLowerCase().startsWith(query.toLowerCase())) {
                results.push({ type: "category", name: categoriesData[category].label });
            }

            Object.keys(categoriesData[category].subcategories).forEach(subcategory => {
                if (subcategory.toLowerCase().startsWith(query.toLowerCase())) {
                    results.push({ type: "subcategory", name: categoriesData[category].subcategories[subcategory].label });
                }

                categoriesData[category].subcategories[subcategory].topics.forEach(topic => {
                    if (topic.toLowerCase().startsWith(query.toLowerCase())) {
                        results.push({ type: "topic", name: topic });
                    }
                });
            });
        });

        return results;
    }

    // Search input event
    // $("#searchInput").on("input", function () {
    //     let searchQuery = $(this).val().trim();
    //     let suggestionList = $("#searchSuggestions");
    //     suggestionList.empty();

    //     if (searchQuery.length >= 1) {
    //         let matchingResults = getMatchingResults(searchQuery);

    //         if (matchingResults.length > 0) {
    //             matchingResults.forEach((result, index) => {
    //                 suggestionList.append(`
    //                     <li class="col-12 d-flex align-items-center justify-content-between" data-index="${index}">
    //                         <p class="mb-0">${result.name}</p>
    //                         <span class="close-btn fs-5">&times;</span>
    //                     </li>
    //                 `);
    //             });
    //             suggestionList.show();
    //         } else {
    //             suggestionList.hide();
    //         }
    //     } else {
    //         suggestionList.hide();
    //     }
    // });

    // $(document).on("click", "#searchSuggestions li", function () {
    //     let selectedText = $(this).find("p").text().trim();
    //   $("#searchInput").val(selectedText);
    //   $("#searchSuggestions").hide();

    //   // Ensure topic is retained when searching
    //   window.location.href = `/courses?search=${encodeURIComponent(selectedText)}&topic=${encodeURIComponent(selectedText)}`;
    // });

    $("#searchInput").on("input", function () {
        let searchQuery = $(this).val().trim();
        let suggestionList = $("#searchSuggestions");
        suggestionList.empty();
    
        if (searchQuery.length >= 1) {
            $.ajax({
                url: `/api/search-suggestions?q=${encodeURIComponent(searchQuery)}`,
                method: "GET",
                success: function (matchingResults) {
                    if (matchingResults.length > 0) {
                        matchingResults.forEach((result, index) => {
                            suggestionList.append(`
                                <li class="col-12 d-flex align-items-center justify-content-between" data-index="${index}">
                                    <p class="mb-0">${result.name}</p>
                                    <span class="close-btn fs-5">&times;</span>
                                </li>
                            `);
                        });
                        suggestionList.show();
                    } else {
                        suggestionList.hide();
                    }
                },
                error: function (err) {
                    console.error("Error fetching suggestions:", err);
                    suggestionList.hide();
                }
            });
        } else {
            suggestionList.hide();
        }
    });
    
    $(document).on("click", "#searchSuggestions li", function () {
        let selectedTopic = $(this).find("p").text().trim();
        $("#searchInput").val(selectedTopic);
        $("#searchSuggestions").hide();
    
        // Redirect to filtered courses page with topic only
        window.location.href = `/courses?topic=${encodeURIComponent(selectedTopic)}`;
    });

    // Click event to remove an item from suggestions
    $(document).on("click", ".close-btn", function (e) {
        e.stopPropagation(); // Prevent clicking from selecting the item
        $(this).closest("li").remove();

        // Hide the suggestions list if empty
        if ($("#searchSuggestions li").length === 0) {
            $("#searchSuggestions").hide();
        }
    });

    // Hide search suggestions when clicking outside
    $(document).click(function (e) {
        if (!$(e.target).closest("#searchInput, #searchSuggestions").length) {
            $("#searchSuggestions").hide();
        }
    });
});

$(document).ready(function () { 
    // Extract topic from URL
    const urlParams = new URLSearchParams(window.location.search);
    const topic = urlParams.get("topic");

    if (topic) {
        $(".select-category-name").text(decodeURIComponent(topic)); // Update h3 with the topic
    }

    // When clicking a category, keep the topic in the URL
    $(document).on("click", ".category-item, .subcategory-item, .detail-list a", function () {
        let newTopic = $(this).text().trim(); 

        window.location.href = `/courses?topic=${encodeURIComponent(newTopic)}`;
    });

    // Handle single-course navigation while keeping the topic
    $(document).on("click", ".course-link", function (e) {
        e.preventDefault(); // Prevent default link behavior

        let courseId = $(this).attr("href").split('/').pop(); // Get course ID from data attribute
        let topicParam = topic ? `?topic=${encodeURIComponent(topic)}` : ''; // Only add topic if it exists

        // Redirect to the single course page while keeping the topic
        window.location.href = `/courses/single-course/${courseId}${topicParam}`;
    });
});


//* ---------------------------- Login & Register Page ---------------------------- *//

$(document).ready(function () {
  $('#toggleIcon').click(function () {
    const passwordInput = $('#password');
    const inputType = passwordInput.attr('type') === 'password' ? 'text' : 'password';
    passwordInput.attr('type', inputType);
    $(this).toggleClass('bi-eye bi-eye-slash');
  });
});

document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.form-swiper', {
      slidesPerView: 1,
      autoplay : true,
      loop: true,
      navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
    });
});


//* ---------------------------- All Courses Page ---------------------------- *//

$(document).ready(function () {
    let coursesPerPage = 12;
    let currentPage = 1;
    let totalPages;
    let maxVisiblePages;
    let firstVisiblePage = 1;
    let filteredCourses = $('.courses'); // Stores filtered courses

    function updateMaxVisiblePages() {
        let width = $(window).width();
        maxVisiblePages = width <= 400 ? 3 : width <= 500 ? 5 : 7;
    }

    updateMaxVisiblePages();

    function filterCourses() {
        let selectedPrices = $('input[name="price"]:checked').map(function () { return $(this).attr('id'); }).get();
        let selectedLanguages = $('input[name="language"]:checked').map(function () { return $(this).attr('id'); }).get();
        let selectedLevels = $('input[name="level"]:checked').map(function () { return $(this).attr('id'); }).get();
        let selectedVideos = $('input[name="video"]:checked').map(function () { return $(this).attr('id'); }).get();
        let selectedRatings = $('input[name="rating"]:checked').map(function () { return $(this).attr('id'); }).get();

        let anyFilterApplied = selectedPrices.length || selectedLanguages.length || selectedLevels.length || selectedVideos.length || selectedRatings.length;

        filteredCourses = $('.courses').filter(function () {
          let price = parseFloat($(this).data('price'));
          let language = $(this).data('language');
          let level = $(this).data('level');
          let rating = parseFloat($(this).data('rating'));

          let durationStr = $(this).data('duration'); // example: "12h 52min"
          let hours = 0;

          if (durationStr) {
              let match = durationStr.match(/(\d+)\s*h(?:\s*(\d+)\s*min)?/i);
              if (match) {
                  let h = parseInt(match[1]) || 0;
                  let m = parseInt(match[2]) || 0;
                  hours = h + m / 60;
              }
          }

          let priceMatch = selectedPrices.length === 0 || selectedPrices.some(id =>
              (id === 'filter-free' && price === 0) ||
              (id === 'filter-paid' && price > 0)
          );

          let languageMatch = selectedLanguages.length === 0 || selectedLanguages.some(id =>
              (id === 'filter-english' && language === 'English') ||
              (id === 'filter-urdu' && language === 'Urdu') ||
              (id === 'filter-hindi' && language === 'Hindi')
          );

          let levelMatch = selectedLevels.length === 0 || selectedLevels.some(id =>
              (id === 'filter-beginner' && level === 'Beginner') ||
              (id === 'filter-intermediate' && level === 'Intermediate') ||
              (id === 'filter-expert' && level === 'Expert')
          );

          let videoMatch = selectedVideos.length === 0 || selectedVideos.some(id =>
              (id === 'filter-0-1' && hours <= 1) ||
              (id === 'filter-1-3' && hours > 1 && hours <= 3) ||
              (id === 'filter-3-6' && hours > 3 && hours <= 6) ||
              (id === 'filter-6-17' && hours > 6 && hours <= 17) ||
              (id === 'filter-17-plus' && hours > 17)
          );

          let ratingMatch = selectedRatings.length === 0 || selectedRatings.some(id =>
              (id === 'filter-4.5' && rating >= 4.5) ||
              (id === 'filter-4.0' && rating >= 4.0) ||
              (id === 'filter-3.5' && rating >= 3.5) ||
              (id === 'filter-3.0' && rating >= 3.0)
          );

            return priceMatch && languageMatch && levelMatch && videoMatch && ratingMatch;
        });

        applyPagination();
    }

    function applyPagination() {
        totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
        currentPage = Math.min(currentPage, totalPages) || 1;
        firstVisiblePage = 1;
        updatePagination();
        showPage(currentPage);
    }

    function showPage(page) {
        let start = (page - 1) * coursesPerPage;
        let end = start + coursesPerPage;

        $('.courses').hide(); // Hide all courses first
        filteredCourses.slice(start, end).show(); // Show only the relevant ones

        $('#prevBtn').prop('disabled', page === 1);
        $('#nextBtn').prop('disabled', page === totalPages);

        updatePagination();
    }

    function updatePagination() {
        let pagination = $('#pagination');
        pagination.empty();
        let endPage = Math.min(firstVisiblePage + maxVisiblePages - 1, totalPages);

        for (let i = firstVisiblePage; i <= endPage; i++) {
            pagination.append(`<button class='btn btn-light page-number' id='page-${i}'>${i}</button>`);
        }

        $('.page-number').removeClass('active btn-primary text-white').addClass('btn-light');
        $(`#page-${currentPage}`).addClass('active btn-primary text-white');

        $('.page-number').click(function () {
            currentPage = parseInt($(this).text());
            showPage(currentPage);
        });
    }

    $('#prevBtn').click(function () {
        if (currentPage > 1) {
            currentPage--;
            if (currentPage < firstVisiblePage) {
                firstVisiblePage--;
            }
            showPage(currentPage);
        }
    });

    $('#nextBtn').click(function () {
        if (currentPage < totalPages) {
            currentPage++;
            if (currentPage > firstVisiblePage + maxVisiblePages - 1) {
                firstVisiblePage++;
            }
            showPage(currentPage);
        }
    });

    $(window).resize(function () {
        updateMaxVisiblePages();
        updatePagination();
    });

    $('input[name="price"], input[name="language"], input[name="level"], input[name="video"], input[name="rating"]').change(filterCourses);

    applyPagination();
});


//* ---------------------------- Single Course Page ---------------------------- *//

$(document).ready(function() {
    $('#exampleModal').on('hidden.bs.modal', function () {
      const video = $(this).find('video')[0];
      if (video) {
        video.pause();
        video.currentTime = 0; // Reset video to the beginning
      }
    });

    const description = document.getElementById('course-description');
    const readMoreBtn = document.getElementById('read-more-btn');
  
    readMoreBtn.addEventListener('click', () => {
      description.classList.toggle('expanded');
      readMoreBtn.textContent = description.classList.contains('expanded')
        ? 'Read Less'
        : 'Read More';
    });
});

$(document).ready(function () {
    $('.feedback-card').each(function () {
        const $card = $(this);
        const reviewId = $card.data('review-id');
        const storageKey = `review-feedback-${reviewId}`;

        const upBtn = $card.find('.thumb-up');
        const downBtn = $card.find('.thumb-down');
        const upIcon = upBtn.find('i');
        const downIcon = downBtn.find('i');

        function resetThumbs() {
          upBtn.removeClass('border-primary').addClass('border-secondary');
          downBtn.removeClass('border-danger').addClass('border-secondary');

          upIcon.removeClass('bi-hand-thumbs-up-fill text-primary')
               .addClass('bi-hand-thumbs-up text-body-secondary');
          downIcon.removeClass('bi-hand-thumbs-down-fill text-danger')
                 .addClass('bi-hand-thumbs-down text-body-secondary');
        }

        function applyFeedback() {
          const feedback = localStorage.getItem(storageKey);
          resetThumbs();
          if (feedback === 'up') {
            upBtn.removeClass('border-secondary').addClass('border-primary');
            upIcon.removeClass('bi-hand-thumbs-up text-body-secondary')
                .addClass('bi-hand-thumbs-up-fill text-primary');
          } else if (feedback === 'down') {
            downBtn.removeClass('border-secondary').addClass('border-danger');
            downIcon.removeClass('bi-hand-thumbs-down text-body-secondary')
                  .addClass('bi-hand-thumbs-down-fill text-danger');
          }
        }

        upBtn.hover(
          function () {
            if (localStorage.getItem(storageKey) !== 'up') {
              upBtn.addClass('border-primary').removeClass('border-secondary');
              upIcon.addClass('bi-hand-thumbs-up-fill text-primary').removeClass('bi-hand-thumbs-up text-body-secondary');
            }
          },
          function () {
            if (localStorage.getItem(storageKey) !== 'up') {
              upBtn.removeClass('border-primary').addClass('border-secondary');
              upIcon.removeClass('bi-hand-thumbs-up-fill text-primary').addClass('bi-hand-thumbs-up text-body-secondary');
            }
          }
        );

        downBtn.hover(
          function () {
            if (localStorage.getItem(storageKey) !== 'down') {
              downBtn.addClass('border-danger').removeClass('border-secondary');
              downIcon.addClass('bi-hand-thumbs-down-fill text-danger').removeClass('bi-hand-thumbs-down text-body-secondary');
            }
          },
          function () {
            if (localStorage.getItem(storageKey) !== 'down') {
              downBtn.removeClass('border-danger').addClass('border-secondary');
              downIcon.removeClass('bi-hand-thumbs-down-fill text-danger').addClass('bi-hand-thumbs-down text-body-secondary');
            }
          }
        );

        upBtn.click(function () {
          const current = localStorage.getItem(storageKey);
          if (current === 'up') {
          localStorage.removeItem(storageKey); // Undo
          } else {
            localStorage.setItem(storageKey, 'up');
          }
          applyFeedback();
        });

        downBtn.click(function () {
          const current = localStorage.getItem(storageKey);
          if (current === 'down') {
            localStorage.removeItem(storageKey); // Undo
          } else {
            localStorage.setItem(storageKey, 'down');
          }
          applyFeedback();
        });

        // Apply feedback on page load
        applyFeedback();
    });
});

$(document).ready(function () {
    const $reviews = $('.review-card');
    const total = $reviews.length;

    let currentVisible = 4;
    const firstClickAdd = 6;
    const afterClickAdd = 10;
    let isFirstClick = true;

    // Initial Setup
    $reviews.hide().slice(0, currentVisible).show();

    if (total <= currentVisible) {
      $('#showMoreBtn').hide();
    }

    $('#showMoreBtn').on('click', function () {
      const nextAdd = isFirstClick ? firstClickAdd : afterClickAdd;
      const nextVisible = currentVisible + nextAdd;

      $reviews.slice(currentVisible, nextVisible).slideDown();
      currentVisible = nextVisible;

      // Show Less after first click
      $('#showLessBtn').show();
      isFirstClick = false;

      // Only hide Show More if all cards are visible
      if (currentVisible >= total) {
        $('#showMoreBtn').hide();
      }
    });

    $('#showLessBtn').on('click', function () {
      // Show only first 4 cards again
      $reviews.slice(4).slideUp();
      currentVisible = 4;
      isFirstClick = true;

      // Reset buttons
      $('#showMoreBtn').show();
      $('#showLessBtn').hide();
    });
});

$(document).ready(function () {
    $('.enroll-btn').click(function () {
      const price = parseFloat($(this).data('price'));

      if (price === 0) {
        window.location.href = '/enroll';
      } else {
        window.location.href = '/payment';
      }
    });
});


//* ---------------------------- Enroll Course Page ---------------------------- *//

//TODO: User Feetback & Review Cards to See in Single Course Page JS Code

$(document).ready(function () {
    let $video = $('#course-video');
    let watchedLectures = {}; // Object to track which lectures were watched 98% in this session

    // Function to reset video when a lecture item is clicked
    function setVideoSource(lecture) {
      const videoSrc = $(lecture).data('src');
      $video.find('source').attr('src', videoSrc);
      $video.get(0).load();
      $video.get(0).play();

      // Mark clicked lecture as active and styled
      $('.enroll-course-lecture-item').removeClass('active text-primary');
      $(lecture).addClass('active text-primary');
    }

    // Check if there are any lecture items and set the first one as active
    if ($('.enroll-course-lecture-item').length > 0) {
      const firstLecture = $('.lecture-item').first();
      setVideoSource(firstLecture);
    }

    // Handle clicking on any lecture item
    $('.enroll-course-lecture-item').on('click', function () {
      const index = $(this).data('index');

      // If the clicked lecture is already marked as watched, show the check icon
      if (watchedLectures[index]) {
        $(this).find('.bi-check').show();
      }

      setVideoSource(this);
    });

    // Track video progress and add check icon
    $video.on('timeupdate', function () {
      const currentTime = this.currentTime;
      const duration = this.duration;
      const progress = (currentTime / duration) * 100;

      if (progress >= 98) {
        // When 98% progress is reached, mark the current lecture as watched
        const currentLecture = $('.enroll-course-lecture-item.active');
        const lectureIndex = currentLecture.data('index');

        // If it's not already marked, show the check icon
        if (!watchedLectures[lectureIndex]) {
          watchedLectures[lectureIndex] = true;  // Mark the lecture as watched
          currentLecture.find('.bi-check').show();  // Show the check icon
        }
      }
    });
});

$(document).ready(function() {
  let selectedStars = 0;
  let submitted = false;

  // Star Selection
  $('.star').on('click', function () {
    if (submitted) return;
    selectedStars = $(this).data('value');
    $('.star').removeClass('active');
    $('.star').each(function () {
      if ($(this).data('value') <= selectedStars) {
        $(this).addClass('active');
      }
    });
  });

  // Submit Review
  $('#submitReview').on('click', function () {
    if (submitted) return;

    const reviewText = $('#userReview').val().trim();
    if (selectedStars === 0 || reviewText === "") {
      // Using SweetAlert for error alert
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please select stars and write a review.',
      });
      return;
    }

    const courseId = $('.starContainer').data('id');

    $.ajax({
      url: `/courses/submit-review/${courseId}`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ rating: selectedStars, reviewText }),
      success: function (res) {
        submitted = true;
        $('#reviewForm').hide();
        // SweetAlert for success with page refresh option
        Swal.fire({
          icon: 'success',
          title: 'Thanks for your feedback!',
          text: 'Please refresh the page to see it live.',
          showCancelButton: true,
          confirmButtonText: 'Refresh',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload(); // Refresh the page if the user clicks 'Refresh'
          }
        });
      },
      error: function (err) {
        // Using SweetAlert for error response
        if (err.responseJSON?.error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.responseJSON.error,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error submitting review.',
          });
        }
      }
    });
  
  });

});