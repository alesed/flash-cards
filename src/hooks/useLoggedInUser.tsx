import {
	createContext,
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useEffect,
	useState
} from 'react';
import { User } from 'firebase/auth';

import { onAuthChanged } from '../utils/firebase/auth';

type UserState = [User | undefined, Dispatch<SetStateAction<User | undefined>>];

const UserContext = createContext<UserState>(undefined as never);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
	const userState = useState<User>();
	return (
		<UserContext.Provider value={userState}>{children}</UserContext.Provider>
	);
};

const useLoggedInUser = () => {
	const [user, setUser] = useContext(UserContext);

	useEffect(() => {
		onAuthChanged(u => setUser(u ?? undefined));
	}, []);

	return user;
};

export default useLoggedInUser;
