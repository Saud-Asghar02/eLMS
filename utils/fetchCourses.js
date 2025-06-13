const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const ownerModel = require('../models/ownerModel');
const courseModel = require('../models/courseModel');
const db = require('../config/mongooseConnection');
db;

const description = `
Mahira Qureshi is a passionate and highly skilled IT professional with a strong background in cloud computing cyber security and IT certification training. Over the years she has dedicated her career to educating and empowering individuals and businesses to better understand and implement secure and scalable technologies in the ever-evolving digital landscape. Her deep knowledge of cloud platforms like AWS Microsoft Azure and Google Cloud combined with hands-on experience in security protocols firewalls and penetration testing makes her a valuable mentor and expert in her field.

From a young age Mahira was fascinated by the way technology worked. She would often spend hours exploring systems understanding how networks communicate and diving into the logic behind computer processes. This curiosity led her to pursue a degree in Computer Science where she excelled in subjects related to networking systems administration and information security. Her academic foundation laid the groundwork for a thriving career that spans multiple domains within IT and software development.

One of Mahira's key strengths lies in her ability to simplify complex concepts and present them in an understandable and engaging way. Whether she is teaching AWS certification modules or guiding a team through a cloud deployment strategy her communication style is clear patient and highly effective. Students and professionals alike find her approach approachable and relatable especially in high-stakes topics such as ethical hacking cloud security and certification readiness.

As a cloud computing expert Mahira has spent countless hours architecting cloud-based infrastructure using platforms like AWS and Azure. She is well-versed in services such as EC2 S3 RDS Lambda and more. She has worked with small startups and large enterprises helping them migrate their systems to the cloud with a focus on cost optimization performance and scalability. She understands the intricacies of cloud architecture and ensures that each solution is tailored to the unique needs of the organization. Her training modules often include real-world use cases and hands-on labs where learners can apply their knowledge immediately.

In the realm of cyber security Mahira is known for her vigilance and proactive mindset. She has conducted penetration testing vulnerability assessments and network audits for a variety of clients. Her sessions on ethical hacking demonstrate not just the techniques used by attackers but also the critical thinking required to defend against them. She covers topics such as firewalls intrusion detection systems cryptography cloud security and identity access management. With an eye on industry trends she consistently updates her materials to reflect the latest threats and mitigation techniques.

One of her proudest achievements is the success of her students. Many of them have gone on to earn industry-recognized certifications such as CompTIA A plus AWS Certified Solutions Architect and Microsoft Certified Azure Administrator. Mahira takes great pride in knowing that her guidance has played a pivotal role in helping others advance their careers. Her structured approach includes exam preparation tips mock tests study plans and one-on-one mentoring sessions. She understands the challenges that learners face and provides support that is both technical and motivational.

Mahira also values continuous learning. She frequently attends industry conferences reads the latest white papers and engages in online forums to stay updated with the ever-changing tech environment. She believes that in IT staying still means falling behind so she makes it a point to evolve with the technology. Whether it is learning about the newest features in Kubernetes or understanding the latest in cloud compliance regulations she brings that knowledge back into her lessons making them fresh and relevant.

Her professional philosophy revolves around security first thinking. In every solution she designs or teaches Mahira ensures that security is not an afterthought but an integral part of the process. From setting up secure cloud environments to teaching how to build zero-trust architectures she emphasizes the importance of protecting data and maintaining the integrity of systems. In a time when cyber threats are becoming more sophisticated her knowledge is not just useful but essential.

In addition to her technical expertise Mahira is a strong advocate for women in tech. She mentors young women who are entering the field providing them with encouragement guidance and access to learning resources. She believes in building inclusive environments where diverse perspectives are not only welcomed but celebrated. Her presence in the industry serves as an inspiration to many showing that with determination and skill anyone can succeed in the competitive world of IT and software.

Outside of her professional life Mahira enjoys exploring nature reading books on psychology and practicing yoga. She believes in maintaining a balanced lifestyle and often integrates wellness tips into her teachings. Her approach to learning and growth is holistic combining technical skills with mindset habits that lead to long-term success.

In conclusion Mahira Qureshi is more than just a cyber security and cloud computing expert. She is a mentor a teacher and a role model for the next generation of tech professionals. Her dedication to education her command over cutting-edge technologies and her passion for empowering others make her an invaluable asset in the world of IT and software. Whether you are just starting your career or looking to level up your certifications learning from Mahira is a transformative experience that will leave you more confident capable and prepared for whatever challenges lie ahead in the digital world.


`;

