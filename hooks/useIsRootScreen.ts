import { useNavigationState } from '@react-navigation/native';

const useIsRootScreen = () => {
  return useNavigationState((state) => {
    const currentRoute = state.routes?.[state.index];

    if (!currentRoute) {
      // Navigation state is not yet initialized
      return true;
    }

    return currentRoute.name === "index";
  });
};

export default useIsRootScreen;
