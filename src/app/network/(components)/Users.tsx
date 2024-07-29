import { auth } from '@/auth';
import { API_HEAD } from '@/lib/utils';
import axios from 'axios';
import UserCard from './UserCard';

const Users = async () => {
    const session: any = await auth();
    const users = await axios.get(`${API_HEAD}/user/recommended/${session?.user?._id}`);

    return (
    <div className="grid md:grid-cols-4 gap-4">
        {users?.data?.map((user: any) => (
          <UserCard key={user._id} user={user} />
        ))}
    </div>
  )
}

export default Users