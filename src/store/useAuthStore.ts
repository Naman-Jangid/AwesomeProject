import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sampleUserMockData} from '../utils/mockData';
import {UserCredentialInterface} from '../utils/types';

interface CreateAuthStoreInterface {
  hasHydrated: boolean;
  userDetails?: any;
  usersCredentials?: UserCredentialInterface;
  isUserLoggedIn?: boolean;
  allAvailableUsers?: UserCredentialInterface[];
  setHasHydrated: (state: boolean) => void;
  logInUser: (details: UserCredentialInterface) => void;
  setAllAvailableUsersInStore: () => void;
  logOutUser?: () => void;
  setUserDetails: (details: any) => void;
}

export const useAuthStore = create<CreateAuthStoreInterface>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      usersCredentials: undefined,
      isUserLoggedIn: false,
      setHasHydrated: state => set({hasHydrated: state}),
      logInUser: creds => {
        const allAvailableUsers = get().allAvailableUsers;
        if (!!allAvailableUsers && allAvailableUsers?.length > 0) {
          const user = allAvailableUsers.find(
            userObj => userObj.email === creds.email,
          );
          if (user) {
            set({usersCredentials: creds, isUserLoggedIn: true});
          }
        }
      },
      logOutUser: () => {
        set({
          isUserLoggedIn: false,
          usersCredentials: undefined,
          userDetails: null,
        });
      },
      setAllAvailableUsersInStore: () => {
        // set sample users into the persisted store
        set({allAvailableUsers: sampleUserMockData});
      },
      setUserDetails: details => set({userDetails: details}),
    }),
    {
      name: 'authStorage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => state => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
