import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function NavigateWP({ to, replace = false }) {
  const navigate = useNavigateWParams();
  useEffect(() => navigate(to, { replace: replace }));
}

export function useNavigateWParams() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const qParams = "?" + searchParams.toString();

  return (path, replace = false) =>
    navigate({ pathname: path, search: qParams, replace: replace });
}

export default useNavigateWParams;
