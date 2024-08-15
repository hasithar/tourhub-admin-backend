import { useState } from "react";

const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const makeRequest = async (url, options) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();
        const errorObject = {
          error: errorData.error || "Failed to complete the request",
          reason: errorData.reason || null,
        };

        throw new Error(JSON.stringify(errorObject));
      }

      const data = await response.json();
      setSuccess("Request completed successfully!");
      return data;
    } catch (error) {
      setError(JSON.parse(error.message));
      throw error; // Re-throwing the error to handle it outside
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, makeRequest };
};

export default useApiRequest;
