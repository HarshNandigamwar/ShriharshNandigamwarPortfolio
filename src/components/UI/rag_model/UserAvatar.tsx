import { User } from 'lucide-react';

 const UserAvatar = ({size = 14}: {size?: number}) => (
        <div
            className="w-7 h-7 rounded-xl bg-white/8 border border-white/15
                  flex items-center justify-center shrink-0"
        >
            <User size={size} className="text-white/60" />
        </div>
    );

export default UserAvatar
