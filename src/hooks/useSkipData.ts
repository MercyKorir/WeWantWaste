import { useState, useEffect, useCallback } from "react";
import type { Skip, ApiError } from "../types";
import { fetchSkipsByLocation } from "../services/skipApi";

interface UseSkipDataReturn {
  skips: Skip[];
  loading: boolean;
  error: ApiError | null;
  refetch: () => void;
}

export const useSkipData = (
  postcode: string,
  area?: string
): UseSkipDataReturn => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchData = useCallback(async () => {
    if (!postcode) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await fetchSkipsByLocation(postcode, area);
      setSkips(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      console.error("Skip data fetch error: ", apiError);
    } finally {
      setLoading(false);
    }
  }, [postcode, area]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    skips,
    loading,
    error,
    refetch,
  };
};
