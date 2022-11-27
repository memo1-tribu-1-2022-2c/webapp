import { useNavigate, useSearchParams } from "react-router-dom";

function useNavigateWParams() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const qParams = "?" + searchParams.toString();

  return (path) => navigate({ pathname: path, search: qParams });
}

export default useNavigateWParams;
