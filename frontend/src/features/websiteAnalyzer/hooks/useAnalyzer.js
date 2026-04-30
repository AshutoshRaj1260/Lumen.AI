import { analyzeWebsite } from "../services/analyzer.api";
import { setWebsiteUrl, setAnalysisResult, setIsLoading, setError } from "../analyzer.slice";
import { useDispatch } from "react-redux";

export const useAnalyzer = () => {
  const dispatch = useDispatch();

  async function handleAnalyzeWebsite({ url }) {
    dispatch(setIsLoading(true));
    try {
      const response = await analyzeWebsite({ url });
      dispatch(setWebsiteUrl(url));
      dispatch(setAnalysisResult(response.data));
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  return {
    handleAnalyzeWebsite,
  };
};
