import { createSlice } from "@reduxjs/toolkit";

const analyzerSlice = createSlice({
  name: "analyzer",
  initialState: {
    websiteUrl: "",
    analysisResult: {
        companyName: "Lumen AI",
        executiveSummary: "Lumen AI provides an intuitive AI-powered platform designed to streamline business workflows through automation and advanced analytics. Their solution empowers organizations to enhance productivity and make data-driven decisions.",
        valueProposition: "Lumen AI simplifies complex business processes by leveraging artificial intelligence to automate tasks and provide actionable insights, enabling users to focus on strategic initiatives.",
        seoKeywords: [
            "AI platform",
            "business automation",
            "AI-powered analytics",
            "data-driven decisions",
            "workflow automation",
            "AI tools for business",
            "automated insights"
        ],
        contentReadability: "Beginner",
        estimatedWordCount: 50,
        primaryCTAs: [
            "Sign in to your account",
            "Forget Password ?",
            "Create a new account"
        ],
        conversionFriction: [
            "No clear explanation of the platform's benefits",
            "Lack of social proof or trust signals",
            "No pricing or plan details provided"
        ],
        copywritingStrengths: [
            "Clear and concise login form",
            "Simple and straightforward navigation for new users"
        ],
        criticalWarnings: [
            "Value proposition is completely missing",
            "No information about the platform's features or use cases",
            "No trust-building elements like testimonials or case studies"
        ],
        actionableImprovements: [
            "Add a brief value proposition explaining the platform's core benefits near the login form",
            "Include a section highlighting key features or use cases of the AI platform",
            "Add social proof elements such as testimonials or logos of trusted clients"
        ]
    },
    isLoading: false,
    error: null,
    },
    reducers: {
        setWebsiteUrl:(state, action)=>{
            state.websiteUrl = action.payload
        },
        setAnalysisResult:(state, action)=>{
            state.analysisResult = action.payload
        },
        setIsLoading:(state, action)=>{
            state.isLoading = action.payload
        },
        setError:(state, action)=>{
            state.error = action.payload
        }
    }
});

export const { setWebsiteUrl, setAnalysisResult, setIsLoading, setError } = analyzerSlice.actions
export default analyzerSlice.reducer