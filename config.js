window.PORTFOLIO_CONFIG = {
  name: "Jordanos Feyissa Gemechu",
  role: "Aspiring Data Scientist | Data Analyst & Business Intelligence",
  location: "Italy",
  email: "jordanosfeyissa@gmail.com",
  githubUsername: "https://github.com/jordanos-feyissa",
  linkedinUrl: "https://www.linkedin.com/in/jordanos-feyissa",
  resumeUrl: "",
  avatarUrl: "formal_pp.jpg",
  about:
    "I work with data to transform complex questions into clear analysis and actionable insights. My projects focus on data cleaning, exploratory analysis, visualization, and machine learning using Python. This portfolio showcases my hands-on work with real datasets, including predictive modeling, feature engineering, and analytical projects designed to strengthen both technical and problem-solving skills in data science.",
  skills: [ {  "Programming & Data Analysis": [
      "Python",
      "SQL",
      "Pandas",
      "NumPy"
    ],

    "Data Visualization": [
      "Matplotlib",
      "Seaborn",
      "Power BI"
    ],

    "Machine Learning": [
      "Scikit-learn",
      "Classification",
      "Regression",
      "Clustering",
      "Model Evaluation"
    ],

    "Analytics Workflow": [
      "Data Cleaning",
      "Exploratory Data Analysis (EDA)",
      "Feature Engineering",
      "Insight Reporting"
    ],

    "Tools": [
      "Jupyter Notebooks",
      "GitHub",
      "Excel"
    ]
  }],
  featuredProjects: [
    {
      title: "Restaurant Analysis",
      description:
        "Analyzed 9,551 Zomato restaurant records to understand how location, cuisine, price range, ratings, votes, delivery, and table booking relate to restaurant performance.",
      highlights: [
        "Found that the dataset is highly concentrated in India, which represents about 90.6% of all restaurants.",
        "Identified that most restaurants are low-to-mid price range, while Singapore and the Philippines show higher median costs after USD conversion.",
        "Built a CatBoost classification model to predict restaurant price range, reaching about 69% accuracy."
      ],
      tools: ["Python", "Pandas", "Matplotlib", "Seaborn", "Jupyter Notebook"],
      source: "../Restaurant_analysis.ipynb",
      github: ""
    },
    {
      title: "Global AI Job Market & Salary Trends 2025",
      description:
        "Explored 15,000 AI job records to study salary patterns by job title, experience level, country, company size, remote ratio, industry, and education requirements.",
      highlights: [
        "Found that salary increases most clearly with experience level, while education, work mode, and industry have weaker effects.",
        "Identified Data Engineer, Machine Learning Engineer, and AI Specialist among the highest-paid job titles by median salary.",
        "Trained classification models for experience level, with CatBoost reaching about 84% accuracy."
      ],
      tools: ["Python", "Pandas", "Matplotlib", "Seaborn", "Jupyter Notebook"],
      source: "../Global AI Job Market & Salary Trends 2025.ipynb",
      github: ""
    },
  ],
  education: [
          {
      degree: "Master of Science in Data Science and Business Informatics",
      school: "University of Pisa",
      period: "2021 - 2026",
      details: "Academic Focus: Data Mining, Statistics for Data Science,  Decision Support Systems, Text Analytics, Business Process Modeling" ,
      details2: "Thesis : AI and Market Failures in hiring"
    },
    {
      degree: "Bachelor of Arts in Business Administration and Information System",
      school: "Addis Abeba University",
      period: "2016 - 2019",
      details: "Academic Focus: Database Management, Statistics for Management, Cost and Managerial accounting, Project Management, Marketing"         
    },
    {
      degree: "High School Diploma in Administration, Finance and Marketing ",
      school: "Istituto Italiano Statale Omnicomprensivo",
      period: "2011 - 2016",
      details: "Focus: Accounting Principles, with emphasis on Balance Sheet and Income Statement (Conto Economico) preparation"
    }
  ],
  experience: [
    {
      title: "Night Auditor",
      company: "Hospitality",
      period: "10/2022 - Current",
      details: [
        "Managed overnight front-desk operations, including reservations, check-in, check-out, and guest records.",
        "Supported guest safety, resolved issues, ensured service quality, and maintained smooth nightly hostel operations."
      ]
    },
    {
      title: "Customer Service Officer",
      company: "Banking",
      period: "10/2020 - 08/2021",
      details: [
        "Processed account openings, customer inquiries, cash and non-cash transactions, and daily records.",
        "Maintained transaction accuracy, compliance with banking procedures, and end-of-day cash reporting."
      ]
    },
    {
      title: "Business Administration High School Teacher",
      company: "Education",
      period: "10/2019 - 06/2020",
      details: [
        "Prepared teaching materials and delivered business administration lessons and tutorials.",
        "Assessed coursework, tracked student progress, and supported classroom engagement."
      ]
    }
  ],
  checkInEndpoint: ""
};
