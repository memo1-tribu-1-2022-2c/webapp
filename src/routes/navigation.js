import { useNavigate, useSearchParams } from "react-router-dom";

function useNavigateWParams() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const qParams = "?" + searchParams.toString();

  return (path) => {
    if (path === -1) {
      navigate(-1);
    } else {
      navigate({ pathname: path, search: qParams });
    }
  };
}

export default useNavigateWParams;