async function seedDB() {

    // Create Usman Haider user
    const user = await userModel.create(
        
        {
            username: "Mahira Qureshi",
            email: "mahira.qureshi@example.com",
            password: "secureCode456", // Should be hashed before saving
            userPicture: "https://i.pinimg.com/474x/ad/0b/1c/ad0b1ce038be3c1d81c224fdf73a07c7.jpg",
            phoneNumber: "3218899001",
            location: "Pakistan",
            userBio: "Cloud security specialist and IT certification trainer with hands-on expertise in cyber defense and infrastructure.",
            aboutUser: "Hi I am Mahira Qureshi a professional in the field of IT and Software with specialized focus on cloud infrastructure cyber security and technical certifications. I help individuals and organizations strengthen their digital environment through practical training in cloud computing penetration testing and secure system architecture.",
            language: "English",
            skills: [
              "AWS",
              "Microsoft Azure",
              "Cyber Security",
              "Ethical Hacking",
              "CompTIA A+",
              "Google Cloud Certification",
              "Docker & Kubernetes"
            ],
            socialMediaLink: "https://linkedin.com/in/mahiraqureshi"
          }          
                                              
      );

    // Create Usman Haider owner profile
    const owner = await ownerModel.create({
        userID: user._id,
        username: user.username,
        email: user.email,
        courses: [],
        enrollStudent: []
    });

    // Create 7 courses for Usman Haider
    const coursesData = [
            {
                owner: owner._id,
                ownerName: 'Mahira Qureshi',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfI0p37HfxZzeQiGytnZyreaYCIuWnSfP4Bw&s',
                video: 'https://www.youtube.com/watch?v=video8000',
                title: 'Cyber Security Fundamentals: Protecting Digital Assets',
                paragraph: 'Learn the basics of cyber security to safeguard systems and data.',
                aboutCourse: 'This course introduces key concepts in cyber security, including threat detection, vulnerability assessment, and secure system architecture.',
                language: 'English',
                level: 'Intermediate',
                description: description,
                requirement: ['Basic understanding of IT systems'],
                topics: ['Threat Detection', 'Vulnerability Assessment', 'Secure Architecture'],
                learning: ['Identifying Security Risks', 'Implementing Defense Mechanisms', 'Building Secure Systems'],
                content: [
                    { sectionTitle: 'Introduction to Cyber Security', lectures: [{ lectureTitle: 'Why Cyber Security Matters', lectureVideo: 'https://www.youtube.com/watch?v=video8001' }] },
                    { sectionTitle: 'Understanding Threats', lectures: [{ lectureTitle: 'Common Cyber Threats Explained', lectureVideo: 'https://www.youtube.com/watch?v=video8002' }] },
                    { sectionTitle: 'Vulnerability Assessment Basics', lectures: [{ lectureTitle: 'Identifying Weaknesses in Systems', lectureVideo: 'https://www.youtube.com/watch?v=video8003' }] },
                    { sectionTitle: 'Building Secure Architectures', lectures: [{ lectureTitle: 'Designing Systems for Defense', lectureVideo: 'https://www.youtube.com/watch?v=video8004' }] },
                    { sectionTitle: 'Penetration Testing Techniques', lectures: [{ lectureTitle: 'Testing Systems for Security', lectureVideo: 'https://www.youtube.com/watch?v=video8005' }] },
                    { sectionTitle: 'Using Firewalls Effectively', lectures: [{ lectureTitle: 'Configuring Firewalls for Protection', lectureVideo: 'https://www.youtube.com/watch?v=video8006' }] },
                    { sectionTitle: 'Responding to Incidents', lectures: [{ lectureTitle: 'Handling Security Breaches', lectureVideo: 'https://www.youtube.com/watch?v=video8007' }] },
                    { sectionTitle: 'Cyber Security Tools', lectures: [{ lectureTitle: 'Exploring Popular Security Software', lectureVideo: 'https://www.youtube.com/watch?v=video8008' }] },
                    { sectionTitle: 'Case Studies in Cyber Defense', lectures: [{ lectureTitle: 'Learning from Real-World Scenarios', lectureVideo: 'https://www.youtube.com/watch?v=video8009' }] },
                    { sectionTitle: 'Final Review and Integration', lectures: [{ lectureTitle: 'Applying Cyber Security Concepts', lectureVideo: 'https://www.youtube.com/watch?v=video8010' }] }
                ],
                totalLectures: 10,
                totalDuration: '7h 30min',
                price: 139,
                discount: '25'
            },
    ];

    const savedCourses = await courseModel.insertMany(coursesData);

    // Update owner with course references
    for (let i = 0; i < savedCourses.length; i++) {
        const course = savedCourses[i];
        await ownerModel.findByIdAndUpdate(course.owner, {
            $push: { courses: course._id }
        });
    }

    console.log('✅ 7 Courses for Usman Haider seeded successfully!');
    mongoose.disconnect();
}

seedDB();