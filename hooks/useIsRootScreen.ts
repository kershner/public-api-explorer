import { useNavigationState } from '@react-navigation/native';
import { APP_TITLE } from '@/constants/constants';

const useIsRootScreen = () => {
  return useNavigationState((state) => {
    const currentRoute = state.routes?.[state.index];

    if (!currentRoute) {
      // Navigation state is not yet initialized
      return true;
    }

    return currentRoute.name === `${APP_TITLE}/index`;
  });
};

export default useIsRootScreen;
