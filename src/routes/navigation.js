import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function NavigateWP(props) {
  const navigate = useNavigateWParams();
  useEffect(() => navigate(props.to));
}

export function useNavigateWParams() {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const qParams = "?" + searchParams.toString();

  return (path) => navigate({ pathname: path, search: qParams });
}

export default useNavigateWParams;


