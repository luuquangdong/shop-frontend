const { useCallback } = require("react");
const { useHistory } = require("react-router-dom");

const useHandleItemClick = () => {
  const history = useHistory();

  const handleItemClick = useCallback((path, selected) => {
    if (selected) return;
    history.push(path);
  }, []);

  return handleItemClick;
};

export default useHandleItemClick;
